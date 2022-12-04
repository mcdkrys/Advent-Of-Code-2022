const fs = require("fs");

const file = fs.readFileSync("./day4/input.txt", "utf-8").split("\r\n").map((val) => {
    const values = val.split(",").map(val => val.split("-").map(num=>parseInt(num)));
    return (checkRange(values[0][0],values[1]) && checkRange(values[0][1],values[1]) || checkRange(values[1][0],values[0]) && checkRange(values[1][1],values[0]))
}).map(val => val ? 1 : 0)

console.log("Answer:" + file.reduce((prev,cur)=> prev+cur))

function checkRange(number,rangeArray) {
    return rangeArray[0]<=number && number<=rangeArray[1];
}

