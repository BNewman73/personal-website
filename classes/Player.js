class Player extends Sprite {
    constructor({position, src, frames, spriteBook}) {
        super({position, src, frames})
        this.spriteBook = spriteBook
        for (let spritePage in this.spriteBook) {
            for (let spriteSheet in this.spriteBook[spritePage]) {
                const image = new Image()
                image.src = spriteBook[spritePage][spriteSheet].src
                this.spriteBook[spritePage][spriteSheet].image = image
            }
        }
        this.currentSpritePage = this.spriteBook.outside
        this.speed = 1
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y + 12
            },
            width: this.width,
            height: 12
        }
        this.frozen = true
        this.direction = ''
        this.npc = null
    }

    updateHitbox() {
        this.hitbox.position.x = this.position.x,
        this.hitbox.position.y = this.position.y + this.height / 2
        this.hitbox.width = this.width
        this.hitbox.height = this.height / 2
    }

    drawHitbox() {
        context.fillStyle = 'rgba(0, 255, 0, 0.5)'
        context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    }

    switchSprite(name) {
        const spritePage = this.currentSpritePage[name]
        if (spritePage.image === this.image) return
        this.image = spritePage.image
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