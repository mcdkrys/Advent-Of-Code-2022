const fs = require("fs");

const file = fs.readFileSync("./day1/file.txt", "utf-8").split("\r\n");

var elves = {};
var x = 0;

file.forEach((item, index) => {
  if (item == "") x++;
  else {
    if (!elves[x])
      elves[x] = {
        number: x+1,
        calories: new Array(),
        total: 0,
      };
    elves[x].calories.push(item);
    elves[x].total += parseInt(item);
  }
});

const sorted = Object.entries(elves)
  .sort(([, a], [, b]) => {
    return b.total - a.total;
  })
  .map((item) => item[1]);



function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

console.log(`The ${ordinal_suffix_of(sorted[0].number)} elf got ${sorted[0].total} calories`);

console.log(`The sum calories of first three elves are ${sorted[0].total+sorted[1].total+sorted[2].total} calories`);