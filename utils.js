// Array.prototype.parse2D = function(width) {
//     const rows = []
//     for (let i = 0; i < this.length; i += width) {
//         rows.push(this.slice(i, i + width))
//     }
//     return rows
// }

// Array.prototype.createObjectsFrom2D = function(xOffset, yOffset) {
//     const objects = []
//     this.forEach((row, y) => {
//         row.forEach((symbol, x) => {
//             if (symbol != 0) {
//                 objects.push(new CollisionBlock({
//                     position: {
//                         x: 32 * x + xOffset,
//                         y: 32 * y + yOffset
//                     },
//                     width: 32,
//                     height: 32
//                 }))
//             }
//         })
//     })
//     return objects
// }

// Array.prototype.createCollisions = function() {
//     const result = []
//     this.forEach(object => {
//         const parsedCollisionsTemp = object.data.parse2D(object.width)
//         const collisionBlocksTemp = parsedCollisionsTemp.createObjectsFrom2D(0, 0)
//         result.push(...collisionBlocksTemp)
//     })
//     return result
// }

function createObjects({data, classType, offset}) {
    const result = []
    data.forEach(offsetLayer => {
        const offsetx = "offsetx" in offsetLayer ? offsetLayer.offsetx : 0
        const offsety = "offsety" in offsetLayer ? offsetLayer.offsety : 0
        if ("chunks" in offsetLayer) {
            offsetLayer.chunks.forEach(chunk => {
                createObject({
                    array: result,
                    object: chunk, 
                    classType: classType, 
                    res: 16,
                    layerOffset: {
                        x: offsetx,
                        y: offsety
                    },
                    scenePosition: {
                        x: offset.x,
                        y: offset.y
                    }
                })
            })
        }
        else {
            createObject({
                array: result,
                object: offsetLayer, 
                classType: classType, 
                res: 32,
                layerOffset: {
                    x: offsetx,
                    y: offsety
                },
                scenePosition: {
                    x: 0,
                    y: 0
                }
            })
        }
    })
    return result
}

function createObject({array, object, classType, res, layerOffset, scenePosition}) {
    object.data.forEach((val, i) => {
        if (val != 0) {
            const relativePosition = {
                x: (object.x + i % object.width) * res + layerOffset.x,
                y: (object.y + Math.floor(i / object.width)) * res + layerOffset.y
            }
            switch(classType) {
                case CollisionBlock:
                    array.push(new CollisionBlock({
                        position: {
                            x: relativePosition.x + scenePosition.x,
                            y: relativePosition.y + scenePosition.y
                        },
                        width: res,
                        height: res,
                        relativePosition: relativePosition
                    }))
                    break
                case Door:
                    const door = doorMap[val]
                    array.push(new Door({
                        position: {
                            x: relativePosition.x + scenePosition.x,
                            y: relativePosition.y + scenePosition.y
                        },
                        src: door.src,
                        frames: door.frames,
                        zoneTo: door.zoneTo,
                        relativePosition: relativePosition,
                        playerPosition: door.playerPosition,
                        scenePosition: door.scenePosition
                    }))
                    break
                case NPC:
                    const npc = npcMap[val]
                    const indRelPos = {
                        x: relativePosition.x + (npc.inside ? 2 : 1),
                        y: relativePosition.y - (npc.inside ? 20 : 10)
                    }
                    array.push(new NPC({
                        position: {
                            x: relativePosition.x + scenePosition.x,
                            y: relativePosition.y + scenePosition.y
                        },
                        relativePosition: relativePosition,
                        indicator: new Sprite({
                            position: {
                                x: indRelPos.x + scenePosition.x,
                                y: indRelPos.y + scenePosition.y
                            },
                            relativePosition: indRelPos,
                            src: npc.inside ? './img/x32/indicator.png' : './img/x16/indicator.png',
                            frames: 6
                        }),
                        src: npc.src,
                        portrait: new Sprite({
                            position: {x: 0, y: 0},
                            src: npc.portrait,
                            frames: 10
                        }),
                        frames: npc.frames,
                        firstName: npc.firstName,
                        dialogue: npc.dialogue,
                        userQuestions: npc.userQuestions,
                        altSprite: npc.altSprite
                    }))
                    break
                case Sprite:
                    const animation = animationMap[val]
                    array.push(new Sprite({
                        position: {
                            x: relativePosition.x + scenePosition.x,
                            y: relativePosition.y + scenePosition.y
                        },
                        relativePosition: relativePosition,
                        src: animation.src,
                        frames: animation.frames
                    }))
                    break
                default: 
                    console.log(classType)
            }
        }
    })
}

function rectCollision({rectangle1, rectangle2}) {
    return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
}

function getWeightedCarIndex() {
    const randomNumber = Math.random() * totalWeight
    let cumulativeWeight = 0
    for (let i = 0; i < carMap.length; i++) {
        cumulativeWeight += carMap[i].weight;
        if (randomNumber < cumulativeWeight) {
            return i; // Return the index
        }
    }
}