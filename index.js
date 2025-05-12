const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const playerCenterPosition = {
    x: canvas.width / 2 - 8,
    y: canvas.height / 2 - 12
}

const interiorPosition = {
    x: 0,
    y: 0
}

const overlay = {
    opacity: 0
}

const dialogueBox = new DialogueBox({
    position: {
        x: 0,
        y: 0
    },
    src: './img/dialogueBox.png'
})

const activeButtons = [false, false, false]
let showingButtons = false
const buttons = [
    new Sprite({
        position: {
            x: 0,
            y: 10
        },
        src: './img/button.png'
    }),
    new Sprite({
        position: {
            x: 0,
            y: 58
        },
        src: './img/button.png'
    }),
    new Sprite({
        position: {
            x: 0,
            y: 106
        },
        src: './img/button.png'
    })
]

const doorMap = {
    '51092': {
        ref: 'enterSchool',
        src: './img/x16/schoolDoor.png',
        frames: 8,
        zoneTo: 'school',
        playerPosition: {
            x: 275,
            y: 400
        },
        scenePosition: interiorPosition
    },
    '53500': {
        ref: 'enterPolice',
        src: './img/x16/policeDoor.png',
        frames: 8,
        zoneTo: 'police',
        playerPosition: {
            x: 80,
            y: 525
        },
        scenePosition: interiorPosition
    },
    '13274': {
        ref: 'exitSchoolLeft',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -912,
            y: -160
        }
    },
    '13275': {
        ref: 'exitSchoolRight',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -1008,
            y: -160
        }
    },
    '8953': {
        ref: 'exitPolice',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -1225,
            y: -470
        }
    },
    '53584': {
        ref: 'enterGroceryRight',
        src: './img/x16/groceryDoor.png',
        frames: 8,
        zoneTo: 'grocery',
        playerPosition: {
            x: 832,
            y: 390
        },
        scenePosition: interiorPosition
    },
    '53752': {
        ref: 'enterGroceryLeft',
        src: './img/x16/groceryDoorLeft.png',
        frames: 8,
        zoneTo: 'grocery',
        playerPosition: {
            x: 542,
            y: 390
        },
        scenePosition: interiorPosition
    },
    '9025': {
        ref: 'exitGroceryLeft',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -192,
            y: -500
        }
    },
    '9041': {
        ref: 'exitGroceryRight',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -287,
            y: -500
        }
    },
    '11381': {
        ref: 'enterHospital',
        src: './img/x16/invisibleDoor.png',
        frames: 1,
        zoneTo: 'hospital',
        playerPosition: {
            x: 224,
            y: 460
        },
        scenePosition: interiorPosition
    },
    '8557': {
        ref: 'exitHospital',
        src: './img/x32/invisibleDoor.png',
        frames: 1,
        zoneTo: 'city',
        playerPosition: playerCenterPosition,
        scenePosition: {
            x: -80,
            y: -190
        }
    }
}

