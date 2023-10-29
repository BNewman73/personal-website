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

// window.addEventListener('resize', resizeCanvas)
// function resizeCanvas() {
//     const windowWidth = window.innerWidth
//     const windowHeight = window.innerHeight
//     const scaleX = windowWidth / widthAR
//     const scaleY = windowHeight / heightAR
//     scale = Math.min(scaleX, scaleY)
//     const canvasWidth = widthAR * scale
//     const canvasHeight = heightAR * scale
//     canvas.width = canvasWidth
//     canvas.height = canvasHeight
// }