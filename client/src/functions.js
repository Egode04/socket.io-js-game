function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
}

function addHitbox(info, array) {
    const opacity = 0.2
    info.forEach((hitbox) => {
        color = `rgba(25, 200, 255, ${opacity})`
        if (hitbox.type === 'death') color = `rgba(255, 25, 100, ${opacity})`
        
        array.push(
            new Hitbox({
                dimensions: {
                    width: hitbox.dimensions.width,
                    height: hitbox.dimensions.height
                },
                position: {
                    x: hitbox.position.x,
                    y: hitbox.position.y
                },
                color: color
            })
        )
    })
}

function getSpeed(speed) {
    return speed / Math.sqrt(2)
}

function init() {
    // hitboxes
    const hitbox = [
        {
            dimensions: {
                width: calcTiles(3),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(1),
                y: calcTiles(16)
            }
        },
        {
            dimensions: {
                width: calcTiles(2),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(11),
                y: calcTiles(1)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(4),
                y: calcTiles(8)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(1),
                y: calcTiles(11)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(8),
                y: calcTiles(14)
            }
        },
        {
            dimensions: {
                width: calcTiles(2),
                height: calcTiles(3)
            },
            position: {
                x: calcTiles(10),
                y: calcTiles(10)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(12),
                y: calcTiles(13)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(12),
                y: calcTiles(11)
            }
        },
        {
            dimensions: {
                width: calcTiles(2),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(2),
                y: calcTiles(19)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(1),
                y: calcTiles(18)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(10),
                y: calcTiles(18)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(11),
                y: calcTiles(17)
            }
        },
        {
            dimensions: {
                width: calcTiles(3),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(20),
                y: calcTiles(17)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(21),
                y: calcTiles(16)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(19),
                y: calcTiles(1)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(16),
                y: calcTiles(4)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(22),
                y: calcTiles(4)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(19),
                y: calcTiles(7)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(19),
                y: calcTiles(4)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(13),
                y: calcTiles(21)
            }
        },
        {
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(1)
            },
            position: {
                x: calcTiles(17),
                y: calcTiles(21)
            }
        },
        {
            dimensions: {
                width: calcTiles(14),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(0),
                y: calcTiles(22)
            }
        },
        {
            dimensions: {
                width: calcTiles(7),
                height: calcTiles(2)
            },
            position: {
                x: calcTiles(17),
                y: calcTiles(22)
            }
        },
        {
            dimensions: {
                width: calcTiles(3),
                height: calcTiles(3)
            },
            position: {
                x: calcTiles(14),
                y: calcTiles(18)
            },
            type: 'death'
        },
    ]

    for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
            hitbox.push(
                {
                    dimensions: {
                        width: calcTiles(1),
                        height: calcTiles(1)
                    },
                    position: {
                        x: calcTiles(2*col),
                        y: calcTiles(2*row)
                    }
                }
            )
        }
    }

    socket.emit('hitboxes', hitbox)

    // Background
    background = new Img({
        dimensions: {
            width: canvas.width,
            height: canvas.height
        },
        position: {
            x: 0,
            y: 0
        },
        src: './map/arena.png'
    })

    // Structures

    //  tower
    structures.push(new Img({
        dimensions: {
            width: calcTiles(3),
            height: calcTiles(5)
        },
        position: {
            x: calcTiles(1),
            y: calcTiles(13)
        },
        src: './img/tower.png'
    }))

    //  wall
    structures.push(new Img({
        dimensions: {
            width: calcTiles(3),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(14),
            y: calcTiles(21)
        },
        src: './img/wall.png'
    }))

    //  grave stones
    const info = [
        './img/grave cross.png',    // 0
        './img/grave cross.png',    // 1
        './img/grave rip.png',      // 2
        './img/grave text.png',     // 3
        './img/grave cross.png',    // 4
        './img/grave cross.png',    // 5
        './img/grave cross.png',    // 6
        './img/grave rip.png',      // 7
        './img/grave cross.png',    // 8
    ]

    let index = 0
    for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
            structures.push(new Img({
                dimensions: {
                    width: calcTiles(1),
                    height: calcTiles(2)
                },
                position: {
                    x: calcTiles(2*col),
                    y: calcTiles(2*row-1)
                },
                src: info[index]
            }))
            index++
        }
    }

    // grave chamber
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(4),
            y: calcTiles(7)
        },
        src: './img/grave chamber.png'
    }))

    // bench
    structures.push(new Img({
        dimensions: {
            width: calcTiles(2),
            height: calcTiles(2)
        },
        position: {
            x: calcTiles(11),
            y: calcTiles(0)
        },
        src: './img/bench.png'
    }))

    // magic pillar
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(2)
        },
        position: {
            x: calcTiles(19),
            y: calcTiles(6)
        },
        src: './img/magic pillar 1.png'
    }))
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(2)
        },
        position: {
            x: calcTiles(19),
            y: calcTiles(0)
        },
        src: './img/magic pillar 2.png'
    }))
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(22),
            y: calcTiles(2)
        },
        src: './img/magic pillar 3.png'
    }))
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(16),
            y: calcTiles(2)
        },
        src: './img/magic pillar 4.png'
    }))

    //  statue
    structures.push(new Img({
        dimensions: {
            width: calcTiles(3),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(18),
            y: calcTiles(2)
        },
        src: './img/statue.png'
    }))

    //  stone lanterns
    const positions = [
        {
            x: calcTiles(10),
            y: calcTiles(9)
        },
        {
            x: calcTiles(13),
            y: calcTiles(20)
        },
        {
            x: calcTiles(17),
            y: calcTiles(20)
        }
    ]

    positions.forEach(lantern => {
        structures.push(new Img({
            dimensions: {
                width: calcTiles(1),
                height: calcTiles(2)
            },
            position: {
                x: lantern.x,
                y: lantern.y
            },
            src: './img/lantern.png'
        }))
    })

    //  pillar
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(8),
            y: calcTiles(12)
        },
        src: './img/pillar.png'
    }))
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(2)
        },
        position: {
            x: calcTiles(12),
            y: calcTiles(10)
        },
        src: './img/broken pillar.png'
    }))

    //  stone block
    structures.push(new Img({
        dimensions: {
            width: calcTiles(1),
            height: calcTiles(2)
        },
        position: {
            x: calcTiles(12),
            y: calcTiles(12)
        },
        src: './img/stone block.png'
    }))

    //  storage
    structures.push(new Img({
        dimensions: {
            width: calcTiles(3),
            height: calcTiles(3)
        },
        position: {
            x: calcTiles(20),
            y: calcTiles(16)
        },
        src: './img/storage.png'
    }))

    //  hitboxes
    addHitbox(hitbox, hitboxes)

    // add text
    text.push({
        position: {
            x: -50,
            y: -50
        },
        string: '3',
        align: 'center',
        color: '#000',
        size: calcTiles(0.5),

    })

    // animate
    animate()
}

