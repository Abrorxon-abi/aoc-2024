import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const sumValidMultiplications = (input: string): number => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let match;
  let sum = 0;

  while ((match = regex.exec(input)) !== null) {
    const [, num1, num2] = match;
    sum += parseInt(num1) * parseInt(num2);
  }

  return sum;
};

const sumEnabledMultiplications = (input: string): number => {
  const regex = /(do|don't)\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  let sum = 0;
  let enabled = true;
  let match;

  while ((match = regex.exec(input)) !== null) {
    if (match[1] === "do") {
      enabled = true;
    } else if (match[1] === "don't") {
      enabled = false;
    } else if (enabled && match[2] && match[3]) {
      sum += parseInt(match[2]) * parseInt(match[3]);
    }
  }

  return sum;
};

const result = sumValidMultiplications(input);
const result2 = sumEnabledMultiplications(input);

console.log("Part 1:", result);
console.log("Part 2:", result2);
