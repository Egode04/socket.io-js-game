const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

const hitboxes = []
const structures = []

let background

class Hitbox {
    constructor({
        dimensions,
        position,
        velocity,
        physics,
        color
    }) {
        this.dimensions = dimensions
        this.position = position
        this.velocity = velocity
        this.physics = physics
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(
            this.position.x, this.position.y,
            this.dimensions.width, this.dimensions.height
        )
    }

    update() {
        this.draw()

        this.position.x += 0
    }
}

class Img {
    constructor({
        dimensions,
        position,
        src
    }) {
        this.dimensions = dimensions
        this.position = position
        this.src = src

        this.image = new Image(
            this.src,
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        )
    }

    draw() {
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            ctx.drawImage(
                image,
                this.position.x,
                this.position.y,
                this.dimensions.width,
                this.dimensions.height
            )
        }
    }
}

function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
}

function addHitbox(info, array) {
    const opacity = 0.2
    info.forEach((hitbox) => {
        color = `rgba(25, 25, 255, ${opacity})`
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

    //  grave stones with cross
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

    animate()
}

function animate() {
    requestAnimationFrame(animate)

    background.draw()
    
    structures.forEach(structure => {
        structure.draw()
    })

    hitboxes.forEach(hitbox => {
        hitbox.update()
    })
} init()