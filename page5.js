



ctx.fillStyle = "rgb( 0 0 0)";
//ctx.fillRect(WIDTH/2, HEIGHT/2, 100, 100);

let worldMap = [
    [true, true, true, true, true, true],
    [true, false, true, true, false, true],
    [true, false, true, false, false, true],
    [true, false, false, false, false, true],
    [true, false, false, false, false, true],
    [true, true, true, true, true, true],
]

let playerPosition = [1,1]
let pointpos = [0,1]

function getDistances() {

}
let distance = Math.sqrt(Math.pow(playerPosition[0]+ pointpos[1], 2)+Math.pow(playerPosition[1], 2))
let angle = Math.atan((playerPosition[1])/(playerPosition[0]+pointpos[1]))
let screenXPos = ((Math.PI-angle)/(Math.PI))*WIDTH

if (screenXPos > 0 && screenXPos < WIDTH) {
    ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), 2, HEIGHT/distance);
}

console.log("distance:")
console.log(distance)
console.log("angle:")
console.log(angle)
console.log("screen x pos:")
console.log(screenXPos)



for (let i = 0; i < WIDTH; i++) {
    //ctx.fillRect(i, (HEIGHT/2)-(Math.sin(i/50)*50), 1, Math.sin(i/50)*100);
}