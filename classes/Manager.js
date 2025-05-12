class Manager extends NPC {
    constructor({spriteBook, src, frames, position, portrait, indicator, dialogue, userQuestions}) {
        super({position, src, frames, portrait, indicator, dialogue, userQuestions})
        this.spriteBook = spriteBook
        for (let spriteSheet in this.spriteBook) {
            const image = new Image()
            image.src = spriteBook[spriteSheet].src
            this.spriteBook[spriteSheet].image = image
        }
        this.speed = 2
        this.reachedPlayer = false
        this.leftPlayer = false
        this.shouldDraw = true
    }

    tryMove(player) {
        if (!this.reachedPlayer) {
            if (this.position.y < 170) {
                if (this.image != this.spriteBook['runDown'].image) this.image = this.spriteBook['runDown'].image
                this.position.y += this.speed
                this.indicator.position.y += this.speed
            }
            else if (this.position.x < 325) {
                if (this.image != this.spriteBook['runRight'].image) this.image = this.spriteBook['runRight'].image
                this.position.x += this.speed
                this.indicator.position.x += this.speed
            }
            else if (this.position.y < player.position.y) {
                if (this.image != this.spriteBook['runDown'].image) this.image = this.spriteBook['runDown'].image
                this.position.y += this.speed
                this.indicator.position.y += this.speed
            }
            else if (this.position.x < player.position.x - this.width - 5) {
                if (this.image != this.spriteBook['runRight'].image) this.image = this.spriteBook['runRight'].image
                this.position.x += this.speed
                this.indicator.position.x += this.speed
            }
            else {
                this.reachedPlayer = true
                this.image = this.spriteBook['idleRight'].image
                player.image = player.spriteBook['outside']['idleLeft'].image
                player.npc = this
                for (let i = 0; i < 3; i++) {
                    activeButtons[i] = true
                    const button = buttons[i]
                    button.position.x = Math.min(zone.background.width, canvas.width) / 2 - 272
                    button.position.y = Math.min(zone.background.height, canvas.height) / 2 - 64 + i * 48
                }
                questions.style.left = buttons[0].position.x + 30
                questions.style.top = buttons[0].position.y - 16
                const htmlButtons = questions.querySelectorAll('button')
                htmlButtons.forEach((button, index) => {
                    button.innerText = this.userQuestions[index]
                    button.style.visibility = 'visible'
                })
                dialogueBox.translateTo({
                    x: Math.min(zone.background.width, canvas.width) / 2 - dialogueBox.width / 2,
                    y: Math.min(zone.background.height, canvas.height) - dialogueBox.height - 10
                })
                dialogueBox.shouldDraw = true
                dialogueBox.playDialogue(this)
                this.portrait.position.x = dialogueBox.position.x + 5
                this.portrait.position.y = dialogueBox.position.y + 14
                this.interacted = true
            }
        }
        else if (player.npc != null) return
        else if (!this.leftPlayer) {
            player.frozen = true
            if (this.position.x > 325) {
                if (this.image != this.spriteBook['runLeft'].image) this.image = this.spriteBook['runLeft'].image
                this.position.x -= this.speed
            }
            else if (this.position.y > 170) {
                if (this.image != this.spriteBook['runUp'].image) this.image = this.spriteBook['runUp'].image
                this.position.y -= this.speed
            }
            else if (this.position.x > 95) {
                if (this.image != this.spriteBook['runLeft'].image) this.image = this.spriteBook['runLeft'].image
                this.position.x -= this.speed
            }
            else if (this.position.y > 0 - this.height) {
                if (this.image != this.spriteBook['runUp'].image) this.image = this.spriteBook['runUp'].image
                this.position.y -= this.speed
            }
            else {
                this.leftPlayer = true
                player.image = player.spriteBook['outside']['idleDown'].image
                player.frozen = false
            }
        }
    }
}