const npcMap = {
    '18079': {
        src: './img/x32/principal.png',
        frames: 6,
        portrait: './img/x32/principalPortrait.png',
        dialogue: [
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Hi there!" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I'm" },
                    { speed: dialogueBox.speeds.normal, string: "Mrs. Kay,", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "the principal here at our virtual school." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I'm here to help you learn more about Brandon's time at Texas A&M University!"}
                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "The easy ones!" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Just kidding." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon's favorite course during his time at Texas A&M University was CSCE 452" },
                    { speed: dialogueBox.speeds.normal, string: "Robotics and Spatial Intelligence.", classes: ["bold"] },

                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "This team project oriented course explored algorithms for executing spatial tasks and related concepts such as dealing with uncertainty in data." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Course projects utilized ROS," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "a middleware for robotics software development," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "to apply learned algorithms and concepts to virtual robots." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Though often challenging," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "projects were extremely fun to work on and equally rewarding to complete." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Who knew robots were so cool?" },
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Of, course!" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon was a member of" },
                    { speed: dialogueBox.speeds.normal, string: "Phi Delta Theta", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "fraternity and the" },
                    { speed: dialogueBox.speeds.normal, string: "Peer Teacher", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "program for the department of computer science and engineering." }
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "While the fraternity was a great catalyst for the development of his social skills," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "his time as a peer teacher was even more rewarding and beneficial. " },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Firstly, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "the opportunity allowed Brandon to deepen his understanding of complex concepts by explaining them to others, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "thereby reinforcing his own knowledge." }
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Secondly, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "the opportunity honed his communication and teaching skills as he learned to present information clearly and adapt to suit diverse learning styles." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Finally, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: " the opportunity provided valuable leadership experience and enhanced his confidence in public speaking and mentorship. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true }
                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Word on the street is that Brandon dropped 50 in an intramural basketball game" },
                    { speed: dialogueBox.speeds.slowest, string: " ... " },
                    { speed: dialogueBox.speeds.normal, string: "or maybe it was 5." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I guess we'll never know!" },
                ]
            ]
        ],
        userQuestions: [
            "What was Brandon's favorite course at university?",
            "Did Brandon participate in any extracurricular activities?",
            "I'm going to do some more exploring."
        ],
        inside: true
    },
    '13338': {
        src: './img/x32/policeChiefDefault.png',
        frames: 6,
        portrait: './img/x32/policeChiefPortrait.png',
        dialogue: [
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Hello!" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I'm" },
                    { speed: dialogueBox.speeds.normal, string: "Officer Ramirez.", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "There's been no crime ever since Brandon has taken charge of town," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "so," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "we did a little remodeling here at the station. " }
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Anyways, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "there's a lot to learn about Brandon regarding his values and experiences." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "What would you like to know? " },
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Brandon holds many core values that guide both his professional and personal life. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "These are ingrained in his character and evident in everything he does." }
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "First and foremost is" },
                    { speed: dialogueBox.speeds.normal, string: "integrity.", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "He believes that honesty and strong moral principles are foundational to a meaningful life and a prerequisite to all else." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Following integrity is" },
                    { speed: dialogueBox.speeds.normal, string: "excellence.", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "He strives for greatness in all aspects of his life, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "giving his best effort in everything that he does. " }
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Finally is" },
                    { speed: dialogueBox.speeds.normal, string: "resilence.", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Failures and setbacks are inevitable, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "but Brandon takes pride in how he responds to these learning opportunities. " },
                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Brandon is currently working as a mail carrier for the USPS in his hometown of Amarillo, Texas." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Although he would rather be working in the field of computer science," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "he is grateful for the opportunity and enjoys the work-life balance that it provides." },
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Did you know that Brandon has only been caught speeding a single time" },
                    { speed: dialogueBox.speeds.slowest, string: " ... " },
                    { speed: dialogueBox.speeds.normal, string: "what an upstanding citizen!" },
                ]
            ]
        ],
        userQuestions: [
            "What values are important to Brandon?",
            "Where is Brandon working now?",
            "I'm going to do some more exploring."
        ],
        inside: true,
        altSprite: {
            src: './img/x32/policeChiefAlt.png',
            frames: 6
        }
    },
    '13145': {
        src: './img/x32/shopperLeft.png',
        frames: 6,
        portrait: './img/x32/shopperPortrait.png',
        dialogue: [
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Oh, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "hello there! " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I'm" },
                    { speed: dialogueBox.speeds.normal, string: "Barbara,", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "a frequent shopper here at the local grocery store. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "You can learn a lot about Brandon through his habits when it comes to eating." },
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Although he maintains a relatively healthy diet, "},
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "by far and away Brandon's two favorite foods are" },
                    { speed: dialogueBox.speeds.normal, string: "animal crackers", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "and" },
                    { speed: dialogueBox.speeds.normal, string: "chocolate milk.", classes: ["bold"] },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "In a perfect world, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "he would live off of these and a multivitamin alone. " },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "In reality, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon primarily eats home cooked meals as opposed to eating out. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "This is due to his" },
                    { speed: dialogueBox.speeds.normal, string: "cost-conscious", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "and" },
                    { speed: dialogueBox.speeds.normal, string: "health oriented", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "nature." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Unsurprisingly, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "his favorite cuisine is Mexican. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "He is" },
                    { speed: dialogueBox.speeds.normal, string: "hispanic", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "after all." },
                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "In Matthew 4:4, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Jesus says " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "'It is written, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "'Man shall not live by bread alone, but by every word that proceeds from the mouth of God.''" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "In John 6:46-47, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Jesus says " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "'Most assuredly, I say to you, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "he who believes in Me has everlasting life. " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I am the bread of life.'" },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Brandon is a" },
                    { speed: dialogueBox.speeds.normal, string: "christian", classes: ["bold"] },
                    { speed: dialogueBox.speeds.normal, string: "in his beliefs." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "He encourages everyone to receive the gift of God's grace through His son Jesus Christ." },

                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Such a heart on that young man Brandon." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "He regularly takes bananas to the doctor when they aren't peeling well" },
                    { speed: dialogueBox.speeds.slowest, string: " ... " },
                ]
            ]
        ],
        userQuestions: [
            "What does Brandon like to eat?",
            "What about food for the soul?",
            "I'm going to keep exploring. "
        ],
        inside: true,
        altSprite: {
            src: './img/x32/shopperRight.png',
            frames: 6
        }
    },
    '16951': {
        src: './img/x32/doctorDistracted.png',
        frames: 10,
        portrait: './img/x32/doctorPortrait.png',
        dialogue: [
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Good day!" },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "I'm" },
                    { speed: dialogueBox.speeds.normal, string: "Dr. Patel,", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "the resident physician here." },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Let me tell you about Brandon's commitment to health and wellness," },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "both personally and professionally." }
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Staying physically active and learning new things! " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon loves to break a sweat by participating in sports,  " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "running, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "and lifting weights." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Since graduating from university, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon has also resumed his study and acquisition of the" },
                    { speed: dialogueBox.speeds.normal, string: "Japanese language.", classes: ["bold"] },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Although time consuming, " },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "his passionate interest in the language means that it is always enjoyable. " },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "His abosolute favorite pastime has become watching Japanese shows with their original Japanese audio and subtitles. "},
                ],
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "Work hard, play hard! ", classes: ["bold"] },
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "Brandon believes that a balanced approach is key to sustaining long-term motivation and happiness in life's endeavors." },
                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "This mindset allows for dedicated and intense focus on work projects, "},
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: " often leading to significant breakthroughs and a profound sense of accomplishment."}

                ],
                [
                    { speed: dialogueBox.speeds.normal, string: "Equally important is the 'play hard' aspect that fosters mental recovery, "},
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "thus preventing burnout,"},
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "maintaining mental health,"},
                    { speed: dialogueBox.speeds.pause, string: "", pause: true },
                    { speed: dialogueBox.speeds.normal, string: "and enhancing overall well-being."}
                ]
            ],
            [
                [
                    { speed: dialogueBox.speeds.normal, string: "It is rumored that Brandon has donated a kidney 9 times" },
                    { speed: dialogueBox.speeds.slowest, string: " ... " },
                    { speed: dialogueBox.speeds.normal, string: "remarkable!" },
                ]
            ]
        ],
        userQuestions: [
            "How does Brandon like to spend his free time?",
            "What is Brandon's approach to work-life balance?",
            "I'm going to do some more exploring."
        ],
        inside: true,
        altSprite: {
            src: './img/x32/doctor.png',
            frames: 6,
            yChange: 0
        }
    }
}

