class Zone {
    constructor({background, foreground, absoluteForeground, collisionBlocks, doors, animations, foregroundAnimations, npcs, inside = true}) {
        this.background = background
        this.foreground = foreground
        this.absoluteForeground = absoluteForeground
        this.collisionBlocks = collisionBlocks
        this.doors = doors
        this.animations = animations
        this.foregroundAnimations = foregroundAnimations
        this.npcs = npcs
        this.movables = [this.background, this.foreground, this.absoluteForeground, ...this.collisionBlocks, ...this.doors, ...this.animations]
        if (this.npcs) {
            this.npcs.forEach(npc => {
                this.movables.push(npc)
                this.movables.push(npc.indicator)
            })
        }
        if (this.foregroundAnimations) {
            this.foregroundAnimations.forEach(animation => {
                this.movables.push(animation)
            })
        }
        this.inside = inside
    }

    transition({playerPosition, scenePosition}) {
        gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
                if (this.inside) {
                    player.currentSpritePage = player.spriteBook.inside
                    // player.speed = 2
                    player.width = 32
                    player.height = 48
                }
                else {
                    offset.x = scenePosition.x
                    offset.y = scenePosition.y
                    player.currentSpritePage = player.spriteBook.outside
                    player.width = 16
                    player.height = 24
                    this.movables.forEach(movable => {
                        movable.position.x = scenePosition.x
                        movable.position.y = scenePosition.y
                        if (movable.relativePosition) {
                            movable.position.x += movable.relativePosition.x
                            movable.position.y += movable.relativePosition.y
                        }
                    })
                    carsLeft.forEach(car => {
                        car.position.y = scenePosition.y + car.heightOffset + roadRelativePosition.left
                    })
                    carsRight.forEach(car => {
                        car.position.y = scenePosition.y + car.heightOffset + roadRelativePosition.right
                    })
                }
                zone = this
                canvas.width = zone.inside ? zone.background.width : 1024
                canvas.height = zone.inside ? zone.background.height : 576
                zoom()
                player.position.x = playerPosition.x
                player.position.y = playerPosition.y
                // dialogueBox.translateTo(this.dbPosition)
                if (this.doors) {
                    this.doors.forEach(door => {
                        door.frame = 0
                    })
                }
                gsap.to(overlay, {
                    opacity: 0
                })
                player.frozen = false
            }
        })
    }

    display(player, manager) {
        this.background.draw()
        if (this.npcs) {
            this.npcs.forEach(npc => {
                npc.draw()
                if (!npc.interacted) npc.indicator.draw()
                })
        }
        if (this.doors) {
            this.doors.forEach(door => {
                door.draw()
            })
        }
        if (this.animations) {
            this.animations.forEach(animation => {
                animation.draw()
            })
        }
        player.draw()
        if (!manager.leftPlayer) manager.draw()
        if (!manager.interacted) manager.indicator.draw()
        // player.drawHitbox()
        this.foreground.draw()
        if (this.foregroundAnimations) {
            this.foregroundAnimations.forEach(animation => {
                animation.draw()
            })
        }
        if (!this.inside) {
            for (let i = 0; i < carsLeft.length; i++) {
                carsLeft[i].draw()
            }
            for (let i = 0; i < carsRight.length; i++) {
                carsRight[i].draw()
            }
        }
        if (this.absoluteForeground) {
            this.absoluteForeground.draw()
        }
        // this.collisionBlocks.forEach(block => {
        //     block.draw()
        // })
        if (dialogueBox.shouldDraw) {
            dialogueBox.draw()
            player.npc.portrait.draw()
        }
        if (showingButtons) {
            for (let i = 0; i < 3; i++) {
                if (activeButtons[i]) buttons[i].draw()
            }
        }
    }
}
