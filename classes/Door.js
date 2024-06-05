class Door extends Sprite {
    constructor({position, src, frames, zoneTo, relativePosition, playerPosition, scenePosition}) {
        super({position, src, frames, autoplay: false, loop: false})
        this.zoneTo = zoneTo
        this.relativePosition = relativePosition
        this.playerPosition = playerPosition
        this.scenePosition = scenePosition
        // this.play = false
    }

    handleAnimationCompletion() {
        map[this.zoneTo].transition({
            playerPosition: this.playerPosition,
            scenePosition: this.scenePosition
        })
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