import fs from "fs";

const lines = fs.readFileSync("../inputs/input12.txt", 'utf-8').trim().split("\n");

const [shapeLines, configsLines] = (() => {
    const gridStartIndex = lines.findIndex(line => /^\d+x\d+:/.test(line));
    return [
        gridStartIndex >= 0 ? lines.slice(0, gridStartIndex) : lines,
        gridStartIndex >= 0 ? lines.slice(gridStartIndex) : []
    ];
})();

const shapes = shapeLines
    .map(line => line.trim())
    .filter(Boolean)
    .reduce((acc, line, idx, arr) => {
        if (line.endsWith(':')) {
            const index = Number(line.slice(0, -1));
            const shape = arr.slice(idx + 1, idx + 4);
            acc.push({index, shape});
        }
        return acc;
    }, []);

const configs = configsLines
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
        const [, width, height, config] = /^(\d+)x(\d+):\s*(.*)$/.exec(line);
        return {
            width: Number(width),
            height: Number(height),
            config: config.split(/\s+/).map(Number)
        };
    });

const part1 = () => {

    const areas = shapes.map(shape => shape.shape.flatMap(row => row.split('')).filter(c => c === '#').length);

    const result = configs.filter(config => {
            const shapesArea = config.config.reduce((acc, n, i) => acc + n * areas[i], 0);
            const configArea = config.width * config.height;
            return shapesArea <= configArea;
        }
    ).length;

    console.log("Part 1: ", result);
}

const part2 = () => {

    console.log("Part 2: ", 0);
}

part1();
part2();