var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let mouseX = 0;
let mouseY = 0;

var MouseDownPos = 0;

let mousePosListX = []
let mousePosListY = []

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    if (MouseDownPos == 1) {
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        mousePosListX.push(mouseX)
        mousePosListY.push(mouseY)
    }

    if ( mousePosListX.length >= 10) {
        mousePosListX.shift()
        mousePosListY.shift()
    }

}

function draw() {
    ctx.filter = "contrast(5000%) hue-rotate(19deg)"
    ctx.drawImage(canvas, 0, 0, WIDTH/2, HEIGHT/2)
    ctx.drawImage(canvas, WIDTH/2, 0, WIDTH/2, HEIGHT/2)
    ctx.drawImage(canvas, 0, HEIGHT/2, WIDTH/2, HEIGHT/2)
    ctx.drawImage(canvas, WIDTH/2, HEIGHT/2, WIDTH/2, HEIGHT/2)
    ctx.drawstyle

    ctx.lineWidth = 50;
    ctx.beginPath()
    ctx.moveTo(mousePosListX[0], mousePosListY[0]);
    for (i in mousePosListX) {
        ctx.lineTo(mousePosListX[i-1], mousePosListY[i-1])
        ctx.stroke()
    }


    ctx.fillStyle = "rgb( 255 400 300 / 0.2%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    requestAnimationFrame(draw)
    if (MouseDownPos == 0) {
    }
}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});

canvas.addEventListener('mousedown', () => {
    ctx.fillStyle = "rgb( 255 255 255";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    MouseDownPos = 1
})

canvas.addEventListener('mouseup', () => {
    MouseDownPos = 0
})


requestAnimationFrame(draw)