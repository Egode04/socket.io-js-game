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

addEventListener('click', event => {
    let p
    players.forEach(player => {
        if (player.id === socket.id) {
            p = player
        }
    })
    const unusedSpace = {
        x: innerWidth/2 - canvas.width,
        y: innerHeight/2 - canvas.height
    }
    // console.log(p)
    const angle = Math.atan2(
        event.clientY - p.position.y - p.dimensions.height / 2,
        event.clientX - p.position.x - p.dimensions.width / 2
    )
    socket.emit('bowl', angle)
})