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
}

const Trees = [];

const file = fs.readFileSync("./day8/input.txt", "utf-8").replace(/(\r\n|\n|\r)/gm, "").split("").forEach((TreeHeight,index) => {
    let tree = new Tree(TreeHeight,index%5,Math.floor(index/5));
    Trees.push(tree);
    if(tree.Position.x>0) tree.setupDirection(1,Trees[index-1])
    if(tree.Position.y>0) tree.setupDirection(0,Trees[index-5])
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

function checkHeight(tree1,tree2) {
    return tree1?.Height < tree2?.Height
}


console.log(Trees.map(tree=>tree.checkVisible() ? 1 : 0).reduce((a,b)=>a+b))