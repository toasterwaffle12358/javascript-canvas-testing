ctx.fillStyle = "rgb( 0 0 0)";
//ctx.fillRect(WIDTH/2, HEIGHT/2, 100, 100);


let playerPosition = [6,5]
let pointPosList = [[0,0,1],
[0,0.2,0],[0,0.4,0],[0,0.6,0],[0,0.8,0],[0,1,0],[0,1.2,0],[0,1.4,0],[0,1.6,0],[0,1.8,0],
[0,2,1],[2,2,1],[2,0,1],[1.8,0,0],[1.6,0,0],[1.4,0,0],[1.2,0,0],[1,0,0],[0.8,0,0],[0.6,0,0],[0.4,0,0],[0.2,0,0],[0,0,0],
[0,-2],[2,-2],[2,0],[4,0],[4,2],[2,2],[2,4],[0,4],[0,2],[-2,2],[-2,0],[0,0]
]

//pointPosList = [[1,1,1]]


let distance = 0
let angle = 0
let screenXPos = 0
let playerViewAngle = 0
let playerViewAngleRads = 0
let pastDistance = 0
let pastScreenXPos = 0
let mouseX = 0

function updateMousePosition(event) {
    mouseX += event.movementX
    playerViewAngle = (mouseX/100)%(360)
    playerViewAngleRads = (playerViewAngle/360)*2*Math.PI
    console.log("player view angle:")
    console.log(playerViewAngle)
}


function connectSides(screenXPos, pastScreenXPos, distance, pastDistance) {
    ctx.strokeStyle = "rgb( 50 100 200)"
    ctx.beginPath()
    ctx.moveTo(pastScreenXPos, (HEIGHT/2)+((HEIGHT/pastDistance)/2));
    ctx.lineTo(screenXPos, (HEIGHT/2)+((HEIGHT/distance)/2))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pastScreenXPos, (HEIGHT/2)-((HEIGHT/pastDistance)/2));
    ctx.lineTo(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2))
    ctx.stroke()
}

function drawSides() {
    for (i in pointPosList) {
        pastDistance = distance
        pastScreenXPos = screenXPos
        distance = Math.sqrt(Math.pow(playerPosition[0] - pointPosList[i][0], 2)+Math.pow(playerPosition[1] - pointPosList[i][1], 2))
        //angle = Math.atan((playerPosition[1]- pointPosList[i][1])/(playerPosition[0]-pointPosList[i][0]))
        angle = (Math.atan2((playerPosition[1]- pointPosList[i][1]),(playerPosition[0]-pointPosList[i][0]))* 180) / Math.PI
        
        angle = angle + playerViewAngle
        console.log("angle:")
        console.log(angle)
        


        if (angle >= 0 && angle <= 180) {
            screenXPos = ((180-angle)/(180))*WIDTH
            //screenXPos = ((Math.cos(angle)*(WIDTH/2))+(WIDTH/2))
        } else {
            if (angle >= -Math.PI) {

            }
            //screenXPos = ((-angle)/(180))*WIDTH
            //screenXPos = ((WIDTH/2)-(Math.cos(angle)*(WIDTH/2)))
        }

        if (screenXPos > 0 && screenXPos < WIDTH && pointPosList[i][2] == 1) {
            ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), 2, HEIGHT/distance);
        }
        connectSides(screenXPos, pastScreenXPos, distance, pastDistance)

        
    }
}
//getDistances()
function drawMap() {
    ctx.fillStyle = "rgb( 50 50 50)"
    ctx.fillRect(0, HEIGHT-200, 200, 200);
    ctx.fillStyle = "rgb( 255 255 255)"
    ctx.fillRect(100-playerPosition[0]*10, (HEIGHT-200)+(playerPosition[1]*10), 5, 5);
    for (i in pointPosList) {
        ctx.fillRect(100-pointPosList[i][0]*10, (HEIGHT-200)+(pointPosList[i][1]*10), 2, 2);
    }
    ctx.strokeStyle = "rgb( 0 255 0)"
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-200)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads)*100), (HEIGHT-200)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads)*100))
    ctx.stroke()
    ctx.strokeStyle = "rgb( 255 0 0)"
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-200)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads+Math.PI/2)*100), (HEIGHT-200)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads+Math.PI/2)*100))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-200)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads-Math.PI/2)*100), (HEIGHT-200)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads-Math.PI/2)*100))
    ctx.stroke()
}


function draw() {
    ctx.fillStyle = "rgb( 0 0 0)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "rgb( 200 0 200)";
    drawSides()
    requestAnimationFrame(draw)
    drawMap()
}


console.log("distance:")
console.log(distance)
console.log("angle:")
console.log(angle)
console.log("screen x pos:")
console.log(screenXPos)
console.log("player view angle:")
console.log(playerViewAngle)



document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Escape' :
            if (isMouseCaptured) {
                document.exitPointerLock(); // Exit pointer lock
            }
            break
        case 'ArrowDown' :
            playerPosition[0] += Math.sin(playerViewAngleRads)*0.1
            playerPosition[1] += Math.cos(playerViewAngleRads)*0.1
            break
        case 's' :
            playerPosition[0] += Math.sin(playerViewAngleRads)*0.1
            playerPosition[1] += Math.cos(playerViewAngleRads)*0.1
            break
        case 'ArrowUp' :
            playerPosition[0] += -Math.sin(playerViewAngleRads)*0.1
            playerPosition[1] += -Math.cos(playerViewAngleRads)*0.1
            break
        case 'w' :
            playerPosition[0] += -Math.sin(playerViewAngleRads)*0.1
            playerPosition[1] += -Math.cos(playerViewAngleRads)*0.1
            break
        case 'ArrowLeft' :
            playerPosition[0] += Math.cos(playerViewAngleRads)*0.1
            playerPosition[1] += -Math.sin(playerViewAngleRads)*0.1
            break
        case 'a' :
            playerPosition[0] += Math.cos(playerViewAngleRads)*0.1
            playerPosition[1] += -Math.sin(playerViewAngleRads)*0.1
            break
        case 'ArrowRight' :
            playerPosition[0] += -Math.cos(playerViewAngleRads)*0.1
            playerPosition[1] += Math.sin(playerViewAngleRads)*0.1
            break
        case 'd' :
            playerPosition[0] += -Math.cos(playerViewAngleRads)*0.1
            playerPosition[1] += Math.sin(playerViewAngleRads)*0.1
            break
    }
});

canvas.addEventListener('mousemove', (event) => {
    updateMousePosition(event);
});

canvas.addEventListener('click', function() {
    canvas.requestPointerLock();
});

requestAnimationFrame(draw)