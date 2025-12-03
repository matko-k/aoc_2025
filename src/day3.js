import fs from "fs";

const lines = fs.readFileSync("../inputs/input3.txt", 'utf-8').trim().split("\n");


const part1 = () => {
    const result = lines.reduce((acc, line) => {
        let lineMax = -1;
        const arr = Array.from(line, Number);
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                lineMax = Math.max(lineMax, arr[i] * 10 + arr[j]);
            }
        }
        return acc + lineMax;
    }, 0);

    console.log("Part 1: ", result);
}

const part2 = () => {
    const result = lines.reduce((acc, line) => {
        const arr = Array.from(line, Number);

        function findLineMax(arr, len) {
            if (len === 0) return "";

            const {maxDigit, maxIndex} = arr
                .slice(0, arr.length - len + 1)
                .reduce(
                    (acc, val, idx) => val > acc.maxDigit ? {maxDigit: val, maxIndex: idx} : acc,
                    {maxDigit: -Infinity, maxIndex: -1}
                );

            return String(maxDigit) + findLineMax(arr.slice(maxIndex + 1), len - 1);
        }

        return acc + Number(findLineMax(arr, 12))
    }, 0);

    console.log("Part 2: ", result);
}


part1();
part2();