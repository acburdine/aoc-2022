import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day10.txt"), {
  encoding: "utf8",
});

// const input = `
// addx 15
// addx -11
// addx 6
// addx -3
// addx 5
// addx -1
// addx -8
// addx 13
// addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx -35
// addx 1
// addx 24
// addx -19
// addx 1
// addx 16
// addx -11
// noop
// noop
// addx 21
// addx -15
// noop
// noop
// addx -3
// addx 9
// addx 1
// addx -3
// addx 8
// addx 1
// addx 5
// noop
// noop
// noop
// noop
// noop
// addx -36
// noop
// addx 1
// addx 7
// noop
// noop
// noop
// addx 2
// addx 6
// noop
// noop
// noop
// noop
// noop
// addx 1
// noop
// noop
// addx 7
// addx 1
// noop
// addx -13
// addx 13
// addx 7
// noop
// addx 1
// addx -33
// noop
// noop
// noop
// addx 2
// noop
// noop
// noop
// addx 8
// noop
// addx -1
// addx 2
// addx 1
// noop
// addx 17
// addx -9
// addx 1
// addx 1
// addx -3
// addx 11
// noop
// noop
// addx 1
// noop
// addx 1
// noop
// noop
// addx -13
// addx -19
// addx 1
// addx 3
// addx 26
// addx -30
// addx 12
// addx -1
// addx 3
// addx 1
// noop
// noop
// noop
// addx -9
// addx 18
// addx 1
// addx 2
// noop
// noop
// addx 9
// noop
// noop
// noop
// addx -1
// addx 2
// addx -37
// addx 1
// addx 3
// noop
// addx 15
// addx -21
// addx 22
// addx -6
// addx 1
// noop
// addx 2
// addx 1
// noop
// addx -10
// noop
// noop
// addx 20
// addx 1
// addx 2
// addx 2
// addx -6
// addx -11
// noop
// noop
// noop
// `;

const program = input
  .trim()
  .split("\n")
  .map((line): [string, number | null] => {
    const [instr, n] = line.trim().split(" ");
    return [instr, parseInt(n) || null];
  });

let register = 1;
let cycle = 1;
let cycleToWatch = 20;
let instruction = 0;
let skip = false;

let sum = 0;
let pixels = "";

while (instruction < program.length) {
  if (cycle === cycleToWatch) {
    sum += register * cycleToWatch;
    cycleToWatch += 40;
  }

  const place = (cycle - 1) % 40;
  pixels += place >= register - 1 && place <= register + 1 ? "#" : ".";

  cycle += 1;

  const [i, n] = program[instruction];
  if (i === "noop") {
    instruction += 1;
    continue;
  }

  if (i !== "addx") throw new Error(`unknown instruction ${i}`);
  if (!skip) {
    skip = true;
    continue;
  }

  register += n;
  instruction += 1;
  skip = false;
}

console.log("Part 1:", sum);
console.log("Part 2:");
console.log(pixels.substring(0, 40));
console.log(pixels.substring(40, 80));
console.log(pixels.substring(80, 120));
console.log(pixels.substring(120, 160));
console.log(pixels.substring(160, 200));
console.log(pixels.substring(200, 240));
