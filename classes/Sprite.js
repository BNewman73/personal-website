class Sprite {
    constructor({position, src, frames = 1, between = 0, animations, loop = true, autoplay = true}) {
        this.position = position
        this.frames = frames
        this.between = between
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.between === 0 ? this.image.width / frames : (this.image.width - ((this.frames - 1) * this.between)) / frames
            this.height = this.image.height
        }
        this.image.src = src
        this.frame = 0
        this.elapsed = 0
        this.buffer = 20
        this.loop = loop
        this.autoplay = autoplay
        this.animations = animations
        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].src
                this.animations[key].image = image
            }
        }
    }

    draw() {
        if (!this.loaded || !this.image.src) return
        const cropbox = {
            sx: this.width * this.frame + this.between * this.frame,
            sy: 0,
            swidth: this.width,
            sheight: this.height
        }
        context.drawImage(
            this.image,
            cropbox.sx,
            cropbox.sy,
            cropbox.swidth,
            cropbox.sheight,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.updateFrame()
    }

    updateFrame() {
        if (!this.autoplay) return
        this.elapsed++
        if (this.elapsed % this.buffer === 0) {
            if (this.frame < this.frames - 1) this.frame += 1
            else if (this.loop) this.frame = 0
            else {
                this.autoplay = false
                this.handleAnimationCompletion()
            }
        }
    }
}