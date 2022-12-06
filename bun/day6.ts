import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day6.txt"), {
  encoding: "utf8",
});

function startOfMarker(str: string, n: number): number {
  for (let i = n; i < str.length; i++) {
    const group = new Set(str.substring(i - n, i));
    if (group.size === n) return i;
  }

  return -1;
}

console.log("Part 1:", startOfMarker(input, 4));
console.log("Part 2:", startOfMarker(input, 14));
