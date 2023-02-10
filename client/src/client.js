const socket = io(`ws://localhost:8080`)

socket.on('connect', () => {
    console.log('connected')
})