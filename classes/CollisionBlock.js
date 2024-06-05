class CollisionBlock {
    constructor({position, width, height, relativePosition}) {
        this.position = position
        this.width = width
        this.height = height
        this.relativePosition = relativePosition
    }

    draw() {
        context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}