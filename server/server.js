const http = require('http')
const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socket(server)

const TICK_RATE = 30

const canvas = {
    width: 768,
    height: 768
}

const players = []
const inputMap = {}

let hitboxes = []
const bowls = []

const physics = {
    speed: 8
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
    })

    const removeIndexes = []
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

    removeIndexes.forEach(index => {
        bowls.splice(index, 1)
    })

    io.emit('players', players)
    io.emit('bowls', bowls)
}

function getSpeed(speed) {
    return speed / Math.sqrt(2)
}

function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
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

    inputMap[socket.id] = {
        up:    false,
        down:  false,
        left:  false,
        right: false
    }
    players.push({
        id: socket.id,
        position: {
            x: calcTiles(0.19),
            y: calcTiles(0.44)
        },
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
        }
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
            }
        })
    })

    socket.on('disconnect', () => {
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