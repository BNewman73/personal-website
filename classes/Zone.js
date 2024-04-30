class Zone {
    constructor({dimensions, background, foreground, collisionBlocks, npc, doors, animations, ports, dbPosition}) {
        this.dimensions = dimensions
        this.background = background
        this.foreground = foreground
        this.collisionBlocks = collisionBlocks
        this.npc = npc
        this.doors = doors
        this.animations = animations
        this.ports = ports
        this.dbPosition = dbPosition
    }

    moveUp(player) {
        player.switchSprite('runUp')
        player.direction = 'up'
        const speed = player.speed
        let collision = false
        if (this.doors) {
            for (let i = 0; i < this.doors.length; i++) {
                const door = this.doors[i]
                if (rectCollision({rectangle1: player.hitbox, rectangle2: {...door, position: {x: door.position.x, y: door.position.y + speed}}})) {
                    player.frozen = true
                    door.autoplay = true
                    return
                }
            }
        }
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x, y: collisionBlock.position.y + speed}}})) {
                collision = true
                break
            }
        }
        if (!collision) player.position.y -= speed
    }
    moveLeft(player) {
        player.switchSprite('runLeft')
        player.direction = 'left'
        const speed = player.speed
        if (player.position.x + speed < 0) {
            map[this.ports.left].transition(canvas.width - player.width, undefined)
            return
        }
        let collision = false
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x + speed, y: collisionBlock.position.y}}})) {
                collision = true
                break
            }
        }
        if (!collision) player.position.x -= speed
    }
    moveDown(player) {
        player.switchSprite('runDown')
        player.direction = 'down'
        const speed = player.speed
        if (player.position.y + player.height + speed > canvas.height) {
            map[this.ports.down.to].transition(this.ports.down.x, this.ports.down.y)
            return
        }
        let collision = false
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x, y: collisionBlock.position.y - speed}}})) {
                collision = true
                break
            }
        }
        if (!collision) player.position.y += speed
    }
    moveRight(player) {
        player.switchSprite('runRight')
        player.direction = 'right'
        const speed = player.speed
        if (player.position.x + player.width + speed > canvas.width) {
            map[this.ports.right].transition(0, undefined)
            return
        }
        let collision = false
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x - speed, y: collisionBlock.position.y}}})) {
                collision = true
                break
            }
        }
        if (!collision) player.position.x += speed
    }

    closeToNPC(player) {
        const buf = 10
        return player.hitbox.position.x + player.hitbox.width + buf >= this.npc.position.x && 
        player.hitbox.position.x - buf <= this.npc.position.x + this.npc.width &&
        player.hitbox.position.y + player.hitbox.height + buf >= this.npc.position.y &&
        player.hitbox.position.y - buf <= this.npc.position.y + this.npc.height
    }

    transition(x = player.position.x, y = player.position.y) {
        player.frozen = true
        gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
                zone = this
                canvas.width = this.dimensions.width
                canvas.height = this.dimensions.height
                player.position.x = x
                player.position.y = y
                dialogueBox.translateTo(this.dbPosition)
                if (this.doors) {
                    this.doors.forEach(door => {
                        door.frame = 0
                    })
                }
                gsap.to(overlay, {
                    opacity: 0
                })
                player.frozen = false
                console.log('transitioned')
            }
        })
    }

    display(player) {
        this.background.draw()
        this.collisionBlocks.forEach(block => {
            block.draw()
        })
        if (this.npc) {
            this.npc.draw()
            if (this.npc.uninteractedwit) this.npc.indicator.draw()
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
        if (this.foreground) {
            this.foreground.draw()
        }
        if (dialogueBox.shouldDraw) {
            dialogueBox.draw()
            this.npc.portrait.draw()
        }
    }
}