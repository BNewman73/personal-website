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
            if (symbol != 0) {
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

Array.prototype.createCollisions = function() {
    const result = []
    this.forEach(object => {
        const parsedCollisionsTemp = object.data.parse2D(object.width)
        const collisionBlocksTemp = parsedCollisionsTemp.createObjectsFrom2D(object.x, object.y)
        result.push(...collisionBlocksTemp)
    })
    return result
}

function rectCollision({rectangle1, rectangle2}) {
    return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
}