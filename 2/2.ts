import fs from "fs";

const lines = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const isSafeReport = (levels: number[]) => {
  const isIncreasing = levels.every(
    (_, i) => i === 0 || levels[i] > levels[i - 1]
  );
  const isDecreasing = levels.every(
    (_, i) => i === 0 || levels[i] < levels[i - 1]
  );

  if (!isIncreasing && !isDecreasing) {
    return false;
  }

  return levels.every(
    (_, i) =>
      i === 0 ||
      (Math.abs(levels[i] - levels[i - 1]) >= 1 &&
        Math.abs(levels[i] - levels[i - 1]) <= 3)
  );
};

const canBeSafeByRemovingOne = (levels: number[]) => {
  if (isSafeReport(levels)) return true;

  return levels.some((_, i) => {
    const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));

    return isSafeReport(newLevels);
  });
};

const safeReportsCount = lines.filter(isSafeReport).length;
const safeReportsCounts = lines.filter(canBeSafeByRemovingOne).length;

console.log("part 1:", safeReportsCount);
console.log("part 2:", safeReportsCounts);
