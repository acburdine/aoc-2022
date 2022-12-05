import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cloneDeep } from "lodash";

const input = await readFile(join(import.meta.dir, "../inputs/day5.txt"), {
  encoding: "utf8",
});

// const input = `
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
//
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2
// `;

const [starting, procList] = input
  .split("\n\n")
  .map((sect) => sect.split("\n").filter(Boolean));

const stacks = starting
  .pop()
  .split(" ")
  .filter(Boolean)
  // don't care about the stack numbers, just that there are n numbers of stack lists
  .map((): string[] => []);

const crateReg = /(?:(?:\[([A-Z])\]|   )(?: |$))/g;
for (const line of starting.reverse()) {
  const crates = Array.from(line.matchAll(crateReg)).map(([, m]) => m ?? null);
  for (const [idx, crate] of crates.entries()) {
    if (!crate) continue;

    stacks[idx].push(crate);
  }
}

const procReg = /^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/;
const procedures = procList.map((proc) => {
  const [, ...nums] = proc.match(procReg);
  return nums.map((i) => parseInt(i, 10));
});

const p1Stacks = cloneDeep(stacks);

for (const [n, src, dest] of procedures) {
  for (let i = n; i > 0; i--) {
    p1Stacks[dest - 1].push(p1Stacks[src - 1].pop());
  }
}

const part1 = p1Stacks.map((stack) => stack[stack.length - 1]).join("");
console.log("Part 1:", part1);

const p2Stacks = cloneDeep(stacks);
for (const [n, src, dest] of procedures) {
  const tmp: string[] = [];

  for (let i = n; i > 0; i--) {
    tmp.unshift(p2Stacks[src - 1].pop());
  }

  p2Stacks[dest - 1].push(...tmp);
}

const part2 = p2Stacks.map((stack) => stack[stack.length - 1]).join("");
console.log("Part 2:", part2);
