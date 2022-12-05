import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { chunk } from "lodash";

const input = await readFile(join(import.meta.dir, "../inputs/day3.txt"), {
  encoding: "utf8",
});

const prios = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const prioOf = (s: string) => prios.indexOf(s) + 1;

const rucksacks = input
  .trim()
  .split("\n")
  .map((l) => {
    const half = l.length / 2;
    return [l.substring(0, half), l.substring(half)];
  });

const part1 = rucksacks.reduce((prev, [l, r]) => {
  const shared = l.split("").find((c) => r.includes(c));
  if (!shared) throw new Error(`no shared element for rucksack ${l}${r}`);

  return prev + prioOf(shared);
}, 0);

console.log("Part 1:", part1);

const groups = chunk(rucksacks, 3);

const part2 = groups.reduce((prev, group) => {
  const twoSet = new Set(group[1].join("").split(""));
  const threeSet = new Set(group[2].join("").split(""));

  const one = group[0].join("").split("");
  const shared = one.find((c) => twoSet.has(c) && threeSet.has(c));
  return prev + prioOf(shared);
}, 0);

console.log("Part 2:", part2);
