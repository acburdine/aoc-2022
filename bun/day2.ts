import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(import.meta.dir, "../inputs/day2.txt"), {
  encoding: "utf8",
});

enum Selection {
  Rock = "ROCK",
  Paper = "PAPER",
  Scissors = "SCISSORS",
}

const throwPoints = {
  [Selection.Rock]: 1,
  [Selection.Paper]: 2,
  [Selection.Scissors]: 3,
};

function calcPoints(self: Selection, other: Selection): number {
  const throwScore = throwPoints[self];

  if (self === other) {
    // draw, add 3
    return throwScore + 3;
  }

  if (
    (other === Selection.Rock && self === Selection.Paper) ||
    (other === Selection.Paper && self === Selection.Scissors) ||
    (other === Selection.Scissors && self === Selection.Rock)
  ) {
    return throwScore + 6;
  }

  return throwScore;
}

const otherKey = {
  A: Selection.Rock,
  B: Selection.Paper,
  C: Selection.Scissors,
};

const selfKey = {
  X: Selection.Rock,
  Y: Selection.Paper,
  Z: Selection.Scissors,
};

const winKey = {
  [Selection.Rock]: {
    X: Selection.Scissors,
    Y: Selection.Rock,
    Z: Selection.Paper,
  },
  [Selection.Paper]: {
    X: Selection.Rock,
    Y: Selection.Paper,
    Z: Selection.Scissors,
  },
  [Selection.Scissors]: {
    X: Selection.Paper,
    Y: Selection.Scissors,
    Z: Selection.Rock,
  }
}

const lines = input.trim().split("\n");

const totalP1 = lines
  .reduce((prev, line) => {
    const [other, self] = line.trim().split(" ");
    return prev + calcPoints(selfKey[self], otherKey[other]);
  }, 0);

console.log("Part 1:", totalP1);

const totalP2 = lines.reduce((prev, line) => {
  const [other, condition] = line.trim().split(" ");
  const otherSelect = otherKey[other];

  return prev + calcPoints(winKey[otherSelect][condition], otherSelect);
}, 0)

console.log("Part 2:", totalP2);
