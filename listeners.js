window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w': {
            lastPressed = 'w'
            keys.w.pressed = true
            break
        }
        case 'a': {
            lastPressed = 'a'
            keys.a.pressed = true
            break
        }
        case 's': {
            lastPressed = 's'
            keys.s.pressed = true
            break
        }
        case 'd': {
            lastPressed = 'd'
            keys.d.pressed = true
            break
        }
    }
})

window.addEventListener('keyup', e => {
    switch(e.key) {
        case 'w': {
            keys.w.pressed = false
            break
        }
        case 'a': {
            keys.a.pressed = false
            break
        }
        case 's': {
            keys.s.pressed = false
            break
        }
        case 'd': {
            keys.d.pressed = false
            break
        }
    }
})

window.addEventListener('resize', zoom)

// window.addEventListener('keydown', (e) => {
//     if (e.key === ' ' && player.npc != null) dialogueBox.cycleDialogue(player)
// })