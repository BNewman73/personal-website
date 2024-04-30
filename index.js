const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const overlay = {
    opacity: 0
}

const offset = {
    x: -1056,
    y: -350
}

const dialogueBox = new DialogueBox({
    position: {
        x: 344,
        y: 471
    },
    src: './img/dialogueBox2.png'
})

let doors = []
let animations = []
let zone

// doors.push(new Door({
//     position: {
//         x: canvas.width / 2 - 48,
//         y: 260
//     },
//     src: './img/door.png',
//     frames: 8,
//     next: 'gym',
//     x: 385,
//     y: 425
// }))
// animations.push(new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     src: './img/fountain.png',
//     frames: 8
// }))
const exteriorHotel = new Zone({
    dimensions: {
        width: 1024,
        height: 576
    },
    background: new Sprite({
        position: {
            x: 0,
            y: 0
        },
        src: './img/exteriorHotel.png'
    }),
    foreground: new Sprite({
        position: {
            x: 0,
            y: 0
        },
        src: './img/exteriorHotelForeground.png'
    }),
    collisionBlocks: collisionsExteriorHotel.createCollisions(),
    npc: new NPC({
        position: {
            x: 100,
            y: 400
        },
        src: './img/hotelManager.png',
        frames: 6,
        firstName: 'Sam',
        portrait: new Sprite({
            position: {
                x: 363,
                y: 517
            },
            src: './img/hotelManagerPortrait.png',
            frames: 10
        }),
        indicator: new Sprite({
            position: {
                x: 100,
                y: 370
            },
            src: './img/indicator.png',
            frames: 6
        }),
        dialogues: [
            [
               { speed: dialogueBox.speeds.slow, string: "Oh, hello!" },
               { speed: dialogueBox.speeds.pause, string: "", pause: true },
               { speed: dialogueBox.speeds.normal, string: "Have you seen my pet" },
               { speed: dialogueBox.speeds.fast, string: "frog", classes: ["green"] },
               { speed: dialogueBox.speeds.normal, string: "around?" }
            ],
            [
               { speed: dialogueBox.speeds.slow, string: "Oh, hello!" },
               { speed: dialogueBox.speeds.pause, string: "", pause: true },
               { speed: dialogueBox.speeds.normal, string: "Have you seen my pet" },
               { speed: dialogueBox.speeds.fast, string: "turtle", classes: ["green"] },
               { speed: dialogueBox.speeds.normal, string: "around?" }
            ]
        ]
    }),
    animations: animations,
    ports: {
        right: 'exteriorSchool'
    },
    dbPosition: {
        x: 344,
        y: 471
    },
})

// doors.push(new Door({
//     position: {
//         x: 480,
//         y: 320
//     },
//     src: './img/exteriorSchoolDoor.png',
//     frames: 8,
//     next: 'interiorSchool',
//     x: 270,
//     y: 420
// }))
// animations.push(new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     src: './img/fountain.png',
//     frames: 8
// }))
const exteriorSchool = new Zone({
    dimensions: {
        width: 1024,
        height: 576
    },
    background: background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        src: './img/exteriorSchool.png'
    }),
    collisionBlocks: collisionsExteriorSchool.createCollisions(),
    doors: [
        new Door({
            position: {
                x: 480,
                y: 320
            },
            src: './img/exteriorSchoolDoor.png',
            frames: 8,
            next: 'interiorSchool',
            x: 270,
            y: 420
        })
    ],
    animations: animations,
    ports: {
        left: 'exteriorHotel'
    },
    dbPosition: {
        x: 344,
        y: 471
    }
})