const animationMap = {
    '10911': {
        src: './img/x32/cashier.png',
        frames: 6
    },
    '23658': {
        src: './img/x16/flag.png',
        frames: 8
    },
    '38909': {
        src: './img/x16/shore.png',
        frames: 8
    },
    '38911': {
        src: './img/x16/water.png',
        frames: 8
    },
    '12125': {
        src: './img/x32/patient.png',
        frames: 12
    },
    '13711': {
        src: './img/x32/nurse.png',
        frames: 6
    },
    '18509': {
        src: './img/x32/patient2.png',
        frames: 6
    },
    '15261': {
        src: './img/x32/lobster.png',
        frames: 6
    },
    '17317': {
        src: './img/x32/policeBack1.png',
        frames: 6
    },
    '15077': {
        src: './img/x32/policeBack2.png',
        frames: 6
    },
    '15021': {
        src: './img/x32/policeHead.png',
        frames: 6
    },
    '19387': {
        src: './img/x32/coffee.png',
        frames: 6
    },
    '19395': {
        src: './img/x32/fish.png',
        frames: 8
    },
    '16269': {
        src: './img/x32/student1SitRight.png',
        frames: 6
    },
    '22989': {
        src: './img/x32/student2SitRight.png',
        frames: 6
    },
    '21319': {
        src: './img/x32/teacher1.png',
        frames: 10
    },
    '25235': {
        src: './img/x32/teacher2SitLeft.png',
        frames: 6
    },
    '27027': {
        src: './img/x32/student3SitUp.png',
        frames: 6
    },
    '29267': {
        src: './img/x32/student4SitUp.png',
        frames: 6
    },
    '62230': {
        src: './img/x16/character3.png',
        frames: 6
    },
    '62084': {
        src: './img/x16/fountainBottom.png',
        frames: 8
    },
    '62052': {
        src: './img/x16/fountainTop.png',
        frames: 8
    },
    '62016': {
        src: './img/x16/stretcher.png',
        frames: 6
    },
    '64352': {
        src: './img/x16/cat.png',
        frames: 12
    },
    '64346': {
        src: './img/x16/pigeon1.png',
        frames: 6
    },
    '64340': {
        src: './img/x16/pigeon2.png',
        frames: 6
    },
    '64572': {
        src: './img/x16/character5.png',
        frames: 6
    },
    '64406': {
        src: './img/x16/bbq.png',
        frames: 6
    },
    '67130': {
        src: './img/x16/character2.png',
        frames: 6
    },
    '69376': {
        src: './img/x16/character6.png',
        frames: 6
    },
    '24309': {
        src: './img/x16/bouncing.png',
        frames: 26
    },
    '75772': {
        src: './img/x16/beacher6.png',
        frames: 6
    },
    '78013': {
        src: './img/x16/beacher2.png',
        frames: 6
    },
    '71610': {
        src: './img/x16/beacher1.png',
        frames: 6
    },
    '73856': {
        src: './img/x16/beacher5.png',
        frames: 6
    },
    '80906': {
        src: './img/x16/beacher3.png',
        frames: 12
    },
    '82480': {
        src: './img/x16/beacher4.png',
        frames: 10
    }
}

