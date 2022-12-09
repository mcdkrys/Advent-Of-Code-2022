const fs = require("fs");

class Mark {
  name;
  position = {
    x: 0,
    y: 0,
  };
  /**
   * @type {Mark}
   */
  follower;

  visitedPositions = [];

  constructor(name, x, y, follower) {
    this.name = name;
    this.changePosition(x,y)
    this.follower = follower;
  }

  move(direction, step) {
    while (step > 0) {
      let oldPosition = { x: this.position.x, y: this.position.y };
      switch (direction) {
        case "U":
          this.position.y--;
          break;
        case "R":
          this.position.x++;
          break;
        case "D":
          this.position.y++;
          break;
        case "L":
          this.position.x--;
          break;
      }
      this.addVisit(this.position.x,this.position.y)
      if (!this.checkFollowerInArea()) {
        this.follower.changePosition(oldPosition.x,oldPosition.y)
      }
      step--;
    }
  }

  changePosition(x,y) {
    this.position.x = x;
    this.position.y = y;
    this.addVisit(x,y)
  }

  addVisit(x,y) {
    if(this.visitedPositions.find(a=>a[0] == x && a[1] == y)) return;
    this.visitedPositions.push([x,y])
  }
  checkFollowerInArea() {
    return (
      this.follower.position.x >= this.position.x - 1 &&
      this.follower.position.x <= this.position.x + 1 &&
      this.follower.position.y >= this.position.y - 1 &&
      this.follower.position.y <= this.position.y + 1
    );
  }
}

const s = new Mark("s", 0, 0);
const T = new Mark("T", 0, 0);
const H = new Mark("H", 0, 0, T);


const file = fs
  .readFileSync("./day9/input.txt", "utf-8")
  .split("\r\n")
  .forEach((line) => {
    let direction = line.split(" ")[0];
    let step = line.split(" ")[1];
    H.move(direction,step);
});

console.log(T.visitedPositions.length);