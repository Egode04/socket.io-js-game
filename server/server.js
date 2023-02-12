const http = require('http')
const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socket(server)

io.on('connect', socket => {
    // user connected
    console.log(`New client connected: ${socket.id}`)

    // emit commands here
    socket.on('message', msg => {
        console.log(msg)
    })
})

server.on('error', err => {
    console.error(err)
})

server.listen(8080, () => {
    console.log(`Server listening on port ${8080}`)
})