class NPC extends Sprite {
    constructor({position, src, frames, firstName, portrait, indicator, dialogues}) {
        super({position, src, frames})
        this.firstName = firstName
        this.portrait = portrait
        this.uninteractedwit = true
        this.indicator = indicator
        this.dialogues = dialogues
        this.dialogue = 0
    }
}