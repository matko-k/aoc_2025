import fs from "fs";

const machines = fs.readFileSync("../inputs/input10.txt", 'utf-8').trim().split("\n")
    .map(line => {
        const goalMatch = line.match(/\[(.*?)\]/);
        const goal = goalMatch[1];

        const switchesMatches = [...line.matchAll(/\((.*?)\)/g)];
        const switches = switchesMatches.map(m =>
            m[1].split(',').map(x => Number(x.trim()))
        );

        const joltageMatch = line.match(/\{(.*?)\}/);
        const joltage = joltageMatch[1].split(',').map(x => Number(x.trim()));

        return { goal, switches, joltage };
    });

const part1 = () => {

    const toggle = (state, toggle) => {
        const arr = state.split('');
        toggle.forEach(i => {
            arr[i] = arr[i] === '.' ? '#' : '.';
        })
        return arr.join('');
    }

    const minSwitchPresses = (goal, switches) => {
        const start = '.'.repeat(goal.length);

        if (start === goal)
            return 0;

        const queue = [[start, 0]];
        const visited = new Set([start]);

        while (queue.length > 0) {
            const [state, dist] = queue.shift();

            if (state === goal)
                return dist;

            for (const sw of switches) {
                const next = toggle(state, sw);

                if (!visited.has(next)) {
                    visited.add(next);
                    queue.push([next, dist + 1]);
                }
            }
        }
        return -1;
    }

    const result = machines.reduce((acc, mach) => {
       return acc + minSwitchPresses(mach.goal, mach.switches);
    }, 0);

    console.log("Part 1: ", result);
}

const part2 = () => {

    const applySwitchPress = (state, switchPressed) => {
        const next = state.slice();
        switchPressed.forEach(i => {
            next[i] += 1;
        })
        return next;
    };

    console.log("Part 2: ", 0);
}

part1();
part2();