// Hitbox
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

// Image
class Img {
    constructor({
        dimensions,
        position,
        src,
        id
    }) {
        this.dimensions = dimensions
        this.position = position
        this.src = src
        this.id = id

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

// Player
class Player {
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
    }
}