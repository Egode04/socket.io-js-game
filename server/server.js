const http = require('http')
const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socket(server)

// mySql
const SQL = {
    mysql: require('mysql'),
    await: require('mysql-await')
}

// connection
const conn = {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'node_mysql'
}

// create connection
const data = {
    db: SQL.mysql.createConnection(conn),
    await: SQL.await.createConnection(conn)
}

// connect
data.db.connect(err => {
    if (err) throw err
})
data.await.connect(err => {
    if (err) throw err
})

// variables
const TICK_RATE = 30

const canvas = {
    width: 768,
    height: 768
}

const players = []
const inputMap = {}

let hitboxes = []
const bowls = []
const ramen = []

const physics = {
    speed: 8
}

let removeIndexes = []

let once = true

// functions
async function insertUser(user) {
    if (user.username && user.password) {
        const users = await selectUsers()
        for (let obj of users) {
            if (obj.username === user.username) {
                // console.log('username taken...')
                return { bool: false, msg: 'username taken...' }
            }
        }
        let sql = `INSERT INTO users SET ?`
        data.db.query(sql, user, err => {
            if (err) throw err
            // console.log('succeded...')
        })
        return { bool: true, msg: 'succeded...' }
    } else {
        // console.log('empty input(s)...')
        return { bool: false, msg: 'empty input(s)...' }
    }
    // return { bool: false, msg: 'empty input(s)...' }
}

async function selectUsers() {
    let array = []
    let sql = `SELECT * FROM users`

    try {
        let results = await data.await.awaitQuery(sql)

        for (i of results) {
            res = results[results.indexOf(i)]
            array.push({ id: res.id, username: res.username, password: res.password })
        }
        
        return array
    } catch (error) {
        throw error
    }
}

async function login(user) {
    if (user.username && user.password) {
        const users = await selectUsers()
        // console.log(users)
        for (let obj of users) {
            if (obj.username === user.username && obj.password === user.password) {
                // console.log(obj)
                // console.log(user)
                return { bool: true, msg: 'login succeeded...' }
            }
        } return { bool: false, msg: 'user does not exist...' }
    } return { bool: undefined, msg: 'empty input(s)...' }
}

function checkUser(user, users) {
    for (let obj of users) {
        if (obj.username === user.username && obj.password === user.password) {
            return true
        } return false
    }
}

