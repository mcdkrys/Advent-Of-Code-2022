const fs = require("fs");

/**
 * @type {Monkey[]}
 */
const Monkeys = [];

class Backpack {
  Items = [];

  add(Item) {
    this.Items.push(Item);
  }
}

class Monkey {
  Backpack = new Backpack();
  Operation = "";
  Test = [];
  inspectedItems=0;

  constructor(Operation, Test, Items) {
    Items.forEach((Item) => {
      this.Backpack.add(Item);
    });
    this.Operation = Operation;
    this.Test = Test;
  }

doOperation = async () => {
    while(this.Backpack.Items.length>0) {
        let old = this.Backpack.Items.shift();
        let value =  Math.floor(eval(this.Operation.split("= ")[1]) / 3);
        this.inspectedItems++;
        this.test(value).then((val) => {
            let monkey = Monkeys[val];
            monkey.Backpack.add(value);
        }).catch((val) => {
            let monkey = Monkeys[val];
            monkey.Backpack.add(value);
        })
    }
  };

  test = (value) => {
    return new Promise((resolve, reject) =>
      value % parseInt(this.Test[0].split("by ")[1]) === 0
        ? resolve(parseInt(this.Test[1].split("monkey ")[1]))
        : reject(parseInt(this.Test[2].split("monkey ")[1]))
    );
  };
}


const file = fs
  .readFileSync("./day11/input.txt", "utf-8")
  .split("Monkey")
  .map((val) =>
    val
      .split("\r\n")
      .map((val) => {
        let values = val.split(": ");
        return [values[0].replace(/\s/g, ""), values[1]];
      })
      .filter((a) => a[1] != undefined)
  )
  .filter((a) => a.length != 0)
  .forEach((value) => {
    let startingItems = value[0][1].split(",").map((val) => parseInt(val));
    let Operation = value[1][1].replace("new", "value");
    let Test = value[2][1];
    let True = value[3][1];
    let False = value[4][1];
    let monkey = new Monkey(Operation, [Test, True, False], startingItems);
    Monkeys.push(monkey);
  });


async function Operation() {
    for (let index = 0; index < 20; index++) {
        for await (const monkey of Monkeys) {
        monkey.doOperation()
        }
    }
}

Operation()


setTimeout(()=> {
  let inspects = Monkeys.map(monkey => monkey.inspectedItems).sort((a,b) => b-a)
  let answer = inspects.shift() * inspects.shift();
  console.log(answer)
},1000)
