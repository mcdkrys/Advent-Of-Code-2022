const fs = require("fs");

const file = fs.readFileSync("./day3/input.txt", "utf-8").split("\r\n").map((value,index,arr) => {
    if(index%3!=0) return undefined

    const value1 = value.split("");
    const value2 = arr[index+1];
    const value3 = arr[index+2];

    return value1.map(letter => value2.search(letter) != -1 && letter).map(letter => value3.search(letter) != -1 && letter).find((item) => typeof item === "string")

}).filter(item => item !== undefined).map(item => item == item.toUpperCase() ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96)

console.log(file.reduce((previous,current) => previous + current,0))