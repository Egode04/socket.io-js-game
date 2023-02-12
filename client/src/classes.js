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

class Player {
    constructor({
        dimensions,
        position,
        velocity = {x: 0, y: 0},
        physics,
        color
    }) {
        this.dimensions = dimensions
        this.position = position
        this.velocity = velocity
        this.color = color
        this.physics = physics
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        )
    }

    update() {
        this.draw()

        // velocity change
        //  vertical
        if (keysPressed.w) {
            this.velocity.y = -this.physics.speed
        }

        if (keysPressed.s) {
            this.velocity.y = this.physics.speed
        }

        if (!keysPressed.w && !keysPressed.s || keysPressed.w && keysPressed.s) {
            this.velocity.y = 0
        }

        //  horisontal
        if (keysPressed.a) {
            this.velocity.x = -this.physics.speed
        }

        if (keysPressed.d) {
            this.velocity.x = this.physics.speed
        }

        if (!keysPressed.a && !keysPressed.d || keysPressed.a && keysPressed.d) {
            this.velocity.x = 0
        }

        //  diagonal
        if (keysPressed.w && keysPressed.a) {
            this.velocity = {
                x: -getSpeed(this.physics.speed),
                y: -getSpeed(this.physics.speed)
            }
        } else if (keysPressed.w && keysPressed.d) {
            this.velocity = {
                x:  getSpeed(this.physics.speed),
                y: -getSpeed(this.physics.speed)
            }
        } else if (keysPressed.s && keysPressed.d) {
            this.velocity = {
                x:  getSpeed(this.physics.speed),
                y:  getSpeed(this.physics.speed)
            }
        } else if (keysPressed.s && keysPressed.a) {
            this.velocity = {
                x: -getSpeed(this.physics.speed),
                y:  getSpeed(this.physics.speed)
            }
        }

        // position change
        if (
            this.position.x + this.velocity.x > 0 &&
            this.position.x + this.velocity.x + this.dimensions.width < canvas.width
        ) {
            this.position.x += this.velocity.x
        } else {
            this.velocity.x = -this.velocity.x
        }
        if (
            this.position.y + this.velocity.y > 0 &&
            this.position.y + this.velocity.y + this.dimensions.height < canvas.height - calcTiles(2)
        ) {
            this.position.y += this.velocity.y
        } else {
            this.velocity.y = -this.velocity.y
        }
    }
}