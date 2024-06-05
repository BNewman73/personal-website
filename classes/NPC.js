class NPC extends Sprite {
    constructor({position, src, frames, altSprite, relativePosition, portrait, indicator, dialogue, userQuestions}) {
        super({position, src, frames})
        this.relativePosition = relativePosition
        this.portrait = portrait
        this.indicator = indicator
        this.dialogue = dialogue
        this.userQuestions = userQuestions
        this.interacted = false
        this.altSprite = altSprite
        if (altSprite) {
            const image = new Image()
            image.src = altSprite.src
            this.altSprite.image = image
        }
        this.dialogueIndex = 0
        this.dialogueIndexIndex = 0
    }

    switchSprite() {
        if (this.altSprite) {
            const tempImage = this.image
            const tempFrames = this.frames
            this.image = this.altSprite.image
            this.frames = this.altSprite.frames
            this.altSprite.image = tempImage
            this.altSprite.frames = tempFrames
            if (this.altSprite.yChange) {
                this.position.y += this.altSprite.yChange
                this.altSprite.yChange *= -1
            }
            this.frame = 0
        }
    }
}