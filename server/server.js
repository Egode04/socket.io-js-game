const http = require('http')
const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socket(server)

const TICK_RATE = 30

const players = []
const inputMap = {}

function tick() {
    players.forEach(player => {
    })
}

io.on('connect', socket => {
    // user connected
    console.log(`New client connected: ${socket.id}`)
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
            width: 0,
            height: 0
        }
    })

    // emit commands here
    socket.on('pressed', keys => {
        inputMap[socket.id] = keys
    })

    socket.on('movement', user => {
        players.forEach(player => {
            if (player.id === socket.id) {
                player.velocity = user.velocity
                player.position = user.position
                player.dimensions = user.dimensions
                console.log(player)
            }
        })
    })
})

server.on('error', err => {
    console.error(err)
})

server.listen(8080, () => {
    console.log(`Server listening on port ${8080}`)
})

setInterval(tick, 1000 / TICK_RATE)