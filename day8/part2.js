const fs = require("fs");

class Tree {
    Visible = true;
    Height;
    Position={x:0,y:0};
    Directions= {}; //Top-Left-Bottom-Right

    constructor(height,x,y) {
        this.Height = height;
        this.Position.x = x;
        this.Position.y = y;
    }

    setupDirection(direction,tree) {
        this.Directions[directionToString(direction)] = {
            tree:tree,
            visibility: tree.Height<this.Height
        };
        tree.Directions[directionToString((direction+2)%4)] = {
            tree:this,
            visibility: tree.Height>=this.Height
        };;
    }

    getScore() {
        let topVisibility = this.checkScore("Top")
        let leftVisibility = this.checkScore("Left")
        let bottomVisibility = this.checkScore("Bottom")
        let rightVisibility =   this.checkScore("Right")
        
        
        return topVisibility*leftVisibility*bottomVisibility*rightVisibility
    }

    checkVisible() {
        let topVisibility = this.checkVisibility("Top")
        let leftVisibility = this.checkVisibility("Left")
        let bottomVisibility = this.checkVisibility("Bottom")
        let rightVisibility =   this.checkVisibility("Right")
        
        
        return topVisibility||leftVisibility||bottomVisibility||rightVisibility
    }

    checkVisibility(direction) {
        if(!this.Directions[direction]) return true
        var tree=this.Directions[direction].tree;

        while(this.Height>tree.Height) {
            if(!tree.Directions[direction]) return true;
            tree=tree.Directions[direction].tree;
            
        }
        return false;
    }

    checkScore(direction) {
        var count=1;
        if(!this.Directions[direction]) return true
        var tree=this.Directions[direction].tree;

        while(this.Height>tree.Height) {
            if(!tree.Directions[direction]) return count;
            tree=tree.Directions[direction].tree;
            count++;
            
        }

        return count;
    }
}

const file = fs.readFileSync("./day8/input.txt", "utf-8")
const Trees = [];
const maxX = file.split("\r\n")[0].length
const maxY = file.split("\r\n").length


file.replace(/(\r\n|\n|\r)/gm, "").split("").forEach((TreeHeight,index) => {
    let tree = new Tree(TreeHeight,index%maxX,Math.floor(index/maxY));
    Trees.push(tree);
    if(tree.Position.x>0) tree.setupDirection(1,Trees[index-1])
    if(tree.Position.y>0) tree.setupDirection(0,Trees[index-maxX])
})

function directionToString(direction) {
    switch(direction) {
        case 0: return "Top";
        case 1: return "Left";
        case 2: return "Bottom";
        case 3: return "Right";
        default: return null;
    }
}


console.log(Math.max.apply(null,Trees.map(tree=>tree.getScore())))