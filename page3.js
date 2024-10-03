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
canvas.requestPointerLock();

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    if (MouseDownPos == 1) {
        mousePosListX.push(mouseX)
        mousePosListY.push(mouseY)
    }

    if ( mousePosListX.length >= 100) {
        mousePosListX.shift()
        mousePosListY.shift()
    }


}

function draw() {
    ctx.filter = "contrast(100%) hue-rotate(19deg) invert(1)"
    ctx.lineWidth = 50;
    ctx.beginPath()
    ctx.moveTo(mousePosListX[0], mousePosListY[0]);
    for (i in mousePosListX) {
        ctx.lineTo(mousePosListX[i-1], mousePosListY[i-1])
        ctx.stroke()
    }
    let tempcanvas = canvas
    ctx.drawImage(tempcanvas, WIDTH/2-mouseX, HEIGHT/2-mouseY, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2, HEIGHT/2-mouseY, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2-mouseX, HEIGHT/2, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2, HEIGHT/2, mouseX, mouseY)

    ctx.fillStyle = "rgb( 255 400 300 / 10%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    requestAnimationFrame(draw)
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

document.addEventListener('keydown', (event) => {
    if (isMouseCaptured && event.key === 'Escape') {
        document.exitPointerLock(); // Exit pointer lock
    }
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling
    const touch = event.touches[0];
    updateMousePosition(touch);
    MouseDownPos = 0
});

document.addEventListener('touchmove', (event) => {
}, { passive: false });
document.addEventListener('gesturestart', (event) => {
}, { passive: false });
document.addEventListener('touchstart', (event) => {
}, { passive: false });


requestAnimationFrame(draw)