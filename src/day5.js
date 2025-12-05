import fs from "fs";

const [rangePart, numberPart ] = fs.readFileSync("../inputs/input5.txt", 'utf-8').trim().split(/\n\s*\n/);

const ranges = rangePart
    .split("\n")
    .map(line => {
        const [start, end] = line.split("-").map(Number);
        return { start, end };
    });

const ingredients = numberPart
    .split("\n")
    .map(Number);


const part1 = () => {
    const fresh = ingredients.filter(ing => {
        for (const range of ranges) {
            if (ing >= range.start && ing <= range.end)
                return true;
        }
        return false;
    })
    console.log("Part 1: ", fresh.length);
}

const part2 = () => {

    ranges.sort((a, b) => a.start - b.start);
    let mergedRanges = [];
    let current = { ...ranges[0] };

    for (const range of ranges) {
        const next = range;
        if (next.start <= current.end) {
            current.end = Math.max(current.end, next.end);
            continue;
        }
        mergedRanges.push(current);
        current = { ...next };
    }
    mergedRanges.push(current);

    const result = mergedRanges.reduce((acc, range) => {
        return acc + range.end - range.start + 1;
    }, 0);

    console.log("Part 2: ", result);
}

part1();
part2();