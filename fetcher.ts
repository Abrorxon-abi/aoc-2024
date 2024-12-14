import fs from "fs";
async function getInput(year: number, day: number) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_ID}`,
    },
  });
  console.log(process.env.AOC_SESSION_ID);
  return response.text();
}

async function getOrWriteInput(day: number) {
  const input = await getInput(2024, day);
  if (!fs.existsSync(day.toString())) {
    fs.mkdirSync(day.toString());
    fs.writeFileSync(`${day}/input.txt`, input.trim());
    console.log(`Folder "${day}" created with input.txt`);
  } else {
    fs.writeFileSync(`${day}/input.txt`, input.trim());
    console.log(`Folder "${day}" already exists, updated input.txt`);
  }
}

function getDay() {
  return new Date().getDate();
}

function waitUntilTime(
  hour: number,
  minute: number,
  second: number
): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(hour, minute, second, 0);

      if (now >= target) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

async function main() {
  await waitUntilTime(10, 0, 1);
  const day = getDay();
  console.log(`Fetching input for day ${day}`);
  await getOrWriteInput(day);
}

main();
