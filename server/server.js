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

    io.emit('players', players)
}

function getSpeed(speed) {
    return speed / Math.sqrt(2)
}

function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
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
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(2)
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