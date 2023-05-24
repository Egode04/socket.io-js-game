const socket = io()

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

    // login
    socket.on('logged in', () => {
        succeded(form, h1, 'Login')
        init()
        socket.emit('logged in', user.username)
    })
    socket.on('login failed',  cause => {
        failed(form, h1, 'Login')
        para.login.innerText = cause
    })

    // sign up    
    socket.on('signup succeded',   text => {
        succeded(sign, h2, 'Sign Up', '#8b5cf6')
        para.signup.innerText    = text
        warning.signup.innerText = null
    })
    socket.on('signup failed',  cause => {
        failed(sign, h2, 'Sign Up')
        para.signup.innerText = cause
    })

    // scoreboard
    socket.on('scoreboard', el => {
        updateScoreboard(el)
    })
})