/*
A for Rock
B for Paper
C for Scissors

X for Rock
Y for Paper
Z for Scissors

Rock is 1 score
Paper is 2 score
Scissors is 3 score

Won -> 6
Draw -> 3
Lose -> 0
*/

const fs = require("fs");

const file = fs.readFileSync("./day2/file.txt", "utf-8").split("\r\n");

var score1 = 0;
var score2 = 0;

file.forEach((item) => {
  const items = item.split(" ");

  score1 += (() => {
    var count = 0;

    switch (items[1]) {
      case "X":
        count += 1;
        break;
      case "Y":
        count += 2;
        break;
      case "Z":
        count += 3;
        break;
      default:
        count += 0;
    }

    if (whoBeatLetter(items[1]) == items[0]) count += 6;
    if (equalCard(items[1]) == items[0]) count += 3;

    return count;
  })();

  score2 += (() => {
    var count = 0;

    switch (items[1]) {
      case "X":
        count += getScore(whoLoseLetter(items[0]))
        break;
      case "Y":
        count += count += getScore(items[0]) + 3;
        break;
      case "Z":
        count += getScore(whoBeatLetter(items[0])) + 6;
        break;
      default:
        count += 0;
    }

    return count;
  })();
});

console.log("Score is " + score1 + " and " + score2);

function equalCard(card) {
  switch (card) {
    case "X":
      return "A";
    case "Y":
      return "B";
    case "Z":
      return "C";
    default:
      return null;
  }
}

function getScore(letter) {
  switch (letter) {
  case 'A': case 'X': return 1;
  case 'B': case 'Y': return 2;
  case 'C': case 'Z': return 3;
  }
}
function whoBeatLetter(letter) {
  switch (letter) {
    case "X":
      return "C";
    case "Y":
      return "A";
    case "Z":
      return "B";
    case "B":
      return "X";
    case "C":
      return "Y";
    case "A":
      return "Z";
  }
}

function whoLoseLetter(letter) {
  switch (letter) {
    case "X":
      return "B";
    case "Y":
      return "C";
    case "Z":
      return "A";
    case "C":
      return "X";
    case "A":
      return "Y";
    case "B":
      return "Z";
  }
}
