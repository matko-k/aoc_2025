import fs from "fs";

const points = fs.readFileSync("../inputs/input8.txt", 'utf-8').trim().split("\n")
    .map(line => line
        .trim()
        .split(',')
        .map(Number));

const dist = (pointA, pointB) => {
    return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2 + (pointA[2] - pointB[2]) ** 2);
}

const distances = points.flatMap((p1, i) => points.slice(i + 1)
    .map((p2, j) => ({dist: dist(p1, p2), p1, p2, i, j: i + 1 + j})))
    .sort((a, b) => a.dist - b.dist);

const findGroup = (groups, index) =>
    groups.find(g => g.some(p => p.index === index));

const mergeGroups = (groups, g1, g2) => {
    const merged = [...g1, ...g2];
    return groups
        .filter(g => g !== g1 && g !== g2)
        .concat([merged]);
};

const part1 = () => {
    const N = 1000;
    const initialGroups = points.map((coords, index) => [{coords, index}]);

    const {groups} = distances.reduce(
        (state, {i, j}) => {
            if (state.count >= N || state.groups.length === 1)
                return state;

            state.count++;

            const g1 = findGroup(state.groups, i);
            const g2 = findGroup(state.groups, j);
            if (g1 === g2)
                return state;

            return {
                groups: mergeGroups(state.groups, g1, g2),
                count: state.count
            };
        },
        {groups: initialGroups, count: 1}
    );

    const groupsSorted = groups.sort((a, b) => b.length - a.length);

    console.log("Part 1: ", groupsSorted[0].length * groupsSorted[1].length * groupsSorted[2].length);
}

const part2 = () => {
    const initialGroups = points.map((coords, index) => [{coords, index}]);

    const {lastMerged} = distances.reduce(
        (state, {i, j}) => {
            if (state.groups.length === 1)
                return state;

            const g1 = findGroup(state.groups, i);
            const g2 = findGroup(state.groups, j);
            if (g1 === g2)
                return state;

            return {
                groups: mergeGroups(state.groups, g1, g2),
                lastMerged: {i, j}
            };
        },
        {groups: initialGroups}
    );

    console.log("Part 2: ", points[lastMerged.i][0] * points[lastMerged.j][0]);
}

part1();
part2();