// let doors = []
// let animations = []

const city = new Zone({
    background: new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        src: './img/x16/cityBackground.png'
    }),
    foreground: new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        src: './img/x16/cityForeground.png'
    }),
    absoluteForeground: new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        src: './img/x16/cityAbsoluteForeground.png'
    }),
    collisionBlocks: createObjects({
        data: collisionsCity,
        offset: offset,
        classType: CollisionBlock
    }),
    doors: createObjects({
        data: doorsCity,
        offset: offset,
        classType: Door
    }),
    animations: createObjects({
        data: animationsCity,
        offset: offset,
        classType: Sprite
    }),
    foregroundAnimations: createObjects({
        data: foregroundAnimationsCity,
        offset: offset,
        classType: Sprite
    }),
    inside: false
})
let zone = city

const school = new Zone({
    background: new Sprite({
        position: {
            x: 0,
            y: 0
        },
        src: './img/x32/school.png'
    }),
    foreground: new Sprite({
        position: {
            x: 0,
            y: 0
        },
        src: './img/x32/schoolForeground.png'
    }),
    collisionBlocks: createObjects({
        data: collisionsSchool,
        classType: CollisionBlock
    }),
    animations: createObjects({
        data: animationsSchool,
        classType: Sprite
    }),
    doors: createObjects({
        data: doorsSchool,
        classType: Door
    }),
    npcs: createObjects({
        data: npcsSchool,
        classType: NPC
    })
})

