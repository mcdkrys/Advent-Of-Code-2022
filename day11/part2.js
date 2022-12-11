const fs = require("fs");

/**
 * @type {Monkey[]}
 */
const Monkeys = [];


class Content {
  base;
  operations=[]

  constructor(item) {
    this.base=item
  }

  multiply(value) {
    this.operations.push({
      mode:"*",
      value:value
    })
  }

  add(value) {
    this.operations.push({
      mode:"+",
      value:value
    })
  }

  getMod(mod) {
    var currentMod = this.base % 19;
    this.operations.forEach(val => {

      switch(val.mode) {
        case "*":
          currentMod = (currentMod % mod * val.value % mod) % mod;
        break;
        case "+":
          currentMod = (currentMod % mod + val.value % mod) % mod;
        break;
      }

    })
    return currentMod;
  }

}

class Monkey {
  Backpack = [];
  Operation = "";
  Test = [];
  inspectedItems=0;

  constructor(Operation, Test, Items) {
    Items.forEach((Item) => {
      this.Backpack.push(new Content(Item));
    });
    this.Operation = Operation;
    this.Test = Test;
  }

doOperation = async () => {
    while(this.Backpack.length) {
        this.inspectedItems++;

        let old = this.Backpack.shift();
        let operation = this.Operation.split("= ")[1].split(" ");
        let value2 = operation[2] == "old" ? old.getMod(parseInt(this.Test[0].split("by ")[1])) : parseInt(operation[2])

        switch(operation[1]) {
          case "+":
              old.add(value2)
            break;
          case "*":
              old.multiply(value2)
            break;
        }

        this.test(old).then((val) => {
            Monkeys[val].Backpack.push(old);
        }).catch((val) => {
            Monkeys[val].Backpack.push(old);
        })
    }
  };

  test = (value) => {
    return new Promise((resolve, reject) =>
      value.getMod(parseInt(this.Test[0].split("by ")[1])) === 0
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
        console.log(Monkeys.map(monkey => monkey.inspectedItems)) // .sort((a,b) => b-a))
    }
}

Operation()


/*setTimeout(()=> {
  let inspects = Monkeys.map(monkey => monkey.inspectedItems).sort((a,b) => b-a)
  let answer = inspects.shift() * inspects.shift();
  console.log(answer)
},1000)
*/