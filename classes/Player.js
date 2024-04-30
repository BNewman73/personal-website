class Player extends Sprite {
    constructor({position, src, frames, animations}) {
        super({position, src, frames, animations})
        this.speed = 1
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y + 20
            },
            width: this.width,
            height: 30
        }
        this.inside = false
        this.frozen = false
        this.direction = ''
    }

    updateHitbox() {
        this.hitbox.position.x = this.position.x,
        this.hitbox.position.y = this.position.y + 20
        this.hitbox.width = this.width
        this.hitbox.height = 30
    }

    switchSprite(name) {
        const animation = this.animations[name]
        if (animation.image === this.image) return
        this.image = animation.image
        this.frame = 0
    }

    goIdle() {
        if (player.direction === '') return
        if (player.direction === 'up') player.switchSprite('idleUp')
        else if (player.direction === 'left') player.switchSprite('idleLeft')
        else if (player.direction === 'down') player.switchSprite('idleDown')
        else if (player.direction === 'right') player.switchSprite('idleRight')
        player.direction = ''
    }
}