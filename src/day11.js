import fs from "fs";

const network = new Map(fs.readFileSync("../inputs/input11.txt", 'utf-8').trim().split("\n")
    .map(line => line.split(":"))
    .map(([id, connections]) => [
        id.trim(),
        connections.trim().split(/\s+/)
    ]));


const part1 = () => {

    const countPaths = (node) => {
        if (node === "out")
            return 1;
        return network.get(node).reduce((acc, n) => {
            return acc + countPaths(n);
        }, 0);
    }
    console.log("Part 1: ", countPaths("you"));
}

const part2 = () => {

    const memo = new Map();

    const countPaths = (node, path) => {
        if (path.includes(node))
            return 0;

        const includesDAC = path.includes("dac");
        const includesFFT = path.includes("fft");
        const key = node + "|" + includesDAC + "|" + includesFFT;
        if (memo.has(key))
            return memo.get(key);

        if (node === "out")
            return includesFFT && includesDAC ? 1 : 0;

        const total = network.get(node).reduce((acc, next) => {
            return acc + countPaths(next, [...path, node]);
        }, 0);

        memo.set(key, total);
        return total;
    }
    console.log("Part 2: ", countPaths("svr", []));
}

part1();
part2();