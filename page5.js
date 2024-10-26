ctx.fillStyle = "rgb( 0 0 0)";
//ctx.fillRect(WIDTH/2, HEIGHT/2, 100, 100);


let playerPosition = [6,5]
let pointPosList = [[0,0],[0,2],[2,0],[2,2]]


let distance = 0
let angle = 0
let screenXPos = 0


function getDistances() {
    for (i in pointPosList) {
        distance = Math.sqrt(Math.pow(playerPosition[0] - pointPosList[i][0], 2)+Math.pow(playerPosition[1] - pointPosList[i][1], 2))
        angle = Math.atan((playerPosition[1]- pointPosList[i][1])/(playerPosition[0]-pointPosList[i][0]))
        if (angle >= 0) {
            screenXPos = ((Math.PI-angle)/(Math.PI))*WIDTH
        } else {
            screenXPos = ((-angle)/(Math.PI))*WIDTH
        }

        if (screenXPos > 0 && screenXPos < WIDTH) {
            ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), 2, HEIGHT/distance);
        }
        
    }
}
//getDistances()


function draw() {
    ctx.fillStyle = "rgb( 0 0 0)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "rgb( 200 200 200)";
    getDistances()
    requestAnimationFrame(draw)
}


/*
if (screenXPos > 0 && screenXPos < WIDTH) {
    ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), 2, HEIGHT/distance);
}
*/


console.log("distance:")
console.log(distance)
console.log("angle:")
console.log(angle)
console.log("screen x pos:")
console.log(screenXPos)

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Escape' :
            if (isMouseCaptured) {
                document.exitPointerLock(); // Exit pointer lock
            }
            break
        case 'ArrowDown' :
            playerPosition[1] += -0.1
            break
        case 'ArrowUp' :
            playerPosition[1] += 0.1
            break
        case 'ArrowLeft' :
            playerPosition[0] += -0.1
            break
        case 'ArrowRight' :
            playerPosition[0] += 0.1
            break
    }
});

requestAnimationFrame(draw)