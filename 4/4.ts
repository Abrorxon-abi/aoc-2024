import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const countXMAS = (grid: string[]): number => {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "X") {
        for (const [dr, dc] of directions) {
          let r = row;
          let c = col;
          let word = "X";

          for (let i = 0; i < 3; i++) {
            r += dr;
            c += dc;

            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              word += grid[r][c];
            }
          }

          if (word === "XMAS") {
            count++;
          }
        }
      }
    }
  }

  return count;
};

const countXMAS2 = (grid: string[]): number => {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (grid[row][col] === "A") {
        const tl = grid[row - 1][col - 1];
        const tr = grid[row - 1][col + 1];
        const bl = grid[row + 1][col - 1];
        const br = grid[row + 1][col + 1];

        if (
          (tl === "M" && br === "S" && tr === "M" && bl === "S") ||
          (tl === "M" && br === "S" && tr === "S" && bl === "M") ||
          (tl === "S" && br === "M" && tr === "M" && bl === "S") ||
          (tl === "S" && br === "M" && tr === "S" && bl === "M")
        ) {
          count++;
        }
      }
    }
  }

  return count;
};

console.log("part 1:", countXMAS(input));
console.log("part 2:", countXMAS2(input));
