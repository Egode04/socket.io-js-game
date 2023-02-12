const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

canvas.height = 768
canvas.width = canvas.height

const hitboxes = []
const structures = []

let background