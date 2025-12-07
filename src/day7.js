import fs from "fs";

const lines = fs.readFileSync("../inputs/input7.txt", 'utf-8').trim().split("\n");

const part1 = () => {
    const coord = (x, y) => `${x},${y}`;
    const result = lines.reduce((acc, line, y) => {
        if (y === 0) {
            acc.active.add(coord(line.indexOf('S'), 0));
            return acc;
        }
        line.split("").forEach((ch, x) => {
            if (ch !== '^')
                return;
            Array.from({length: y}, (_, i) => y - 1 - i).some(y_test => {
                if (lines[y_test][x] === '^') return true;
                if (acc.active.has(coord(x, y_test))) {
                    acc.splits++;
                    acc.active.add(coord(x - 1, y));
                    acc.active.add(coord(x + 1, y));
                    return true;
                }
                return false;
            });

        });
        return acc;
    }, {active: new Set(), splits: 0});

    console.log("Part 1: ", result.splits);
}

const part2 = () => {


    const beams = lines.reduce(
        (beams, row, y) => {
            if (y === 0) {
                beams[row.indexOf('S')]++;
                return beams;
            }

            const nextBeams = Array(row.length).fill(0);
            beams.forEach((count, x) => {
                if (count === 0)
                    return;

                if (row[x] === '^') {
                    nextBeams[x - 1] += count;
                    nextBeams[x + 1] += count;
                    return;
                }

                nextBeams[x] += count;
            });
            return nextBeams;
        }, Array(lines[0].length).fill(0));

    const result = beams.reduce((sum, c) => sum + c, 0);

    console.log("Part 2: ", result);
}

part1();
part2();