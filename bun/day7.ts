import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sortBy } from "lodash";

const input = await readFile(join(import.meta.dir, "../inputs/day7.txt"), {
  encoding: "utf8",
});

// const input = `
// $ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k
// `;

const shell = input.trim().split("\n");

class FsNode {
  readonly name: string;
  readonly type: "dir" | "file";
  private _size?: number;

  parent: FsNode | null = null;
  children: FsNode[] = [];

  constructor(line: string) {
    const [dirOrSize, name] = line.trim().split(" ");
    this.name = name;

    if (dirOrSize === "dir") {
      this.type = "dir";
    } else {
      this.type = "file";
      this._size = parseInt(dirOrSize, 10);
    }
  }

  get size(): number {
    if (typeof this._size !== "undefined") return this._size;

    this._size = this.children.reduce((prev, node) => prev + node.size, 0);
    return this._size;
  }
}

const root = new FsNode("dir /");
let pwd: FsNode = null;

for (let i = 0; i < shell.length; i++) {
  const line = shell[i];
  if (!line.startsWith("$ ")) {
    throw new Error(`unexpected non-command output: ${line}`);
  }

  const [, cmd, arg] = line.trim().split(" ");
  if (cmd === "cd") {
    if (arg === "/") {
      pwd = root;
      continue;
    }

    if (arg === "..") {
      if (!pwd?.parent) {
        throw new Error("attempted to cd .. but no parent dir available");
      }
      pwd = pwd.parent;
      continue;
    }

    const child = pwd.children.find(({ name }) => name === arg);
    if (!child) throw new Error(`attempted to cd into non-existent dir ${arg}`);
    pwd = child;
    continue;
  }

  if (cmd !== "ls") {
    throw new Error(`unrecognized command ${cmd}`);
  }

  while (i < shell.length - 1 && !shell[i + 1].startsWith("$ ")) {
    const child = new FsNode(shell[++i]);
    pwd.children.push(child);
    child.parent = pwd;
  }
}

function part1(node: FsNode): number {
  return node.children
    .filter((n) => n.type === "dir")
    .reduce(
      (prev, n) => {
        return prev + part1(n);
      },
      node.size <= 100000 ? node.size : 0
    );
}

console.log("Part 1:", part1(root));

const totalSize = 70000000;
const remainingSize = totalSize - root.size;

const neededSize = 30000000;

function part2(node: FsNode): FsNode[] {
  if (node.size + remainingSize < neededSize) {
    return [];
  }

  const canDelete: FsNode[] = [node];
  return canDelete.concat(
    node.children.filter((n) => n.type === "dir").flatMap(part2)
  );
}

console.log("Part 2:", sortBy(part2(root), "size")[0].size);
