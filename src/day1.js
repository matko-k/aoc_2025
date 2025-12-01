import fs from "fs";

const lines = fs.readFileSync("../inputs/input1.txt", 'utf-8').trim().split("\n");


const part1 = () => {
    let current = 50;

    const zerosCount = lines.reduce((acc, line) => {
        const num = parseInt(line.slice(1), 10);
        if (line[0] === 'R') {
            current = (current + num) % 100;
        } else {
            current -= num;
            while (current < 0) {
                current += 100;
            }
        }

        return acc + (current === 0 ? 1 : 0);
    }, 0);

    console.log("Part 1: ", zerosCount);
}

const part2 = () => {
    let current = 50;

    const zerosCount = lines.reduce((acc, line) => {
        const num = parseInt(line.slice(1), 10);

        if (line[0] === 'R') {
            acc += num >= 100 ? Math.floor(num / 100) : 0;
            acc += (current + num % 100) > 100 ? 1 : 0;
            current = (current + num) % 100;

        } else {
            let start = current;
            current -= num;
            while (current < 0) {
                current += 100;
                acc++;
                if (start === 0) {
                    acc--;
                    start = current;
                }
            }
        }

        return acc + (current === 0 ? 1 : 0);
    }, 0);

    console.log("Part 2: ", zerosCount);
}

part1();
part2();