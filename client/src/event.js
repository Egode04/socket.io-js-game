addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keysPressed.w = true
            break
        case 'a':
            keysPressed.a = true
            break
        case 's':
            keysPressed.s = true
            break
        case 'd':
            keysPressed.d = true
            break
    }
    socket.emit('pressed', keysPressed)
    socket.emit('movement', player)
})

// addEventListener('keypress', interval = setInterval(socket.emit('movement', player), 1000/30))

addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keysPressed.w = false
            break
        case 'a':
            keysPressed.a = false
            break
        case 's':
            keysPressed.s = false
            break
        case 'd':
            keysPressed.d = false
            break
    }
    socket.emit('pressed', keysPressed)
    socket.emit('movement', player)
    // clearInterval(interval)
})