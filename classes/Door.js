class Door extends Sprite {
    constructor({position, src, frames, next, x, y}) {
        super({position, src, frames, autoplay: false, loop: false})
        this.next = next
        this.x = x
        this.y = y
        // this.play = false
    }

    handleAnimationCompletion() {
        map[this.next].transition(this.x, this.y)
    }

    // transition() {
    //     gsap.to(overlay, {
    //         opacity: 1,
    //         onComplete: () => {
    //             zone = map[this.next]
    //             canvas.width = zone.background.width
    //             canvas.height = zone.background.height
    //             // zone.doors.forEach(door => {
    //             //     door.autoplay = false
    //             //     door.frame = 0
    //             // })
    //             player.position.x = this.playerX
    //             player.position.y = this.playerY
    //             gsap.to(overlay, {
    //                 opacity: 0
    //             })
    //             player.frozen = false
    //             console.log('trans')
    //         }
    //     })
    // }
}