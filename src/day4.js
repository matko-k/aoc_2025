import fs from "fs";

const lines = fs.readFileSync("../inputs/input4.txt", 'utf-8').trim().split("\n");

const DIR8 = [
    [ 0,  1],
    [ 1,  1],
    [ 1,  0],
    [ 1, -1],
    [ 0, -1],
    [-1, -1],
    [-1,  0],
    [-1,  1]
];

const countAdjacent = (grid, x, y) => {
    let count = 0;
    for (const [dx, dy] of DIR8) {
        const nx = x + dx;
        const ny = y + dy;

        if (ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[0].length &&
            grid[ny][nx] === '@') {
            count++;
        }
    }

    return count;
}

const part1 = () => {

    let res = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] === '@')
                if (countAdjacent(lines, j, i) < 4)
                    res++;
        }
    }

    console.log("Part 1: ", res);
}

const part2 = () => {
    let grid = lines.map(row => [...row]);
    let res = 0;

    while (1) {
        let toRemove = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === '@')
                    if (countAdjacent(grid, j, i) < 4)
                        toRemove.push({i, j});
            }
        }
        if (toRemove.length === 0)
            break;

        res += toRemove.length;

        for (const { i, j } of toRemove) {
            grid[i][j] = '.';
        }
    }
    console.log("Part 2: ", res);
}

part1();
part2();