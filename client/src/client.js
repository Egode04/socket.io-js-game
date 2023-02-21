const socket = io(`ws://localhost:8080`)

socket.on('connect', () => {
    console.log(`Connected as User: ${socket.id}`)

    socket.on('message', msg => console.log(msg))

    socket.on('players', serverPlayers => {
        players = serverPlayers
    })

    socket.on('bowls', serverBowls => {
        bowls = serverBowls
    })
})