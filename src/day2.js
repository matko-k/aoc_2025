import fs from "fs";

const ranges = fs.readFileSync("../inputs/input2.txt", 'utf-8')
    .trim()
    .split(/[,\n]/)
    .filter(Boolean)
    .map(r => {
        const i = r.indexOf("-");
        return {
            start: Number(r.slice(0, i)),
            end: Number(r.slice(i + 1))
        };
    });

const part1 = () => {
    const result = ranges.reduce((acc, range) => {
        for (let j = range.start; j <= range.end; j++) {
            const s = String(j);
            if (s.length % 2 !== 0)
                continue;
            const [left, right] = [s.slice(0, s.length / 2), s.slice(s.length / 2)];
            if (left === right)
                acc += j;
        }
        return acc;
    }, 0);

    console.log("Part 1: ", result);
}

const part2 = () => {
    const result = ranges.reduce((acc, range) => {
        for (let j = range.start; j <= range.end; j++) {
            const s = String(j);
            if (s.length === 1)
                continue;

            if (s.split("").every(c => c === s[0])) {
                acc += j;
                continue;
            }

            for (let k = 2; k <= s.length / 2; k++) {
                if (s.length % k !== 0)
                    continue;
                const parts = [];
                const x = s.length / k;
                for (let i = 0; i < s.length; i += x) {
                    parts.push(s.slice(i, i + x));
                }
                if (parts.every(p => p === parts[0]))
                {
                    acc += j;
                    break;
                }
            }
        }
        return acc;
    }, 0);

    console.log("Part 2: ", result);
}

part1();
part2();