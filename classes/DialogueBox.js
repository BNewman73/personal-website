class DialogueBox extends Sprite {
    constructor({position, src}) {
        super({position, src})
        this.revealing = false
        this.characters = []
        this.container = document.querySelector(".text")
        this.container.style.left = this.position.x + 71
        this.container.style.top = this.position.y + 26
        this.container.style.width = 250
        this.container.style.height = 100
        this.speeds = {
            pause: 500,
            slow: 120,
            normal: 90, 
            fast: 40,
            superFast: 10
        }
        this.shouldDraw = false
    }

    translateTo(position) {
        this.position.x = position.x
        this.position.y = position.y
        this.container = document.querySelector(".text")
        this.container.style.left = this.position.x + 71
        this.container.style.top = this.position.y + 26
    }

    populateDialogueText(npc) {
        if (npc.dialogue >= npc.dialogues.length) return
        this.characters = []
        const textLines = npc.dialogues[npc.dialogue]
        textLines.forEach((line, index) => {
            if (index < textLines.length - 1) {
                line.string += " "
            }
            line.string.split("").forEach((character) => {
                let span = document.createElement("span")
                span.textContent = character
                this.container.appendChild(span)
                this.characters.push({
                    span: span,
                    isSpace: character === " " && !line.pause,
                    delayAfter: line.speed,
                    classes: line.classes || []
                })
            })
        })
    }

    revealOneCharacter(npc) {
        let next = this.characters.splice(0, 1)[0]
        next.span.classList.add("revealed")
        next.classes.forEach((c) => {
            next.span.classList.add(c)
        })
        let delay = next.isSpace && !next.pause ? 0 : next.delayAfter
        if (this.characters.length > 0) {
            setTimeout(() => {
                this.revealOneCharacter(npc)
            }, delay)
        }
        else {
            this.revealing = false
        }
    }

    removeAllText() {
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild)
    }

    cycleDialogue(npc) {
        if (npc.dialogue === 0 || this.revealing) return
        if (npc.dialogue < npc.dialogues.length) {
            this.revealing = true
            this.removeAllText()
            this.populateDialogueText(npc)
            this.revealOneCharacter(npc)
            npc.dialogue++
        }
        else {
            this.shouldDraw = false
            this.removeAllText()
            player.frozen = false
        }
    }
}