const interiorSchool = new Zone({
    dimensions: {
        width: 24 * 32,
        height: 15 * 32
    },
    background: new Sprite({
        position: {
            x: -9,
            y: -16
        },
        src: './img/interiorSchool.png'
    }),
    foreground: new Sprite({
        position: {
            x: -9,
            y: -16
        },
        src: './img/interiorSchoolForeground.png'
    }),
    collisionBlocks: collisionsInteriorSchool.createCollisions(),
    npc: new NPC({
        position: {
            x: 60,
            y: 360
        },
        src: './img/principal.png',
        frames: 6,
        firstName: 'Katie',
        portrait: new Sprite({
            position: {
                x: 214 + 16,
                y: 380 + 22
            },
            src: './img/principalPortrait.png',
            frames: 10,
            between: 28
        }),
        indicator: new Sprite({
            position: {
                x: 60,
                y: 330
            },
            src: './img/indicator.png',
            frames: 6
        }),
        dialogues: [
            [
               { speed: dialogueBox.speeds.slow, string: "Oh, hello!" },
               { speed: dialogueBox.speeds.pause, string: "", pause: true },
               { speed: dialogueBox.speeds.normal, string: "Have you seen my pet" },
               { speed: dialogueBox.speeds.fast, string: "frog", classes: ["green"] },
               { speed: dialogueBox.speeds.normal, string: "around?" }
            ],
            [
               { speed: dialogueBox.speeds.slow, string: "Oh, hello!" },
               { speed: dialogueBox.speeds.pause, string: "", pause: true },
               { speed: dialogueBox.speeds.normal, string: "Have you seen my pet" },
               { speed: dialogueBox.speeds.fast, string: "turtle", classes: ["green"] },
               { speed: dialogueBox.speeds.normal, string: "around?" }
            ]
        ]
    }),
    animations: [
        new Sprite({
            position: {
                x: 587,
                y: 144
            },
            src: './img/sitRight1.png',
            frames: 6,
            between: 2
        }),
        new Sprite({
            position: {
                x: 525,
                y: 210
            },
            src: './img/sitRight2.png',
            frames: 6,
            between: 4
        }),
        new Sprite({
            position: {
                x: 127,
                y: 207
            },
            src: './img/sitUp1.png',
            frames: 6
        }),
        new Sprite({
            position: {
                x: 190, 
                y: 50
            },
            src: './img/teacherStandDown.png',
            frames: 6
        }),
        new Sprite({
            position: {
                x: 700,
                y: 180
            },
            src: './img/teacherSitLeft.png',
            frames: 6,
            between: 4
        })
    ],
    ports: {
        down: {
            to: 'exteriorSchool',
            x: canvas.width / 2 - 16,
            y: canvas.height / 2 + 100
        }
    },
    dbPosition: {
        x: 24 * 32 / 2 - 170,
        y: 15 * 32 - 120
    }
})

// collisionBlocks = collisionsInteriorGym.createCollisions()
// background = new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     src: './img/gym.png'
// })
// const gym = new Zone({
//     dimensions: {
//         width: 608,
//         height: 480
//     },
//     background: background,
//     collisionBlocks: collisionBlocks,
//     ports: {
//         down: {
//             to: 'exteriorHotel',
//             x: canvas.width / 2 - 16,
//             y: canvas.height / 2 + 75
//         }
//     }
// })

// collisionBlocks = collisionsExteriorGrocery.createCollisions()
// background = new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     src: './img/grocery.png'
// })
// const grocery = new Zone({
//     dimensions: {
//         width: 1024,
//         height: 576
//     },
//     background: background,
//     collisionBlocks: collisionBlocks,
//     ports: {
//         right: 'exteriorHotel'
//     }
// })

const map = {
    // 'gym': gym,
    'exteriorHotel': exteriorHotel,
    'exteriorSchool': exteriorSchool,
    'interiorSchool': interiorSchool
    // 'grocery': grocery
}

const player = new Player({
    position: {
        x: 270, // canvas.width / 2 - 16,
        y: 420 // canvas.height / 2 + 75
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
    else player.goIdle()
    player.updateHitbox()
}

function handleNPC() {
    if (zone.npc && zone.npc.uninteractedwit && zone.closeToNPC(player)) {
        zone.npc.uninteractedwit = false
        player.goIdle()
        player.frozen = true
        dialogueBox.shouldDraw = true
        dialogueBox.revealing = true
        dialogueBox.populateDialogueText(zone.npc)
        dialogueBox.revealOneCharacter(zone.npc)
        zone.npc.dialogue++
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    zone.display(player)
    handleInput()
    handleNPC()
    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
}
zone = exteriorSchool
// resizeCanvas()
animate()