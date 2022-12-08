import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day8.txt"), {
  encoding: "utf8",
});

// const input = `
// 30373
// 25512
// 65332
// 33549
// 35390
// `;

const grid = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((n) => parseInt(n, 10))
  );

let part1 = 0;
let part2 = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (
      // edge tree, is always visible
      x === 0 ||
      y === 0 ||
      x === grid[0].length - 1 ||
      y === grid.length - 1
    ) {
      part1++;
      continue;
    }

    const height = grid[y][x];

    // left
    let visibleLeft = true;
    let leftVisible = 0;
    for (let i = x - 1; i >= 0; i--) {
      leftVisible++;

      if (grid[y][i] >= height) {
        visibleLeft = false;
        break;
      }
    }

    let visibleRight = true;
    let rightVisible = 0;
    for (let i = x + 1; i < grid[0].length; i++) {
      rightVisible++;

      if (grid[y][i] >= height) {
        visibleRight = false;
        break;
      }
    }

    let visibleTop = true;
    let topVisible = 0;
    for (let i = y - 1; i >= 0; i--) {
      topVisible++;

      if (grid[i][x] >= height) {
        visibleTop = false;
        break;
      }
    }

    let visibleBottom = true;
    let bottomVisible = 0;
    for (let i = y + 1; i < grid.length; i++) {
      bottomVisible++;

      if (grid[i][x] >= height) {
        visibleBottom = false;
        break;
      }
    }

    if (visibleBottom || visibleTop || visibleRight || visibleLeft) {
      part1++;
    }

    const score = leftVisible * rightVisible * topVisible * bottomVisible;
    if (score > part2) part2 = score;
  }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
