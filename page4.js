var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let velocityX = 10
let velocityY = 10
let ballX = WIDTH/2
let ballY = HEIGHT/2
let pastBallX = WIDTH/2
let pastBallY = HEIGHT/2
let accelerationY = 1
let accelerationX = 0

let mouseX = 0
let mouseY = 0 

let ballsList = [[WIDTH/2,HEIGHT/2,10,10]]


hue = 1

ctx.fillStyle = "rgb(0 0 0%)"
ctx.fillRect(0, 0, WIDTH, HEIGHT)

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.movementX
    mouseY = event.movementY
    //velocityX = mouseX
    //velocityY = mouseY
}



function draw() {
    ctx.fillStyle = "rgb(0 0 0 /1%)"
    //ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = "rgb(100 100 100)"
    ctx.fillRect(0, HEIGHT-100, WIDTH, 100)
    //ctx.fillRect(WIDTH/4, HEIGHT-300, WIDTH/2, 50)

    pastBallX = ballX
    pastBallY = ballY
    
    velocityY += accelerationY
    velocityX += accelerationX
    velocityX = velocityX*0.999
    velocityY = velocityY*0.999
    ballX += velocityX
    ballY += velocityY

    ctx.strokeStyle = `hsl(${hue} 100% 50%)`
    hue += 1
    hue = hue % 360

    ctx.lineWidth = 15;
    ctx.beginPath()
    ctx.moveTo(pastBallX, pastBallY);
    ctx.lineTo(ballX, ballY)
    ctx.stroke()
    
    /*
    if (ballY >= HEIGHT-305 && ballY <= HEIGHT-255) {
        if (ballX <= (WIDTH*3/4)+5) {
            ballY = HEIGHT-305
            velocityY = -velocityY*1
            velocityX = velocityX*0.995
        }
    }
    */
    
    if (ballY >= HEIGHT-105) {
        ballY = HEIGHT-105
        velocityY = -velocityY*0.95
        velocityX = velocityX*0.99
    }
    if (ballX > WIDTH-5) {
        velocityX = -velocityX
        ballX = WIDTH-5
    }
    if (ballX <= 0 ) {
        velocityX = -velocityX
        ballX = 5
    }
    if (ballY < 0) {
        velocityY = -velocityY
        ballY = 5
    }

    requestAnimationFrame(draw)
}


canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});
canvas.addEventListener('mousedown', (event) => {
    ballsList.push([mouseX,mouseY,10,10])
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Escape' :
            if (isMouseCaptured) {
                document.exitPointerLock(); // Exit pointer lock
            }
            break
        case 'ArrowDown' :
            accelerationY = 0.5
            accelerationX = 0
            break
        case 'ArrowUp' :
            accelerationY = -0.5
            accelerationX = 0 
            break
        case 'ArrowLeft' :
            accelerationY = 0
            accelerationX = -0.5 
            break
        case 'ArrowRight' :
            accelerationY = 0
            accelerationX = 0.5
            break
    }
});

requestAnimationFrame(draw)