function tick() {
    players.forEach(player => {
        const inputs = inputMap[player.id]
        // console.log(inputMap)

        // set [horizontal/vertical] velocity
        if (inputs.up) {
            player.velocity.y = -player.physics.speed
        } if (inputs.down) {
            player.velocity.y =  player.physics.speed
        } if (inputs.left) {
            player.velocity.x = -player.physics.speed
        } if (inputs.right) {
            player.velocity.x =  player.physics.speed
        }

        // set [diagonal] velocity
        if (inputs.up && inputs.left) {
            player.velocity = {
                x: -getSpeed(player.physics.speed),
                y: -getSpeed(player.physics.speed)
            }
        } else if (inputs.up && inputs.right) {
            player.velocity = {
                x:  getSpeed(player.physics.speed),
                y: -getSpeed(player.physics.speed)
            }
        } else if (inputs.down && inputs.right) {
            player.velocity = {
                x:  getSpeed(player.physics.speed),
                y:  getSpeed(player.physics.speed)
            }
        } else if (inputs.down && inputs.left) {
            player.velocity = {
                x: -getSpeed(player.physics.speed),
                y:  getSpeed(player.physics.speed)
            }
        }

        if (!inputs.up && !inputs.down || inputs.up && inputs.down) {
            player.velocity.y = 0
        } if (!inputs.left && !inputs.right || inputs.left && inputs.right) {
            player.velocity.x = 0
        }

        // collition
        hitboxes.forEach(hitbox => {
            if (collition(player, hitbox)) {
                player.velocity = {x: 0, y: 0}
            }
        })

        // set position
        if (
            player.position.x + player.velocity.x > 0 &&
            player.position.x + player.velocity.x + player.dimensions.width < canvas.width
        ) {
            player.position.x += player.velocity.x
        } else {
            player.velocity.x = -player.velocity.x
        } if (
            player.position.y + player.velocity.y > 0 &&
            player.position.y + player.velocity.y + player.dimensions.height < canvas.height - calcTiles(1.7)
        ) {
            player.position.y += player.velocity.y
        } else {
            player.velocity.y = -player.velocity.y
        }

        // set movement speed
        player.physics.speed = setSpeed({
            maxSpeed: 6,
            bowls: player.bowls,
            maxBowls: player.maxBowls
        })
    })

    bowls.forEach((bowl, index) => {
        bowl.position.x += bowl.velocity.x
        bowl.position.y += bowl.velocity.y

        hitboxes.forEach(hitbox => {
            if (
                collition(bowl, hitbox) ||
                bowl.position.x + bowl.velocity.x < 0 &&
                bowl.position.x + bowl.velocity.x + bowl.dimensions.width > canvas.width &&
                bowl.position.y + bowl.velocity.y + bowl.dimensions.height > canvas.height &&
                bowl.position.y + bowl.velocity.y < 0
            ) {
                removeIndexes.push(index)
            }
        })
    })

    removeIndexes = removeIndex(removeIndexes, bowls)

    players.forEach((player) => {
        bowls.forEach((bowl, index) => {
            if (player.id !== bowl.parent.id) {
                if (collition(player, bowl)) {
                    removeIndexes.push(index)
                    
                    if (player.hp.armor) {
                        player.hp.armor -= 1
                    } else if (player.hp.health) {
                        player.hp.health -= 1
                    } if (!player.hp.health) {
                        resetPlayer(player)
                    }
                }
            }
        })
    })

    removeIndexes = removeIndex(removeIndexes, bowls)

    players.forEach(player => {
        ramen.forEach((ramen, index) => {
            if (player.bowls < player.maxBowls) {
                if (collition(player, ramen)) {
                    removeIndexes.push(index)
                    
                    player.bowls += ramen.effect.bowls
                    player.hp.health += ramen.effect.healing
                    if (player.hp.health > player.hp.maxHealth) {
                        player.hp.health = player.hp.maxHealth
                    }
                }
            }
        })
    })

    removeIndexes = removeIndex(removeIndexes, ramen)

    // move ramen if inside of hitbox
    ramen.forEach(ramen => {
        hitboxes.forEach(hitbox => {
            if (collition(ramen, hitbox)) {
                ramen.position = newPosition({
                    x: {
                        range: 20,
                        offset: 2
                    },
                    y: {
                        range: 18,
                        offset: 2
                    }
                })
            }
        })
    })

    io.emit('players', players)
    io.emit('bowls', bowls)
    io.emit('ramen', ramen)
}

function setSpeed({maxSpeed, bowls, maxBowls, speed = 4}) {
    return speed + (maxSpeed-speed) * (maxBowls-bowls)/maxBowls
}

function removeIndex(indexes, array) {
    indexes.forEach(index => {
        array.splice(index, 1)
    })
    return []
}

function resetPlayer(player) {
    const hp = {
        health: 3,
        armor: 1
    }
    player.hp = hp
    player.bowls = player.maxBowls
    player.position = newPosition({
        x: {
            range: 9,
            offset: 7
        },
        y: {
            range: 7,
            offset: 2
        }
    })
}

function newPosition(obj) {
    return {
        x: calcTiles(Math.floor(Math.random() * (obj.x.range-obj.x.offset) + obj.x.offset)),
        y: calcTiles(Math.floor(Math.random() * (obj.x.range-obj.x.offset) + obj.x.offset))
    }
}

function getSpeed(speed) {
    return speed / Math.sqrt(2)
}

function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
}

function randInt(range, offset) {
    return Math.floor(Math.random() * (range - offset) + offset)
}

