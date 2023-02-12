const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

let hitboxes = []

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

function calcTiles(tiles) {
    const tileSize = 32
    return tiles * tileSize
}

function addHitbox(info, array) {
    info.forEach((hitbox) => {
        const opacity = 0.2
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

function drawBackground() {
    const image = new Image(canvas.width, canvas.height)
    image.onload = drawImageActualSize

    image.src = './map/arena.png'

    function drawImageActualSize() {
        canvas.width = this.naturalWidth
        canvas.height = this.naturalHeight

        ctx.drawImage(this, 0, 0, this.width, this.height)
    }
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

    addHitbox(hitbox, hitboxes)

    animate()
}

function animate() {
    requestAnimationFrame(animate)

    drawBackground()

    hitboxes.forEach((hitbox, index) => {
        hitbox.update()
    })
} init()