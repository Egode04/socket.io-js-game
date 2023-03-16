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

    socket.on('ramen', serverRamen => {
        ramen = serverRamen
    })

    socket.on('logged in', () => {
        succeded(form, h1, 'Login')
        init()
        socket.emit('logged in', user.username)
    })

    socket.on('signup succeded', () => {
        succeded(sign, h2)
    })

    socket.on('signup failed', () => {
        failed(sign)
    })
    socket.on('login failed', () => {
        failed(form)
    })
})