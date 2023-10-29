class Port {
    constructor({position, width = 32, height = 32, nextZone, animation}) {
        this.position = position
        this.width = width
        this.height = height
        this.nextZone = nextZone
        this.animation = animation
    }

    transition() {
        gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
                zone = map[this.nextZone]
                // zone.doors.forEach(door => {
                //     door.autoplay = false
                //     door.frame = 0
                // })
                player.position.x = 100
                player.position.y = 100
                gsap.to(overlay, {
                    opacity: 0
                })
                player.frozen = false
            }
        })
    }
}