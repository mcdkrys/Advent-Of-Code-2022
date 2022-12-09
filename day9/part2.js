const fs = require("fs");

class Position {
  x=0;
  y=0;

  constructor () {
  }

  set(x,y) {
    this.x = x;
    this.y = y;
  }

  add(x,y) {
    this.x += x;
    this.y += y;
  }
}

class Mark {
  name;
  oldPosition = new Position()
  position = new Position();
  /**
   * @type {Mark}
   */
  follower;
  visitedPositions = [];

  constructor(name, x, y, follower) {
    this.name = name;
    this.addVisit(x,y)
    this.position.set(x,y)
    this.follower = follower;
  }

  moveStep(direction, step) {
    while (step > 0) {
      this.oldPosition.set(this.position.x,this.position.y)
      switch (direction) {
        case "U":
          this.addPosition(0,-1);
          break;
        case "R":
          this.addPosition(1,0);
          break;
        case "D":
          this.addPosition(0,1);
          break;
        case "L":
          this.addPosition(-1,0);
          break;
      }
      this.moveFollower(this.oldPosition.x,this.oldPosition.y)
      step--;
    }
  }

  addPosition(x,y) {
    this.oldPosition.set(this.position.x,this.position.y)
    this.position.add(x,y)
    this.addVisit(this.position.x,this.position.y)
    this.moveFollower(this.oldPosition.x,this.oldPosition.y)
  }

  setPosition(x,y) {
    this.oldPosition.set(this.position.x,this.position.y)
    this.position.set(x,y)
    this.addVisit(x,y)
    this.moveFollower(this.oldPosition.x,this.oldPosition.y)
  }
  

  addVisit(x,y) {
    if(this.visitedPositions.find(a=>a[0] == x && a[1] == y)) return;
    this.visitedPositions.push([x,y])
  }

  moveFollower(x,y) {
    if(!this.follower) return;
    if(this.checkFollowerArea() == "Outside") this.follower.addPosition(this.position.x-x,this.position.y-y)
    else if(this.checkFollowerArea() == "Outside_Cross") this.follower.addPosition(this.position.x-x,this.position.y-y)
  }

  checkFollowerOutArea() {
    if(!this.follower) return;
    return (
      this.follower.position.x < this.position.x - 1 ||
      this.follower.position.x > this.position.x + 1 ||
      this.follower.position.y < this.position.y - 1 ||
      this.follower.position.y > this.position.y + 1
    );
  }

  checkFollowerArea(range) {
    if(!this.follower) return;
    let dx = this.position.x-this.follower.position.x;
    let dy = this.position.y-this.follower.position.y;
    let fx = this.follower.position.x >= this.position.x - 1 && this.follower.position.x <= this.position.x + 1
    let fy = this.follower.position.y >= this.position.y - 1 && this.follower.position.y <= this.position.y + 1
    if(!fx || !fy) {
      return (dx>=1&&dy>=1) ? "Outside_Cross" : "Outside"
    }
    else return "Inside"
  }
}

const s = new Mark("s", 0, 0);
const T9 = new Mark("9", 0, 0);
const T8 = new Mark("8", 0, 0, T9);
const T7 = new Mark("7", 0, 0, T8);
const T6 = new Mark("6", 0, 0, T7);
const T5 = new Mark("5", 0, 0, T6);
const T4 = new Mark("4", 0, 0, T5);
const T3 = new Mark("3", 0, 0, T4);
const T2 = new Mark("2", 0, 0, T3);
const T1 = new Mark("1", 0, 0, T2);
const H = new Mark("H", 0, 0, T1);


const file = fs
  .readFileSync("./day9/input.txt", "utf-8")
  .split("\r\n")
  .forEach((line) => {
    let direction = line.split(" ")[0];
    let step = parseInt(line.split(" ")[1]);
    H.moveStep(direction,step);
});

function* range(start, stop, step = 1) {
  if (stop == null) {
      // one param defined
      stop = start;
      start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      yield i;
  }
}


  var text=""
  var check=false;

  for (let y = -12; y < 20; y++) {
    text += "\n"
    for (let x = -12; x < 20; x++) {
      if(T1.visitedPositions.find(val => val[0] == x && val[1] == y)) text+="#"
      else
      text += "."
    }
  }
  console.log(text)