function animate() {
    // if logged in => start game || let gameInProgress = true
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const backgroundImage = new Image()
    backgroundImage.src = './map/arena.png'
    ctx.drawImage(backgroundImage, 0, 0)

    ramen.forEach(ramen => {
        ctx.drawImage(ramenImage, ramen.position.x, ramen.position.y, ramen.dimensions.width, ramen.dimensions.height)
    })

    players.forEach(player => {
        ctx.drawImage(playerImage, player.position.x-calcTiles(0.19), player.position.y-calcTiles(0.44))

        let colors = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        }

        if (player.hp.armor) {
            colors = {
                r: 50,
                g: 100,
                b: 255,
                a: 0.1
            }
        }
        if (player.hp.health === 1) {
            colors = {
                r: 255,
                g: 100,
                b: 50,
                a: 0.1
            }
        }

        ctx.fillStyle = `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${colors.a})`
        ctx.fillRect(player.position.x, player.position.y, player.dimensions.width, player.dimensions.height)
    })

    // change color of player when losing or gaining health
    // ctx.fillRect()

    bowls.forEach(bowl => {
        ctx.drawImage(bowlImage, bowl.position.x-bowl.dimensions.width/2, bowl.position.y-bowl.dimensions.height/2, bowl.dimensions.width, bowl.dimensions.height)
    })

    // console.log(bowls)
    
    structures.forEach(structure => {
        const structureImage = new Image()
        structureImage.src = structure.src
        ctx.drawImage(structureImage, structure.position.x, structure.position.y)
    })

    hitboxes.forEach(hitbox => {
        hitbox.update()
    })

    // draw text
    players.forEach(player => {
        text.forEach(text => {
            ctx.fillStyle = text.color
            ctx.font = `${text.size}px serif`
            ctx.textAlign = text.align
            ctx.fillText(player.hp.health, player.position.x+player.dimensions.width/2, player.position.y+player.dimensions.height/1.05)
            ctx.fillStyle = '#fff'
            ctx.strokeText(player.hp.health)
        })
    })
} init()