const police = new Zone({
    background: new Sprite({
        position: defaultPos,
        src: './img/x32/policeBackground.png'
    }),
    foreground: new Sprite({
        positon: defaultPos,
        src: './img/x32/policeForeground.png'
    }),
    collisionBlocks: createObjects({
        data: collisionsPolice,
        classType: CollisionBlock
    }),
    animations: createObjects({
        data: animationsPolice,
        classType: Sprite
    }),
    foregroundAnimations: createObjects({
        data: foregroundAnimationsPolice,
        offset: offset,
        classType: Sprite
    }),
    doors: createObjects({
        data: doorsPolice,
        classType: Door
    }),
    npcs: createObjects({
        data: npcsPolice,
        classType: NPC
    })
})

const grocery = new Zone({
    background: new Sprite({
        position: defaultPos,
        src: './img/x32/groceryBackground.png'
    }),
    foreground: new Sprite({
        position: defaultPos,
        src: './img/x32/groceryForeground.png'
    }),
    collisionBlocks: createObjects({
        data: collisionsGrocery,
        classType: CollisionBlock
    }),
    animations: createObjects({
        data: animationsGrocery,
        classType: Sprite
    }),
    doors: createObjects({
        data: doorsGrocery,
        classType: Door
    }),
    npcs: createObjects({
        data: npcsGrocery,
        classType: NPC
    })
})

const hospital = new Zone({
    background: new Sprite({
        posiition: defaultPos,
        src: './img/x32/hospitalBackground.png'
    }),
    foreground: new Sprite({
        position: defaultPos,
        src: './img/x32/hospitalForeground.png'
    }),
    collisionBlocks: createObjects({
        data: collisionsHospital,
        classType: CollisionBlock
    }),
    doors: createObjects({
        data: doorsHospital,
        classType: Door
    }),
    npcs: createObjects({
        data: npcsHospital,
        classType: NPC
    }),
    animations: createObjects({
        data: animationsHospital,
        classType: Sprite
    })
})

const map = {
    city: city,
    school: school,
    police: police,
    grocery: grocery,
    hospital: hospital
}

