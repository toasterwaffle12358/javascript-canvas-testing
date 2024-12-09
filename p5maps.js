function map2() {
    //bottom 1
    for (let i = 0; i < 200; i++) {
        pointPosList.push([5-i/50, 5, 1])
    }
    //top 1
    for (let i = 0; i < 200; i++) {
        pointPosList.push([5-i/50, 4, 1])
    }
    //top arm left 1
    for (let i = 0; i < 200; i++) {
        pointPosList.push([1, 4-i/50, 1])
    }
    //bottom arm left 1
    for (let i = 0; i < 200; i++) {
        pointPosList.push([1, 5+i/50, 1])
    }
    //bottom room wall
    for (let i = 0; i < 400; i++) {
        pointPosList.push([1-i/50, 9, 1])
    }
    //bottom inner room wall left
    for (let i = 0; i < 200; i++) {
        pointPosList.push([-2, 5+i/50, 1])
    }
    for (let i = 0; i < 200; i++) {
        pointPosList.push([-7, 5+i/50, 1])
    }
    //inner room doorway right
    for (let i = 0; i < 75; i++) {
        pointPosList.push([-7+i/50, 5, 1])
    }
    //inner room doorway left
    for (let i = 0; i < 75; i++) {
        pointPosList.push([-2-i/50, 5, 1])
    }
    //top room wall left
    for (let i = 0; i < 200; i++) {
        pointPosList.push([1-i/50, 0, 1])
    }
    //top room wall right
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-5-i/50, 0, 1])
    }
    //box top
    for (let i = 0; i < 75; i++) {
        pointPosList.push([0-i/50, 1, 1])
    }
    //box left
    for (let i = 0; i < 100; i++) {
        pointPosList.push([0, 1+i/50, 1])
    }
    //box right
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-1.5, 1+i/50, 1])
    }
    //box bottom
    for (let i = 0; i < 76; i++) {
        pointPosList.push([0-i/50, 3, 1])
    }

    //box 2 left
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-3, 1+i/50, 1])
    }
    //box 2 top
    for (let i = 0; i < 75; i++) {
        pointPosList.push([-3-i/50, 1, 1])
    }

    //room left wall right top
    for (let i = 0; i < 200; i++) {
        pointPosList.push([5, 0+i/50, 1])
    }
    //room left wall right top
    for (let i = 0; i < 200; i++) {
        pointPosList.push([5, 5+i/50, 1])
    }

    //room left top
    for (let i = 0; i < 200; i++) {
        pointPosList.push([9-i/50, 0, 1])
    }
    //room left bottom
    for (let i = 0; i < 200; i++) {
        pointPosList.push([9-i/50, 9, 1])
    }

    //hallway up left
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-3, -2+i/50, 1])
    }
    //hallway up left
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-5, -2+i/50, 1])
    }

    //top room bottom wall left
    for (let i = 0; i < 200; i++) {
        pointPosList.push([1-i/50, -2, 1])
    }
    //top room bottom wall right
    for (let i = 0; i < 100; i++) {
        pointPosList.push([-5-i/50, -2, 1])
    }
    //top room wall left
    for (let i = 0; i < 200; i++) {
        pointPosList.push([1, -6+i/50, 1])
    }
    //top room wall right
    for (let i = 0; i < 200; i++) {
        pointPosList.push([-7, -6+i/50, 1])
    }
    



}
function map3() {
    for (let i = 0; i < 200; i++) {
        let y = Math.sqrt(9.0-((i*3.0/200.0)**2.0))
        pointPosList.push([i*3/200, y, 1])
        console.log(i*3/200, y)
    }
    for (let i = 0; i < 200; i++) {
        let y = Math.sqrt(9.0-((i*3.0/200.0)**2.0))
        pointPosList.push([-i*3/200, y, 1])
        console.log(i*3/200, y)
    }
    for (let i = 0; i < 200; i++) {
        let y = Math.sqrt(9.0-((i*3.0/200.0)**2.0))
        pointPosList.push([-i*3/200, -y, 1])
        console.log(i*3/200, y)
    }
    for (let i = 0; i < 200; i++) {
        let y = Math.sqrt(9.0-((i*3.0/200.0)**2.0))
        pointPosList.push([i*3/200, -y, 1])
        console.log(i*3/200, y)
    }
}