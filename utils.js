Array.prototype.parse2D = function(width = 32) {
    const rows = []
    for (let i = 0; i < this.length; i += width) {
        rows.push(this.slice(i, i + width))
    }
    return rows
}

Array.prototype.createObjectsFrom2D = function(xOffset = 0, yOffset = 0) {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 261 || symbol === 864) {
                objects.push(new CollisionBlock({
                    position: {
                        x: 32 * x + xOffset,
                        y: 32 * y + yOffset
                    }
                }))
            }
        })
    })
    return objects
}

function rectCollision({rectangle1, rectangle2}) {
    return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
}