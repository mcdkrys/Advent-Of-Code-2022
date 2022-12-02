const fs = require("fs");

const file = fs.readFileSync("./day2/file.txt", "utf-8").split("\r\n");


const scores1 = {
  'A X' : 4,
  'A Y' : 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6
}

const scores2 = {
  'A X' : 3,
  'A Y' : 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7
}

var score1 = 0;
var score2 = 0;

file.forEach((item) => {
  score1+=scores1[item];
  score2+=scores2[item];
});

console.log(`Scores Are ${score1} and ${score2}`  )
