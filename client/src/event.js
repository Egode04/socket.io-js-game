addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keysPressed.up = true
            break
        case 'a':
            keysPressed.left = true
            break
        case 's':
            keysPressed.down = true
            break
        case 'd':
            keysPressed.right = true
            break
    }
    socket.emit('pressed', keysPressed)
    socket.emit('movement', player)
})


addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keysPressed.up = false
            break
        case 'a':
            keysPressed.left = false
            break
        case 's':
            keysPressed.down = false
            break
        case 'd':
            keysPressed.right = false
            break
    }
    socket.emit('pressed', keysPressed)
    socket.emit('movement', player)
})