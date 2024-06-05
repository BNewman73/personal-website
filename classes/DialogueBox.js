class DialogueBox extends Sprite {
    constructor({position, src}) {
        super({position, src})
        this.revealing = false
        this.characters = []
        this.container = document.querySelector(".text")
        this.container.style.left = this.position.x + 71
        this.container.style.top = this.position.y
        this.container.style.width = 420
        // this.container.style.height = 50
        this.speeds = {
            pause: 500,
            slowest: 800,
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
        this.container.style.left = this.position.x + 64
        this.container.style.top = this.position.y + 8
    }

    populateDialogueText(dialogue) {
        this.characters = []
        dialogue.forEach((line, index) => {
            if (index < dialogue.length - 1) {
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
            window.setTimeout(() => {
                npc.dialogueIndexIndex++
                if (npc.dialogueIndexIndex < npc.dialogue[npc.dialogueIndex].length) {
                    this.playDialogue(npc)
                }
                else if (npc.dialogueIndex < npc.dialogue.length - 1) {
                    questions.style.display = 'block'
                    showingButtons = true
                }
                else {
                    dialogueBox.shouldDraw = false
                    dialogueBox.removeAllText()
                    player.frozen = false
                    player.npc.switchSprite()
                    player.npc = null
                }
            }, 2000)
        }
    }

    removeAllText() {
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild)
    }

    playDialogue(npc) {
        this.removeAllText()
        this.populateDialogueText(npc.dialogue[npc.dialogueIndex][npc.dialogueIndexIndex])
        this.revealOneCharacter(npc)
    }
}