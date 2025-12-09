import fs from "fs";

const points = fs.readFileSync("../inputs/input9.txt", 'utf-8').trim().split("\n")
    .map(line => {
        const [x, y] = line.split(',').map(Number);
        return {x, y};
    });

const area = (pointA, pointB) => {
    return (Math.abs(pointA.x - pointB.x) + 1) * (Math.abs(pointA.y - pointB.y) + 1);
}

const part1 = () => {

    const areas = points.flatMap((p1, i) => points.slice(i + 1)
        .map(p2 => (area(p1, p2))))
        .sort((a, b) => b - a);

    console.log("Part 1: ", areas[0]);
}

const part2 = () => {
    const areas = points.flatMap((p1, i) => points.slice(i + 1)
        .filter((p2) => {
            const [topY, leftX, bottomY, rightX] = [Math.min(p1.y, p2.y), Math.min(p1.x, p2.x), Math.max(p1.y, p2.y), Math.max(p1.x, p2.x)];
            let k = i;
            while (1) {
                k = (k + 1) % points.length;
                const curr = points[k];
                const next = points[(k + 1) % points.length];
                const [minX, maxX] = [Math.min(curr.x, next.x), Math.max(curr.x, next.x)];
                const [minY, maxY] = [Math.min(curr.y, next.y), Math.max(curr.y, next.y)];
                if (curr === p1)
                    break;
                if (curr.x > leftX && curr.x < rightX && curr.y > topY && curr.y < bottomY
                    || curr.y > topY && curr.y < bottomY && leftX >= minX && leftX <= maxX && rightX >= minX && rightX <= maxX
                    || curr.x > leftX && curr.x < rightX && bottomY >= minY && bottomY <= maxY && topY >= minY && topY <= maxY)
                    return false;
            }
            return true;
        })
        .map(p2 => (area(p1, p2))))
        .sort((a, b) => b - a);

    console.log("Part 2: ", areas[0]);
}

part1();
part2();