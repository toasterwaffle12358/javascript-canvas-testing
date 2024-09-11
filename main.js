var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
    
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let colorslist = ["red", "orange", "yellow", "green", "blue", "purple"]

let mouseX = 0;
let mouseY = 0;


ctx.fillStyle = "black";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

function draw() {

    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `hsl(${i*10} 50% ${i}%)`;
        ctx.fillRect(i*((mouseX-(WIDTH/2))/50)+(WIDTH/2)-(i/2), i*((mouseY-(HEIGHT/2))/50)+(HEIGHT/2)-(i/2), i, i);
    }
    console.log("function ran")
}

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
    ctx.fillStyle = "rgb( 0 0 0 / 2%";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    draw();
    console.log("drawn")
});
canvas.addEventListener('mousedown', () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
})

draw()