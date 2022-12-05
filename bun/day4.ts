import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day4.txt"), {
  encoding: "utf8",
});

const parseTuple = (s: string): [number, number] => {
  const [l, r] = s.trim().split("-");
  return [parseInt(l, 10), parseInt(r, 10)];
};

const overlap = (range: [number, number], n: number): boolean =>
  range[0] <= n && range[1] >= n;

const assignments = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(",").map(parseTuple));

let part1 = 0;
let part2 = 0;
for (const [one, two] of assignments) {
  if (
    (one[0] <= two[0] && one[1] >= two[1]) ||
    (two[0] <= one[0] && two[1] >= one[1])
  ) {
    part1++;
  }

  if (
    overlap(one, two[0]) ||
    overlap(one, two[1]) ||
    overlap(two, one[0]) ||
    overlap(two, one[1])
  ) {
    part2++;
  }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
