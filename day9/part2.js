const fs = require("fs");

class Position {
  x = 0;
  y = 0;

  constructor() {}

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
  }

  diff(position) {
    return [this.x-position.x,this.y-position.y]
  }
}

class Mark {
  name;
  oldPosition = new Position();
  position = new Position();
  /**
   * @type {Mark}
   */
  follower;
  visitedPositions = [];

  constructor(name, x, y, follower) {
    this.name = name;
    this.setPosition(x,y);
    this.follower = follower;
  }

  moveStep(direction, step) {
    while (step > 0) {
      this.oldPosition.set(this.position.x, this.position.y);
      if(direction=='U') this.addPosition(0, -1);
      else if(direction=='R') this.addPosition(1, 0);
      else if(direction=='D') this.addPosition(0, 1);
      else if(direction=='L') this.addPosition(-1, 0);
      else if(direction=='UR') this.addPosition(1, -1);
      else if(direction=='UL') this.addPosition(-1, -1);
      else if(direction=='DR') this.addPosition(1, 1);
      else if(direction=='DL') this.addPosition(-1, 1);

      step--;
    }
  }

  addVisit(x,y) {
    if(this.visitedPositions.find(a=>a[0] == x && a[1] == y)) return;
    this.visitedPositions.push([x,y])
  }

  addPosition(x,y) {
    this.oldPosition.set(this.position.x,this.position.y);
    this.position.add(x,y);
    this.addVisit(this.position.x,this.position.y);
    if(!this.follower) return;
    let dif = this.position.diff(this.follower.position)
    console.log(dif)
    this.checkMove(2,0,"R")
    this.checkMove(-2,0,"L")
    this.checkMove(2,0,"R")
    this.checkMove(2,0,"R")
    var direction="";
    if(dif[0]==2)
    if(dif[0]==2 && dif[1]==0) this.follower.moveStep("R",1);
    else if(dif[0]==0 && dif[1]==2) this.follower.moveStep("D",1);
    else if(dif[0]==-2 && dif[1]==0) this.follower.moveStep("L",1);
    else if(dif[0]==0 && dif[1]==-2) this.follower.moveStep("U",1);

    else if(dif[0]==1 && dif[1]==2) this.follower.moveStep("U",1);
    else if(dif[0]==1 && dif[1]==-2) this.follower.moveStep("D",1);

    else if(dif[0]==-1 && dif[1]==2) this.follower.moveStep("U",1);
    else if(dif[0]=-1 && dif[1]==-2) this.follower.moveStep("D",1);

    else if(dif[0]==2 && dif[1]==-1) this.follower.moveStep("R",1);
    else if(dif[0]=-2 && dif[1]==1) this.follower.moveStep("L",1);

    else if(dif[0]==-2 && dif[1]==-1) this.follower.moveStep("L",1);
    else if(dif[0]=-2 && dif[1]==1) this.follower.moveStep("R",1);

    else if(dif[0]==2 && dif[1]==2) this.follower.moveStep("DR",1);
    else if(dif[0]=2 && dif[1]==-2) this.follower.moveStep("UR",1);
    else if(dif[0]==-2 && dif[1]==2) this.follower.moveStep("DL",1);
    else if(dif[0]=-2 && dif[1]==-2) this.follower.moveStep("UL",1);
  }

  checkMove(x,y,direction) {
    let dif = this.position.diff(this.follower.position)
    if (dif[0]==x && dif[1]==y) this.follower.moveStep(direction,1);
  }
  setPosition(x,y) {
    this.oldPosition.set(this.position.x,this.position.y);
    this.position.set(x,y);
    this.addVisit(x,y);
  }


  checkFollowerInArea() {
    if (this.follower) return false;
    return (
      this.follower.position.x >= this.position.x - 1 &&
      this.follower.position.x <= this.position.x + 1 &&
      this.follower.position.y >= this.position.y - 1 &&
      this.follower.position.y <= this.position.y + 1
    );
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
    H.moveStep(direction, step);
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

var text = "";

for (let y = -12; y < 20; y++) {
  text += "\n";
  for (let x = -12; x < 20; x++) {
    if (H.visitedPositions.find((val) => val[0] == x && val[1] == y))
      text += "#";
    else text += ".";
  }
}

var text2 = "";

for (let y = -12; y < 20; y++) {
  text2 += "\n";
  for (let x = -12; x < 20; x++) {
    if (T1.visitedPositions.find((val) => val[0] == x && val[1] == y))
      text2 += "#";
    else text2 += ".";
  }
}

console.log(text);
console.log(text2);