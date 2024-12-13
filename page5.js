ctx.fillStyle = "rgb( 0 0 0)";

let playerPosition = [6,4]

let pointPosList = []
let spritesPosList = []


let distance = 0
let angle = 0
let screenXPos = 0
let playerViewAngle = 0
let playerViewAngleRads = 0
let pastDistance = 0
let pastScreenXPos = 0
let mouseX = 0

const currentUrl = new URL(window.location.href);
//currentUrl.searchParams.set('map', 1);
history.replaceState(null, '', currentUrl.toString());

let map = currentUrl.searchParams.get('map')

let gradient = ctx.createLinearGradient(WIDTH/2, 0, WIDTH/2, HEIGHT);
gradient.addColorStop(0, "#1c0626");
gradient.addColorStop(0.5, "black");
gradient.addColorStop(1, "#1c0626");

var milly_img = new Image();
milly_img.src = "./resources/millycat.jpg"; 
var jinx_img = new Image();
jinx_img.src = "./resources/jinx.png"; 
var i_know_img = new Image();
i_know_img.src = "./resources/i-know-what-you-are.gif"; 
var spritesList = [milly_img, jinx_img, i_know_img]

let lineAlphaSlider = document.getElementById('alpha_slider')
let fovSlider = document.getElementById('fov_slider')
let minimapAlphaSlider = document.getElementById('minimap_alpha_slider')
let settingsButton = document.getElementById('settings_button')
let sensitivitySlider = document.getElementById('sensitivity_slider')
let viewAngleSlider = document.getElementById('view_angle_override_slider')
let lineWidthSlider = document.getElementById('line_width_slider')
let map1Button = document.getElementById('map1')
let map2Button = document.getElementById('map2')
let map3Button = document.getElementById('map3')
createMesh()

function updateMousePosition(event) {
    mouseX += event.movementX
    playerViewAngle = (mouseX/(101-sensitivitySlider.value))%(360)
    playerViewAngleRads = (playerViewAngle/360)*2*Math.PI
    //console.log("player view angle:")
    //console.log(playerViewAngle)
}


function connectSides(screenXPos, pastScreenXPos, distance, pastDistance) {
    if (( screenXPos >= 0 && screenXPos <= WIDTH) || (pastScreenXPos >=0 && pastScreenXPos <= WIDTH)) {
        ctx.strokeStyle = `rgb( 50 100 200 /${lineAlphaSlider.value}%)`
        ctx.beginPath()
        ctx.moveTo(pastScreenXPos, (HEIGHT/2)+((HEIGHT/pastDistance)/2));
        ctx.lineTo(screenXPos, (HEIGHT/2)+((HEIGHT/distance)/2))
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(pastScreenXPos, (HEIGHT/2)-((HEIGHT/pastDistance)/2));
        ctx.lineTo(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2))
        ctx.stroke()
    }
}

function createMesh() {
    //bottom interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-2+i/50, 5, 1])
    }
    //top
    for (let i = 0; i < 200; i++) {
        pointPosList.push([-3+i/50, 2, 1])
    }
    //top of bottom
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-2+i/50, 6, 1])
    }
    //top interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-2+i/50, 3, 1])
    }
    //left leg interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([0, 6+i/50, 1])
    }
    //left interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([0, 3+i/50, 1])
    }
    //left side
    for (let i = 0; i < 300; i++) {
        pointPosList.push([1, 2+i/50, 1])
    }
    //right side
    for (let i = 0; i < 300; i++) {
        pointPosList.push([-3, 2+i/50, 1])
    }
    //right interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-2, 3+i/50, 1])
    }
    //right leg interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-2, 6+i/50, 1])
    }

    //left exterior
    for (let i = 0; i < 300; i++) {
        pointPosList.push([-5-(i/250), 2+i/50, 1])
    }
    //left interior
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-6-(i/250), 2+i/50, 1])
    }
    //right exterior
    for (let i = 0; i < 300; i++) {
        pointPosList.push([-7.5+(i/250), 2+i/50, 1])
    }
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-7+(i/250), 2+i/50, 1])
    }

    for (let i = 0; i < 300; i++) {
        pointPosList.push([-9, 2+i/50, 1])
    }
    for (let i = 0; i < 300; i++) {
        pointPosList.push([-10, 2+i/50, 1])
    }

}

