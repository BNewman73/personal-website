const offset = {
    x: -825,
    y: -550
}

const defaultPos = {
    x: 0,
    y: 0
}

const questions = document.getElementById('buttons')

const roadRelativePosition = {
    left: 55 * 16,
    right: 57 * 16 + 8
}

const carMap = [
    {
        type: 'long',
        colors: 7,
        widthOffset: -96,
        heightOffset: 0,
        weight: 3
    },
    {
        type: 'short',
        colors: 6,
        widthOffset: -80,
        heightOffset: 0,
        weight: 3
    },
    {
        type: 'bus',
        colors: 6,
        widthOffset: -144,
        heightOffset: -25,
        weight: 2
    }
]

const totalWeight = carMap.reduce((acc, car) => acc + car.weight, 0)