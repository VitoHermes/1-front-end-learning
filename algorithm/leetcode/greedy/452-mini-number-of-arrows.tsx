// 每个气球是一个范围，射箭，问最少多少箭可以覆盖所有气球

function minimumArrow(ballons: number[][]): number {
    if (ballons.length === 1) {
        return 1;
    }
    let arrows = 1;
    const sortedBallons = ballons.sort((a, b) => a[1] - b[1]);
    let endOfBallon = sortedBallons[0][1];
    for (let i = 0; i < sortedBallons.length; i++) {
        if (endOfBallon < sortedBallons[i][0]) {
            arrows++;
            endOfBallon = sortedBallons[i][1];
        };
    }
    return arrows;
}

console.log(minimumArrow([[1, 6], [2, 8], [7, 12], [10, 16]]));