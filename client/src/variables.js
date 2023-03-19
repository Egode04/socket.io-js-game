const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

const para = {
    login: document.querySelector('p1'),
    signup: document.querySelector('p2'),
}
const warning = {
    login: document.querySelector('w1'),
    signup: document.querySelector('w2')
}

const scoreboard = {
    wrapper: document.querySelector('scoreboard'),
    leaderboard: document.querySelector('#scoreboard'),
    // button: document.querySelector('toggle')
}

const hitboxes = []
const structures = []
const playerImages = []
const health = []
const names = []
const tags = []

let players = []
let bowls = []
let ramen = []

let background
let playerImg
let player
let user
let gamestarted = false

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