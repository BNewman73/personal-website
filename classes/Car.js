class Car extends Sprite {
    constructor({position, src, frames, right, heightOffset}) {
        super({position, src, frames})
        this.right = right
        this.heightOffset = heightOffset
        this.speed = 3
    }
    updatePosition({direction}) {
        this.position.x += (direction * this.speed)
    }
}