const player = new Player({
    position: {
        x: canvas.width / 2 - 8,
        y: canvas.height / 2 - 12
    },
    src: './img/x16/player/idleDown.png',
    frames: 6,
    spriteBook: {
        outside: {
            idleUp: {
                src: './img/x16/player/idleUp.png'
            },
            idleDown: {
                src: './img/x16/player/idleDown.png'
            },
            idleLeft: {
                src: './img/x16/player/idleLeft.png'
            },
            idleRight: {
                src: './img/x16/player/idleRight.png'
            },
            runUp: {
                src: './img/x16/player/runUp.png'
            },
            runDown: {
                src: './img/x16/player/runDown.png'
            },
            runLeft: {
                src: './img/x16/player/runLeft.png'
            },
            runRight: {
                src: './img/x16/player/runRight.png'
            }
        },
        inside: {
            idleUp: {
                src: './img/x32/player/idleUp.png'
            },
            idleDown: {
                src: './img/x32/player/idleDown.png'
            },
            idleLeft: {
                src: './img/x32/player/idleLeft.png'
            },
            idleRight: {
                src: './img/x32/player/idleRight.png'
            },
            runUp: {
                src: './img/x32/player/runUp.png'
            },
            runDown: {
                src: './img/x32/player/runDown.png'
            },
            runLeft: {
                src: './img/x32/player/runLeft.png'
            },
            runRight: {
                src: './img/x32/player/runRight.png'
            }
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

const carsLeft = []
const carsRight = []
function createSemiRandomCar({right}) {
    const index = getWeightedCarIndex()
    const car = carMap[index]
    const position = right ? {x: car.widthOffset, y: offset.y + car.heightOffset + roadRelativePosition.right} : {x: canvas.width, y: offset.y + car.heightOffset + roadRelativePosition.left}
    const newCar = new Car({
        position: position,
        src: './img/x16/cars/' + car.type + '/' + (right ? 'right' : 'left') + Math.floor(Math.random() * car.colors) + '.png',
        frames: 6,
        right: right,
        heightOffset: car.heightOffset
    })
    if (right) carsRight.push(newCar)
        else carsLeft.push(newCar)
}
function initCars() {
    createSemiRandomCar({right: true})
    createSemiRandomCar({right: false})
}
initCars()
function createRandomCar() {
    const right = Math.random() < 0.5 ? true : false;
    const index = getWeightedCarIndex()
    const car = carMap[index]
    const newCar = new Car({
        position: {
            x: offset.x + (right ? car.widthOffset : city.background.width),
            y: offset.y + car.heightOffset + (right ? roadRelativePosition.right : roadRelativePosition.left) 
        },
        src: './img/x16/cars/' + car.type + '/' + (right ? 'right' : 'left') + Math.floor(Math.random() * car.colors) + '.png',
        frames: 6,
        right: right,
        heightOffset: car.heightOffset
    })
    if (right) carsRight.push(newCar)
    else carsLeft.push(newCar)
}
let frameCount = 0
function updateCars() {
    if (frameCount++ > 200) {
        frameCount = 0
        createRandomCar()
    }
    for (let i = 0; i < carsRight.length; i++) {
        carsRight[i].updatePosition({direction: 1})
    }
    let car
    if (carsRight.length > 0) {
        car = carsRight[0]
        if (car.position.x > canvas.width) {
            carsRight.shift()
        }
    }
    for (let i = 0; i < carsLeft.length; i++) {
        carsLeft[i].updatePosition({direction: -1})
    }
    if (carsLeft.length > 0) {
        car = carsLeft[0]
        if (car.position.x + car.width < 0) {
            carsLeft.shift()
        }
    }
}

function tryInteractionNPC() {
    if (zone.npcs == undefined) return
    const buf = zone.inside ? 10 : 5
    zone.npcs.forEach(npc => {
        if (!npc.interacted &&
            player.hitbox.position.x + player.hitbox.width + buf >= npc.position.x && 
            player.hitbox.position.x - buf <= npc.position.x + npc.width &&
            player.hitbox.position.y + player.hitbox.height + buf >= npc.position.y &&
            player.hitbox.position.y - buf <= npc.position.y + npc.height) {
                npc.switchSprite()
                player.npc = npc
                player.goIdle()
                player.frozen = true
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
                    button.innerText = npc.userQuestions[index]
                    button.style.visibility = 'visible'
                })
                dialogueBox.translateTo({
                    x: Math.min(zone.background.width, canvas.width) / 2 - dialogueBox.width / 2,
                    y: Math.min(zone.background.height, canvas.height) - dialogueBox.height - 10
                })
                dialogueBox.shouldDraw = true
                dialogueBox.playDialogue(npc)
                // npc.portrait.buffer = 10
                npc.portrait.position.x = dialogueBox.position.x + 5
                npc.portrait.position.y = dialogueBox.position.y + 14
                npc.interacted = true
            }
    })
}

function moveUp() {
    player.switchSprite('runUp')
    player.direction = 'up'
    const speed = player.speed
    let collision = false
    if (zone.doors) {
        for (let i = 0; i < zone.doors.length; i++) {
            const door = zone.doors[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...door, position: {x: door.position.x, y: door.position.y + speed}}})) {
                player.frozen = true
                door.autoplay = true
                return
            }
        }
    }
    for (let i = 0; i < zone.collisionBlocks.length; i++) {
        const collisionBlock = zone.collisionBlocks[i]
        if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x, y: collisionBlock.position.y + speed}}})) {
            collision = true
            break
        }
    }
    if (!collision) {
        if (zone.inside) player.position.y -= speed
        else {
            offset.y += speed
            zone.movables.forEach(movable => {
                movable.position.y += speed
            })
            carsLeft.forEach(car => {
                car.position.y += player.speed
            })
            carsRight.forEach(car => {
                car.position.y += player.speed
            })
        }
        tryInteractionNPC()
    }
}
function moveLeft() {
    player.switchSprite('runLeft')
    player.direction = 'left'
    const speed = player.speed
    let collision = false
    for (let i = 0; i < zone.collisionBlocks.length; i++) {
        const collisionBlock = zone.collisionBlocks[i]
        if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x + speed, y: collisionBlock.position.y}}})) {
            collision = true
            break
        }
    }
    if (!collision) {
        if (zone.inside) player.position.x -= speed
        else {
            offset.x += speed
            zone.movables.forEach(movable => {
                movable.position.x += speed
            })
            carsLeft.forEach(car => {
                car.position.x += player.speed
            })
            carsRight.forEach(car => {
                car.position.x += player.speed
            })
        }
        tryInteractionNPC()
    }
}
function moveDown() {
    player.switchSprite('runDown')
    player.direction = 'down'
    const speed = player.speed
    if (zone.doors) {
        for (let i = 0; i < zone.doors.length; i++) {
            const door = zone.doors[i]
            if (rectCollision({rectangle1: player.hitbox, rectangle2: {...door, position: {x: door.position.x, y: door.position.y + speed}}}) && door.zoneTo == 'city') {
                player.frozen = true
                door.autoplay = true
                return
            }
        }
        tryInteractionNPC()
    }
    let collision = false
    for (let i = 0; i < zone.collisionBlocks.length; i++) {
        const collisionBlock = zone.collisionBlocks[i]
        if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x, y: collisionBlock.position.y - speed}}})) {
            collision = true
            break
        }
    }
    if (!collision) {
        if (zone.inside) player.position.y += speed
        else {
            offset.y -= speed
            zone.movables.forEach(movable => {
                movable.position.y -= speed
            })
            carsLeft.forEach(car => {
                car.position.y -= player.speed
            })
            carsRight.forEach(car => {
                car.position.y -= player.speed
            })
        }
    }
}
function moveRight() {
    player.switchSprite('runRight')
    player.direction = 'right'
    const speed = player.speed
    let collision = false
    for (let i = 0; i < zone.collisionBlocks.length; i++) {
        const collisionBlock = zone.collisionBlocks[i]
        if (rectCollision({rectangle1: player.hitbox, rectangle2: {...collisionBlock, position: {x: collisionBlock.position.x - speed, y: collisionBlock.position.y}}})) {
            collision = true
            break
        }
    }
    if (!collision) {
        if (zone.inside) player.position.x += speed
        else {
            offset.x -= speed
            zone.movables.forEach(movable => {
                movable.position.x -= speed
            })
            carsLeft.forEach(car => {
                car.position.x -= player.speed
            })
            carsRight.forEach(car => {
                car.position.x -= player.speed
            })
        }
        tryInteractionNPC()
    }
}

