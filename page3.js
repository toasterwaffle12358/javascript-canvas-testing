var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let mouseX = WIDTH/2;
let mouseY = HEIGHT/2;

var MouseDownPos = 0;

canvas.requestPointerLock();

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    //mouseX = event.clientX - rect.left;
    //mouseY = event.clientY - rect.top;

    mouseX += event.movementX
    mouseY += event.movementY

    if (mouseX >= WIDTH-1) {
        mouseX = WIDTH-1
    }
    if (mouseY >= HEIGHT-10) {
        mouseY = HEIGHT-10
    }


}

function draw() {
    ctx.filter = "contrast(101%) hue-rotate(5deg) invert(1) saturate(120%)"
    let tempcanvas = canvas
    ctx.drawImage(tempcanvas, WIDTH/2-mouseX, HEIGHT/2-mouseY, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2, HEIGHT/2-mouseY, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2-mouseX, HEIGHT/2, mouseX, mouseY)
    ctx.drawImage(tempcanvas, WIDTH/2, HEIGHT/2, mouseX, mouseY)
    ctx.drawImage(tempcanvas, (WIDTH/2)-(mouseX/2), (HEIGHT/2)-(mouseY/2), mouseX, mouseY)

    //ctx.fillStyle = "rgb( 255 400 300 / 10%";
    //ctx.fillRect(0, 0, WIDTH, HEIGHT);
    requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});

canvas.addEventListener('mousedown', () => {
    ctx.fillStyle = "rgb( 255 250 255";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    //MouseDownPos = 1
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
    ctx.fillStyle = "rgb( 255 250 255";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}, { passive: false });


requestAnimationFrame(draw)