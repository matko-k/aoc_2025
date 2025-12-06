import fs from "fs";

const rows = fs.readFileSync("../inputs/input6.txt", 'utf-8').trim().split("\n")
    .map(r => r.trim().split(/\s+/));

const problems = rows[0].map((_, i) => ({
    values: rows.slice(0, -1).map(r => Number(r[i])),
    op: rows.at(-1)[i]
}));

const part1 = () => {
    const result = problems.reduce((acc, {values, op}) => {
        if (op === '*')
            return acc + values.reduce((a, b) => a * b, 1);
        return acc + values.reduce((a, b) => a + b, 0);
    }, 0);
    console.log("Part 1: ", result);
}

const part2 = () => {
    const grid = fs.readFileSync("../inputs/input6.txt", 'utf-8').split("\n").filter(row => row.length !== 0).map(row => row.split(""));
    const lastRow = grid.at(-1);
    let start = 0;
    let result = 0;

    for (let j = 1; j <= lastRow.length; j++) {
        if (j === lastRow.length || lastRow[j] === "+" || lastRow[j] === "*") {
            const op = lastRow[start];
            const block = grid.slice(0, -1).map(row => row.slice(start, j));

            const numbers = block[0].map((_, col) =>
                block.slice().reverse()
                    .reduce(({num, mult},
                             row) => row[col] === " " ? {num, mult}
                        : {num: num + Number(row[col]) * mult, mult: mult * 10}
                        , {num: 0, mult: 1}).num);

            result += op === '+' ? numbers.filter(Boolean).reduce((a, b) => a + b, 0)
                : numbers.filter(Boolean).reduce((a, b) => a * b, 1);

            start = j;
        }
    }

    console.log("Part 2: ", result);
}

part1();
part2();