function showResponse(button, num) {
    button.style.visibility = 'hidden'
    activeButtons[num - 1] = false;
    player.npc.dialogueIndex = num
    player.npc.dialogueIndexIndex = 0
    questions.style.display = 'none'
    showingButtons = false
    dialogueBox.playDialogue(player.npc)
}

function handleInput() {
    if (player.frozen) {
        return
    }
    if (lastPressed === 'w' && keys.w.pressed) moveUp()
    else if (lastPressed === 'a' && keys.a.pressed) moveLeft()
    else if (lastPressed === 's' && keys.s.pressed) moveDown()
    else if (lastPressed === 'd' && keys.d.pressed) moveRight()
    else if (keys.w.pressed) moveUp()
    else if (keys.a.pressed) moveLeft()
    else if (keys.s.pressed) moveDown()
    else if (keys.d.pressed) moveRight()
    else player.goIdle()
    player.updateHitbox()
}

function drawUI() {
    if (dialogueBox.shouldDraw) {
        dialogueBox.draw()
        player.npc.portrait.draw()
        if (showingButtons) {
            player.npc.portrait.autoplay = false
            for (let i = 0; i < 3; i++) {
                if (activeButtons[i]) buttons[i].draw()
            }
        }
        else {
            player.npc.portrait.autoplay = true
        }
    }
}

