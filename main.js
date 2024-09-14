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
    ctx.fillRect(mouseX, mouseY, 70, 70);
    if (highContrast == false) {
        ctx.filter = "blur(20px)"
    } else {
        ctx.filter = "blur(20px) contrast(100000%)"
    }
    ctx.drawImage(canvas, -WIDTH*0.003, -HEIGHT*0.003, WIDTH*1.006, HEIGHT*1.006)
    ctx.filter = "none"

    console.log("function ran")
    ctx.fillStyle = "rgb( 0 0 0 / 1%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    console.log("drawn")

}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
    hue = hue +5
    hue = hue%360

    /*
    ctx.fillStyle = "rgb( 0 0 0 / 2%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(canvas, -WIDTH*0.003, -HEIGHT*0.003, WIDTH*1.006, HEIGHT*1.006)
    draw();
    console.log("drawn")
    */
});

setInterval(draw, 10);


canvas.addEventListener('mousedown', () => {
    //ctx.fillStyle = "black";
    //ctx.fillRect(0, 0, WIDTH, HEIGHT);
    highContrast = !highContrast
})

draw()