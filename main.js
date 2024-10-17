var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let mouseX = 0;
let mouseY = 0;

let hue = 0

ctx.fillStyle = "black";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

let highContrast = false

const userAgent = navigator.userAgent || navigator.vendor || window.opera;

let color_change_slider = document.getElementById('color_change_slider')

if (/android|iPhone|iPad|iPod|opera mini|IEMobile|WPDesktop/i.test(userAgent)) {
    console.log("user is on mobile")
    document.getElementById("change_mode_button").style.display = "block"
}



function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

function draw() {

    /*
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `hsl(${i*10} 50% ${i}%)`;
        ctx.fillRect(i*((mouseX-(WIDTH/2))/50)+(WIDTH/2)-(i/2), i*((mouseY-(HEIGHT/2))/50)+(HEIGHT/2)-(i/2), i, i);
    }
    */
    
    
    ctx.fillStyle = `hsl(${hue} 100% 80%)`
    ctx.fillRect(mouseX-35, mouseY-35, 70, 70);
    ctx.fillStyle = "rgb( 0 0 0";
    ctx.fillRect(WIDTH/2, HEIGHT/2, 1, 1);
    if (highContrast == false) {
        ctx.filter = "blur(20px)"
    } else {
        ctx.filter = "blur(20px) contrast(3000%)"
    }
    let tempcanvas = canvas
    ctx.drawImage(canvas, -WIDTH*0.003, -HEIGHT*0.003, WIDTH*1.006, HEIGHT*1.006)
    //ctx.drawImage(canvas, 0, 0, WIDTH, HEIGHT)
    ctx.filter = "blur(10px) brightness(100%) opacity(75%)"
    ctx.drawImage(tempcanvas, -WIDTH*0.003, -HEIGHT*0.003, WIDTH*1.006, HEIGHT*1.006)
    ctx.filter = "none"

    ctx.fillStyle = "rgb( 0 0 0 / 1%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    requestAnimationFrame(draw)

}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
    hue = hue + color_change_slider.value/1
    hue = hue%360
    console.log(color_change_slider.value)
});

//setInterval(draw, 10);



canvas.addEventListener('mousedown', () => {
    //ctx.fillStyle = "black";
    //ctx.fillRect(0, 0, WIDTH, HEIGHT);
    highContrast = !highContrast
})

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent scrolling
});
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling
    const touch = event.touches[0];
    updateMousePosition(touch);
    hue = hue +5
    hue = hue%360
});

function changeMode() {
    highContrast = !highContrast
}


requestAnimationFrame(draw)