function collition(object, hitbox) {
    if (
        object.position.x + object.velocity.x < hitbox.position.x + hitbox.dimensions.width  && // rigth   ( hitbox )
        object.position.x + object.velocity.x + object.dimensions.width > hitbox.position.x  && // left    ( hitbox )
        object.position.y + object.velocity.y + object.dimensions.height > hitbox.position.y && // top     ( hitbox )
        object.position.y + object.velocity.y < hitbox.position.y + hitbox.dimensions.height    // bottom  ( hitbox )
    ) {
        return true
    }
}

io.on('connect', socket => {
    // user connected
    console.log(`New client connected: ${socket.id}`)

    socket.on('logged in', username => {
        inputMap[socket.id] = {
            up:    false,
            down:  false,
            left:  false,
            right: false
        }
        players.push({
            id: socket.id,
            username,
            position: newPosition({
                x: {
                    range: 9,
                    offset: 7
                },
                y: {
                    range: 7,
                    offset: 2
                }
            }),
            velocity: {
                x: 0,
                y: 0
            },
            dimensions: {
                width: calcTiles(0.66),
                height: calcTiles(1.38)
            },
            physics: {
                speed: 4
            },
            hp: {
                health: 3,
                armor: 1,
                maxHealth: 3
            },
            bowls: 3,
            maxBowls: 3
        })
        console.log(players)
    })

    // emit commands here
    socket.on('pressed', keys => {
        inputMap[socket.id] = keys
    })

    socket.on('players', (players, images) => console.log(players, `images: ${images}`))

    socket.on('hitboxes', hb => {
        hitboxes = hb
    })

    socket.on('bowl', angle => {
        let p
        players.forEach(player => {
            if (player.id === socket.id) {
                p = player
            }
        })

        if (p.bowls) {
            // shoot bowls
            bowls.push({
                position: {
                    x: p.position.x + p.dimensions.width / 2,
                    y: p.position.y + p.dimensions.height / 2
                },
                dimensions: {
                    width: calcTiles(0.75),
                    height: calcTiles(0.75)
                },
                velocity: {
                    x: Math.cos(angle) * physics.speed,
                    y: Math.sin(angle) * physics.speed
                },
                parent: p
            })

            // spawn ramen
            const ramenSize = randInt(2, 0)
            ramen.push({
                parent: p,
                position: newPosition({
                    x: {
                        range: 20,
                        offset: 2
                    },
                    y: {
                        range: 18,
                        offset: 2
                    }
                }),
                dimensions: {
                    width: calcTiles(1 + 0.25 * ramenSize),
                    height: calcTiles(1 + 0.25 * ramenSize)
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                effect: {
                    healing: ramenSize,
                    bowls: 1
                }
            })
            
            // remove 1 bowl from statch
            p.bowls -= 1
        }
    })

    socket.on('login', async user => {
        // console.log('login attempted...')
        const log = await login(user)
        if (log.bool) {
            console.log(log.msg)
            socket.emit('logged in')
        } else {
            console.log(log.msg)
            socket.emit('login failed')
        }
    })

    socket.on('signup', async user => {
        // console.log('sign up attempted...')
        const insert = await insertUser(user)
        if (insert.bool) {
            console.log(insert.msg)
            socket.emit('signup succeded')
        } else {
            console.log(insert.msg)
            socket.emit('signup failed')
        }
    })

    socket.on('disconnect', () => {
        let p
        players.forEach(player => {
            if (player.id === socket.id) {
                p = player
            }
        })
        ramen.forEach((ramen, index) => {
            if (ramen.parent = p) {
                removeIndexes.push(index)
            }
        })
        removeIndexes = removeIndex(removeIndexes, ramen)
        players.splice(players.indexOf(socket.id))
    })
})

server.on('error', err => {
    console.error(err)
})

server.listen(8080, () => {
    console.log(`Server listening on port ${8080}`)
})

setInterval(tick, 1000 / TICK_RATE)