function drawSides() {
    for (i in pointPosList) {
        pastDistance = distance
        pastScreenXPos = screenXPos
        distance = Math.sqrt(Math.pow(playerPosition[0] - pointPosList[i][0], 2)+Math.pow(playerPosition[1] - pointPosList[i][1], 2))
        //angle = Math.atan((playerPosition[1]- pointPosList[i][1])/(playerPosition[0]-pointPosList[i][0]))
        angle = (Math.atan2((playerPosition[1]- pointPosList[i][1]),(playerPosition[0]-pointPosList[i][0]))* 180) / Math.PI
        angle = angle + playerViewAngle
        if (angle <= -90) {
            angle += 360
        }
        if (angle >= 270) {
            angle += -360
        }
        //console.log("angle:")
        //console.log(angle)
        

        screenXPos = (((((fovSlider.value/2)+90)-angle))/(fovSlider.value/1))*(WIDTH)

        if (screenXPos > 0 && screenXPos < WIDTH ) {
            ctx.fillStyle = `rgb( ${distance*100} ${(distance-2)*15} ${1/distance*150} )`;
            ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), (17*lineWidthSlider.value)/(100*distance*(fovSlider.value/360)), HEIGHT/distance);
        }
        connectSides(screenXPos, pastScreenXPos, distance, pastDistance)

        
    }
}
function drawMap() {
    ctx.fillStyle = `rgb( 30 30 30/ ${minimapAlphaSlider.value}%)`
    ctx.fillRect(0, HEIGHT-200, 200, 200);
    ctx.fillStyle = `rgb( 255 255 255/ ${minimapAlphaSlider.value}%)`
    ctx.fillRect(100-playerPosition[0]*10, (HEIGHT-110)+(playerPosition[1]*10), 3, 3);
    ctx.fillStyle = `rgb( 255 0 255/ ${minimapAlphaSlider.value}%)`
    for (i in pointPosList) {
        ctx.fillRect(100-pointPosList[i][0]*10, (HEIGHT-110)+(pointPosList[i][1]*10), 2, 2);
    }
    ctx.fillStyle = `rgb( 100 100 255/ ${minimapAlphaSlider.value}%)`
    for (i in spritesPosList) {
        ctx.fillRect(100-spritesPosList[i][0]*10, (HEIGHT-110)+(spritesPosList[i][1]*10), 4, 4);
    }
    ctx.strokeStyle = `rgb( 0 255 0/ ${minimapAlphaSlider.value}%)`
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-110)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads)*100), (HEIGHT-110)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads)*100))
    ctx.stroke()
    ctx.strokeStyle = `rgb( 255 0 0/ ${minimapAlphaSlider.value}%)`
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-110)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads+((fovSlider.value*Math.PI/180)/2))*100), (HEIGHT-110)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads+((fovSlider.value*Math.PI/180)/2))*100))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(100-playerPosition[0]*10, (HEIGHT-110)+(playerPosition[1]*10));
    ctx.lineTo((100-playerPosition[0]*10)+(Math.sin(playerViewAngleRads-((fovSlider.value*Math.PI/180)/2))*100), (HEIGHT-110)+(playerPosition[1]*10)-(Math.cos(playerViewAngleRads-((fovSlider.value*Math.PI/180)/2))*100))
    ctx.stroke()
}

function drawSprites() {
    
    for (i in spritesPosList) {
        pastDistance = distance
        pastScreenXPos = screenXPos
        distance = Math.sqrt(Math.pow(playerPosition[0] - spritesPosList[i][0], 2)+Math.pow(playerPosition[1] - spritesPosList[i][1], 2))
        //angle = Math.atan((playerPosition[1]- pointPosList[i][1])/(playerPosition[0]-pointPosList[i][0]))
        angle = (Math.atan2((playerPosition[1]- spritesPosList[i][1]),(playerPosition[0]-spritesPosList[i][0]))* 180) / Math.PI
        angle = angle + playerViewAngle
        if (angle <= -90) {
            angle += 360
        }
        if (angle >= 270) {
            angle += -360
        }
        //console.log("angle:")
        //console.log(angle)
        

        screenXPos = (((((fovSlider.value/2)+90)-angle))/(fovSlider.value/1))*(WIDTH)

        if (true) {
            ctx.drawImage(spritesList[spritesPosList[i][2]],screenXPos-((HEIGHT*0.75/distance)/2), (HEIGHT/2)-((HEIGHT*0.75/distance)/2), HEIGHT*0.75/distance, HEIGHT*0.75/distance); 
            //ctx.fillRect(screenXPos, (HEIGHT/2)-((HEIGHT/distance)/2), 2, HEIGHT/distance);
        }
        connectSides(screenXPos, pastScreenXPos, distance, pastDistance)

        
    }
    
}

function draw() {
    ctx.fillStyle = "rgb( 0 0 0)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = `rgb( ${distance*100} 0 200 )`;
    drawSides()
    drawSprites()
    drawMap() 

    requestAnimationFrame(draw)
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
settingsButton.addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.display === "contents") {
        content.style.display = "none";
        console.log("hiding")
      } else {
        content.style.display = "contents";
        console.log("showing")
    }
})
document.getElementById('save_canvas').addEventListener('click', function(e) {
    let canvasUrl = canvas.toDataURL("image/png")
    var createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "downloaded-canvas";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
})

map1Button.addEventListener('click', function(e) {
    pointPosList = []
    spritesPosList = []
    createMesh()
    currentUrl.searchParams.set('map', 1);
    history.replaceState(null, '', currentUrl.toString())
})
map2Button.addEventListener('click', function(e) {
    pointPosList = []
    spritesPosList = []
    map2()
    currentUrl.searchParams.set('map', 2);
    history.replaceState(null, '', currentUrl.toString())
})
map3Button.addEventListener('click', function(e) {
    pointPosList = []
    spritesPosList = []
    map3()
    currentUrl.searchParams.set('map', 3);
    history.replaceState(null, '', currentUrl.toString())
})

switch (map) {
    case "1":
        pointPosList = []
        spritesPosList = []
        createMesh()
        break
    case "2":
        pointPosList = []
        spritesPosList = []
        map2()
        break
    case "3":
        pointPosList = []
        spritesPosList = []
        map3()
        break
}


viewAngleSlider.addEventListener("mouseup", function() {
    playerViewAngle = viewAngleSlider.value
})

requestAnimationFrame(draw)