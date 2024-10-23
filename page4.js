var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let velocityX = 10
let velocityY = 0
let ballX = WIDTH/2
let ballY = HEIGHT/2
let gravity = 1


ctx.fillStyle = "rgb(0 0 0%)"
ctx.fillRect(0, 0, WIDTH, HEIGHT)

function draw() {
    ctx.fillStyle = "rgb(0 0 0 /10%)"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = "rgb(100 100 100)"
    ctx.fillRect(0, HEIGHT-100, WIDTH, 100)
    ctx.fillRect(WIDTH/4, HEIGHT-300, WIDTH/2, 50)

    ctx.fillStyle = "rgb(100 200 100)"
    ctx.fillRect(ballX-5, ballY-5, 10, 10)
    velocityY += gravity
    ballX += velocityX
    ballY += velocityY
    
    if (ballY >= HEIGHT-305 && ballY <= HEIGHT-255) {
        if (ballX <= (WIDTH*3/4)+5) {
            ballY = HEIGHT-305
            velocityY = -velocityY*1
            velocityX = velocityX*0.995
        }
    }
    
    if (ballY >= HEIGHT-105) {
        ballY = HEIGHT-105
        velocityY = -velocityY*1
        velocityX = velocityX*0.995
    }
    if (ballX > WIDTH-5 || ballX <= 0 ) {
        velocityX = -velocityX
    }

    requestAnimationFrame(draw)
}


requestAnimationFrame(draw)