const manager = new Manager({
    position: {
        x: 95,
        y: -50
    },
    src: './img/x16/brandon/idleDown.png',
    frames: 6,
    spriteBook: {
        runLeft: {
            src: './img/x16/brandon/runLeft.png'
        },
        runRight: {
            src: './img/x16/brandon/runRight.png'
        },
        runDown: {
            src: './img/x16/brandon/runDown.png'
        },
        runUp: {
            src: './img/x16/brandon/runUp.png'
        },
        idleDown: {
            src: './img/x16/brandon/idleDown.png'
        },
        idleRight: {
            src: './img/x16/brandon/idleRight.png'
        }
    },
    indicator: new Sprite({
        position: {
            x: 96,
            y: -70
        },
        src: './img/x16/indicator.png',
        frames: 6
    }),
    portrait: new Sprite({
        position: {x: 0, y: 0},
        src: './img/x32/brandonPortrait.png',
        frames: 10, 
        buffer: 10
    }),
    dialogue: [
        [
            [
                { speed: dialogueBox.speeds.normal, string: "Welcome, user!" },
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "My name is Brandon," },
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "and I've built this website to provide a fun and interactive way for you to discover some of the things that define myself." },
            ],
        ],
        [
            [
                { speed: dialogueBox.speeds.normal, string: "Navigating the website is simple!"},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "Any character with an exclamation mark above their head can be interacted with simply by walking up to them."}
            ],
            [
                { speed: dialogueBox.speeds.normal, string: "Buildings can be entered and their doors are interacted with in the same way,"},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "by simply walking up to them."},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "What great design!"},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "So intuitive!"}
            ],
            [
                { speed: dialogueBox.speeds.normal, string: "Streets are crossed using crosswalks, "},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "and buildings generally contain information related to them in some way."}
            ],
            [
                { speed: dialogueBox.speeds.normal, string: "Oh, "},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "and characters don't like to repeat themselves, "},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "so be attentive!"},

            ],
        ],
        [
            [
                { speed: dialogueBox.speeds.normal, string: "Of course!" },
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "This website is an interactive portfolio." },
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "It is intended to provide additional information about myself not found on my official resume." }
            ],
            [
                { speed: dialogueBox.speeds.normal, string: "The code is written in vanilla JavaScript utilizing the HTML Canvas element, "},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "and all artwork has been sourced from creator LimeZu on the website itch.io!"}
            ],
        ],
        [
            [
                { speed: dialogueBox.speeds.normal, string: "Anyways,"},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "I've got to get going,"},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "I'm likely up to something heroic like saving a cat from a tree."},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "I hope you enjoy your time here."},
                { speed: dialogueBox.speeds.pause, string: "", pause: true },
                { speed: dialogueBox.speeds.normal, string: "Goodbye!"}
            ],
        ]
    ],
    userQuestions: [
        "How do I access this information?",
        "Can you tell me more about this website?",
        "exit conversation"
    ],
    inside: false
})

function zoom() {
    // let relevantWidth
    // let relevantHeight
    // if (zone.inside) {
    //     relevantWidth = zone.background.width
    //     relevantHeight = zone.background.height
    // }
    // else {
    //     relevantWidth = canvas.width
    //     relevantHeight = canvas.height
    // }
    // const aspectRatio = relevantWidth / relevantHeight
    // const windowAspectRatio = window.innerWidth / window.innerHeight
    // let zoomPercent
    // if (windowAspectRatio > aspectRatio) {
    //     zoomPercent = window.innerHeight / relevantHeight
    // }
    // else {
    //     zoomPercent = window.innerWidth / relevantWidth
    // }
    const aspectRatio = canvas.width / canvas.height
    const windowAspectRatio = window.innerWidth / window.innerHeight
    const zoomPercent = windowAspectRatio > aspectRatio ? window.innerHeight / canvas.height : window.innerWidth / canvas.width
    document.body.style.zoom = zoomPercent
} 

zoom()

function animate() {
    window.requestAnimationFrame(animate)
    zone.display(player, manager)
    manager.tryMove(player)
    handleInput()
    updateCars()
    drawUI()
    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
}
animate()
