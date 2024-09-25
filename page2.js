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

const userAgent = navigator.userAgent || navigator.vendor || window.opera;


//drawing the clear screen instructions image for desktop users

if (/android|iPhone|iPad|iPod|opera mini|IEMobile|WPDesktop/i.test(userAgent)) {
    console.log("user is on mobile")
    document.getElementById("reset_button").style.display = "block"
} else {
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
}


//creating a variable for the current mouse position, but also a list with the last 50 mouse positions
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
    } else {
        mousePosListX = []
        mousePosListY = []
    }
    requestAnimationFrame(draw)
}


//runs whenever the desktop mouse is moved
canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});


//runs whenever the desktop mouse is clicked down
//clears previous mouse positions so that they arent connected to the new stroke
canvas.addEventListener('mousedown', () => {
    mousePosListX = []
    mousePosListY = []
    MouseDownPos = 1
})

canvas.addEventListener('mouseup', () => {
    MouseDownPos = 0
})

//clears screen when "c" key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        clearScreen()
    }
});

//screen clearnign function
function clearScreen() {
    ctx.fillStyle = "rgb(255 255 255)"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
}


//mobile stuff
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
    mousePosListX = []
    mousePosListY = []
});






requestAnimationFrame(draw)