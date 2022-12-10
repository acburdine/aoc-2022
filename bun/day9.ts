import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day9.txt"), {
  encoding: "utf8",
});

// const input = `
// R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20
// `;

class Point {
  x = 0;
  y = 0;

  move(dir: string) {
    switch (dir) {
      case "R":
        this.x += 1;
        break;
      case "D":
        this.y -= 1;
        break;
      case "L":
        this.x -= 1;
        break;
      case "U":
        this.y += 1;
        break;
    }
  }

  follow(other: Point) {
    const xdiff = other.x - this.x;
    const ydiff = other.y - this.y;

    // no change since the diff is close enough
    if (Math.abs(xdiff) < 2 && Math.abs(ydiff) < 2) return;
    if (xdiff) this.x += xdiff > 0 ? 1 : -1;
    if (ydiff) this.y += ydiff > 0 ? 1 : -1;
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

const instr = input
  .trim()
  .split("\n")
  .map((line): [string, number] => {
    const [dir, n] = line.trim().split(" ");
    return [dir, parseInt(n, 10)];
  });

const p1 = new Set<string>(["0,0"]);
const p2 = new Set<string>(["0,0"]);

const head = new Point();
const tail = new Point();

const p2Points = [
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
  new Point(),
];

for (const [dir, n] of instr) {
  for (let i = 0; i < n; i++) {
    head.move(dir);
    tail.follow(head);
    p1.add(tail.toString());

    p2Points[0].move(dir);
    for (let j = 1; j < p2Points.length; j++) {
      p2Points[j].follow(p2Points[j - 1]);
    }
    p2.add(p2Points[9].toString());
  }
}

console.log("Part 1:", p1.size);
console.log("Part 2:", p2.size);
