const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

const hitboxes = []
const structures = []
const playerImages = []
const text = []

let players = []
let bowls = []
let ramen = []

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
    up: false,
    left: false,
    down: false,
    right: false
}

const playerImage = new Image()
playerImage.src = playerState.down

const bowlImage = new Image()
bowlImage.src = './food/bowl.png'

const ramenImage = new Image()
ramenImage.src = './food/ramen.png'