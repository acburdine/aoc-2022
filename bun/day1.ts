import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day1.txt"), {
  encoding: "utf8",
});

const inventories: number[] = input
  .split("\n\n")
  .filter(Boolean)
  .map((str) => str.split("\n").map((l) => parseInt(l.trim(), 10)))
  .map((inv) => inv.reduce((p, c) => p + c, 0));

inventories.sort((a, b) => b - a);

console.log("Part 1: ", inventories[0]);
console.log("Part 2: ", inventories[0] + inventories[1] + inventories[2]);
