const fs = require("fs");

const Crates = [];

const file = fs
  .readFileSync("./day5/input.txt", "utf-8")
  .split("\r\n")
  .map((val) => {
    // Creating crates
    if (!val.startsWith("move")) {
      const regex = /\[(.*?)\]/g;

      while ((match = regex.exec(val)) != null) {
        let index = match.index / 4;
        if (!Crates[index]) Crates[index] = [];
        Crates[index].push(match[1]);
      }
      // Moving crates
    } else if (val.startsWith("move")) {
      const values = val.match(/\d+/g);

      let count = values[0];
      let from = values[1] - 1;
      let to = values[2] - 1;

      const tempCrates = [];

      for (let i = 0; i < count; i++) {
        tempCrates.push(Crates[from].shift());
      }
      tempCrates.reverse().forEach((item) => Crates[to].unshift(item));
    }
  });

Crates.unshift([]);
console.log(
  Crates.reduce((prev, current) => prev.concat(current[0])).reduce(
    (prev, current) => prev + current
  )
);
