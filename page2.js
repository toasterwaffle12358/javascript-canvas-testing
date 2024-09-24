var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let mouseX = 0;
let mouseY = 0;
let oldMouseX = 0;
let oldMouseY = 0;
let oldMouseX1 = 0;
let oldMouseY1 = 0;
let mousePosListX = []
let mousePosListY = []

var MouseDownPos = 0;

const img = new Image();
img.src = "resources/page2_instructions.png";


img.onload = () => {
    const maxWidth = WIDTH * 0.5;
    const aspectRatio = img.width / img.height;
    
    let drawWidth, drawHeight;

    drawWidth = Math.min(maxWidth, img.width);
    drawHeight = drawWidth / aspectRatio;

    ctx.drawImage(img, ((WIDTH - drawWidth)/2), ((HEIGHT - drawHeight)/2), drawWidth, drawHeight);
};

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    mousePosListX.push(mouseX)
    mousePosListY.push(mouseY)

    if ( mousePosListX.length >= 50) {
        mousePosListX.shift()
        mousePosListY.shift()
    }

}

function draw() {

    if (MouseDownPos == 1) {
        for (i in mousePosListX) {
            for (let j = 0; j <= 5; j++ ) {
                ctx.beginPath()
                ctx.moveTo(mousePosListX[i-j], mousePosListY[i-j]);
                ctx.lineTo(mousePosListX[i-1], mousePosListY[i-1])
                ctx.stroke()
            }
        }
    }
    requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});

canvas.addEventListener('mousedown', () => {
    mousePosListX = []
    mousePosListY = []
    MouseDownPos = 1
})
canvas.addEventListener('mouseup', () => {
    MouseDownPos = 0
})
document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        ctx.fillStyle = "rgb(255 255 255)"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }
});

canvas.addEventListener('touchstart', (event) => {
    mousePosListX = []
    mousePosListY = []
    event.preventDefault(); // Prevent scrolling
    MouseDownPos = 1
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling
    const touch = event.touches[0];
    updateMousePosition(touch);
});
canvas.addEventListener('touchend', () => {
    MouseDownPos = 0
});





requestAnimationFrame(draw)