
let mouseX = 0;
let mouseY = 0;
let mousePosListX = []
let mousePosListY = []
//let pastPosListsX = [[0]]
//let pastPosListsY = [[0]]

let pastPosListsX = startingPastPosListX
let pastPosListsY = startingPastPosListY


var MouseDownPos = 0;

const userAgent = navigator.userAgent || navigator.vendor || window.opera;
let userIsMobile = false
let hasCleared = false

let webbyness_slider = document.getElementById('webbyness_slider')


//drawing the clear screen instructions image for desktop users

if (/android|iPhone|iPad|iPod|opera mini|IEMobile|WPDesktop/i.test(userAgent)) {
    document.getElementById("reset_button").style.display = "block"
    document.getElementById("undo_button").style.display = "block"
    userIsMobile = true
}

//creating a variable for the current mouse position, but also a list with the last 50 mouse positions
function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    mousePosListX.push(mouseX)
    mousePosListY.push(mouseY)

    /*
    if ( mousePosListX.length >= 50) {
        mousePosListX.shift()
        mousePosListY.shift()
    }
    */

}
if (WIDTH > HEIGHT) {
    for (i in pastPosListsX) {
        for (j in pastPosListsX[i]) {
            pastPosListsX[i][j] = ((pastPosListsX[i][j]/1920)*WIDTH)
            pastPosListsY[i][j] = ((pastPosListsY[i][j]/1080)*HEIGHT)
        }
    }
} else {
    for (i in pastPosListsX) {
        for (j in pastPosListsX[i]) {
            pastPosListsX[i][j] = ((pastPosListsX[i][j]/1920)*WIDTH)
            pastPosListsY[i][j] = ((pastPosListsY[i][j]/1080)*WIDTH)
        }
    }
}



function draw() {
    ctx.fillStyle = "rgb(255 255 255)"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    /*
    if (userIsMobile == false && hasCleared == false) {
        const img = new Image();
        img.src = "resources/page2_instructions.png";
        const maxWidth = WIDTH * 0.5;
        const aspectRatio = img.width / img.height;
        
        let drawWidth, drawHeight;

        drawWidth = Math.min(maxWidth, img.width);
        drawHeight = drawWidth / aspectRatio;

        ctx.drawImage(img, ((WIDTH - drawWidth)/2), ((HEIGHT - drawHeight)/2), drawWidth, drawHeight);
    };
    */

    for (strokeX in pastPosListsX) {
        for (point in pastPosListsX[strokeX]) {
            for (let i = 0; i <= webbyness_slider.value; i++ ) {
                ctx.beginPath()
                ctx.moveTo(pastPosListsX[strokeX][point-i], pastPosListsY[strokeX][point-i]);
                ctx.lineTo(pastPosListsX[strokeX][point-1], pastPosListsY[strokeX][point-1])
                ctx.stroke()
                
            }
        }
    }
    for (j in mousePosListX) {
        for (let k = 0; k <= webbyness_slider.value; k++ ) {
            ctx.beginPath()
            ctx.moveTo(mousePosListX[j-k], mousePosListY[j-k]);
            ctx.lineTo(mousePosListX[j-1], mousePosListY[j-1])
            ctx.stroke()
        }
    }
    if (MouseDownPos == 0) {
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
    pastPosListsX.push(mousePosListX)
    pastPosListsY.push(mousePosListY)

    mousePosListX = []
    mousePosListY = []
    //console.log(pastPosListsX.length)
})

//clears screen when "c" key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        clearScreen()
    }
    if (event.key === 'b') {
        undoStroke()
    }
});

//screen clearnign function
function clearScreen() {
    ctx.fillStyle = "rgb(255 255 255)"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    mousePosListX = []
    mousePosListY = []
    pastPosListsX = [[0]]
    pastPosListsY = [[0]]
    hasCleared = true
}
function undoStroke() {
    mousePosListX = []
    mousePosListY = []
    pastPosListsX.pop()
    pastPosListsY.pop()
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
    pastPosListsX.push(mousePosListX)
    pastPosListsY.push(mousePosListY)
    mousePosListX = []
    mousePosListY = []
});

//mobile stuff
document.addEventListener('touchmove', (event) => {
}, { passive: false });
document.addEventListener('gesturestart', (event) => {
}, { passive: false });
document.addEventListener('touchstart', (event) => {
}, { passive: false });






requestAnimationFrame(draw)