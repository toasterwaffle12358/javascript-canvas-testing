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
    //top room wall
    for (let i = 0; i < 400; i++) {
        pointPosList.push([1-i/50, 0, 1])
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


}