const fs = require("fs");

const file = fs.readFileSync("./day6/input.txt", "utf-8")

var count = 0;

const chars = () => file.slice(count,count+4)

while ((/([a-zA-Z]).*?\1/).test(chars())) {
    count++
}

console.log("Answer: " + (count + 4));

