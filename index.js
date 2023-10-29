const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const widthAR = 1024
const heightAR = 576
let scale = 1
canvas.width = widthAR
canvas.height = heightAR
const overlay = {
    opacity: 0
}

const offset = {
    x: -1056,
    y: -350
}

let parsedCollisions
let collisionBlocks
let background
let doors = []
let animations = []
let zone

parsedCollisions = collisionsOutside.parse2D()
collisionBlocks = parsedCollisions.createObjectsFrom2D()
background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './img/hotel.png'
})
doors.push(new Door({
    position: {
        x: canvas.width / 2 - 48,
        y: 260
    },
    src: './img/door.png',
    frames: 8,
    next: 'gym',
    x: 385,
    y: 425
}))
animations.push(new Sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './img/fountain.png',
    frames: 8
}))
const outside = new Zone({
    dimensions: {
        width: 1024,
        height: 576
    },
    background: background,
    collisionBlocks: collisionBlocks,
    doors: doors,
    animations: animations,
    ports: {
        left: 'grocery'
    }
})

parsedCollisions = collisionsGym.parse2D({width: 19})
collisionBlocks = parsedCollisions.createObjectsFrom2D()
background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './img/gym.png'
})
const gym = new Zone({
    dimensions: {
        width: 608,
        height: 480
    },
    background: background,
    collisionBlocks: collisionBlocks,
    ports: {
        down: {
            to: 'outside',
            x: canvas.width / 2 - 16,
            y: canvas.height / 2 + 75
        }
    }
})

parsedCollisions = collisionsGrocery.parse2D()
collisionBlocks = parsedCollisions.createObjectsFrom2D()
background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './img/grocery.png'
})
const grocery = new Zone({
    dimensions: {
        width: 1024,
        height: 576
    },
    background: background,
    collisionBlocks: collisionBlocks,
    ports: {
        right: 'outside'
    }
})

const map = {
    'gym': gym,
    'outside': outside,
    'grocery': grocery
}

const player = new Player({
    position: {
        x: canvas.width / 2 - 16,
        y: canvas.height / 2 + 75
    },
    src: './img/idleDown.png',
    frames: 6,
    animations: {
        idleUp: {
            src: './img/idleUp.png'
        },
        idleLeft: {
            src: './img/idleLeft.png'
        },
        idleDown: {
            src: './img/idleDown.png'
        },
        idleRight: {
            src: './img/idleRight.png'
        },
        runUp: {
            src: './img/runUp.png'
        },
        runLeft: {
            src: './img/runLeft.png'
        },
        runDown: {
            src: './img/runDown.png'
        },
        runRight: {
            src: './img/runRight.png'
        }
    }
})

let lastPressed = ''
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function handleInput() {
    if (player.frozen) {
        return
    }
    if (lastPressed === 'w' && keys.w.pressed) zone.moveUp(player)
    else if (lastPressed === 'a' && keys.a.pressed) zone.moveLeft(player)
    else if (lastPressed === 's' && keys.s.pressed) zone.moveDown(player)
    else if (lastPressed === 'd' && keys.d.pressed) zone.moveRight(player)
    else if (keys.w.pressed) zone.moveUp(player)
    else if (keys.a.pressed) zone.moveLeft(player)
    else if (keys.s.pressed) zone.moveDown(player)
    else if (keys.d.pressed) zone.moveRight(player)
    else if (lastPressed === 'w') player.switchSprite('idleUp')
    else if (lastPressed === 'a') player.switchSprite('idleLeft')
    else if (lastPressed === 's') player.switchSprite('idleDown')
    else if (lastPressed === 'd') player.switchSprite('idleRight')
    player.updateHitbox()
}

function animate() {
    window.requestAnimationFrame(animate)
    zone.background.draw()
    // zone.collisionBlocks.forEach(block => {
    //     block.draw()
    // })
    if (zone.doors) {
        zone.doors.forEach(door => {
            door.draw()
        })
    }
    if (zone.animations) {
        zone.animations.forEach(animation => {
            animation.draw()
        })
    }
    player.draw()
    // zone.foreground.draw()
    handleInput()
    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
}
zone = outside
// resizeCanvas()
animate()