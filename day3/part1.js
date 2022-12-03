const fs = require("fs");

const file = fs.readFileSync("./day3/input.txt", "utf-8").split("\r\n").map((val) => {
    var value1 = val.slice(0,val.length/2)
    var value2 = val.slice(val.length/2,val.length)

    return value1.split("").map(letter => value2.search(letter) != -1 && letter).find((item) => typeof item === "string")
}).map(item => item == item.toUpperCase() ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96);

console.log(file.reduce((previous,current) => previous + current,0))