const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

const hitboxes = []
const structures = []

let background
let playerImg
let player

const playerState = {
    up: './player/player up.png',
    down: './player/player down.png',
    left: './player/player left.png',
    right: './player/player right.png'
}

const keysPressed = {
    'w': false,
    'a': false,
    's': false,
    'd': false
}