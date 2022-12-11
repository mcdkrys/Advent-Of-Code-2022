const fs = require("fs");

const file = fs
  .readFileSync("./day10/input.txt", "utf-8")
  .split("\r\n")
  .map((element) => [element.split(" ")[0], parseInt(element.split(" ")[1])]);


let sumOfStrenghts = 0;
let cycle = 0;
let x = 1;

file.forEach((val) => {
  if (val[0] === "noop") {
    cycle += 1;
    if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle == 180 || cycle === 220) {
      sumOfStrenghts += x * cycle;
    }
  } else if (val[0] === "addx") {
    for (let i = 0; i < 2; i++) {
      cycle += 1;
      if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle == 180 || cycle === 220) {
        sumOfStrenghts += x * cycle;
      }
      if (i === 1) {
        const v = parseInt(val[1], 10);
        x += v;
      }
    }
  }
});



console.log(sumOfStrenghts)