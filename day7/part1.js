const fs = require("fs");

class Directory {
    path;
    parent;
    directories = [];
    files = [];

    constructor(path,parent) {
        this.path = path;
        if(parent) this.parent = parent;
    }

    addDirectory = (dir) => {
        return this.directories.push(new Directory(dir,this))
    }

    findDirectory = (dir) => {
        return this.directories.find(item=> item.path==dir )
    }

    addFile = (file,filesize) => {
        return this.files.push({
            name:file,
            size:filesize
        })
    }

    getFilesize = () => {
        var filesize = 0
        this.directories.forEach(value => filesize += value.getFilesize())
        this.files.forEach(value =>filesize += parseInt(value.size))
        return filesize
    }
}

const firstDirectory = new Directory("/")
const directories = [firstDirectory];
var selected = firstDirectory;

const dir = {
};

var path = ""

const file = fs
  .readFileSync("./day7/input.txt", "utf-8")
  .split("\r\n")
  .forEach((value) => {
    const values = value.split(" ");
    pathSet = dir;
    switch (values[0]) {
      case "$":
        switch (values[1]) {
        case "cd":
            values[2] == "/" ? selected = firstDirectory  : values[2] == ".." ? selected = selected.parent : selected = selected.findDirectory(values[2]);
            break;
          case "ls":
        }
        break;
      case "dir":
            selected.addDirectory(values[1])
            let dir = selected.directories[selected.directories.length-1]
            if(!directories.find(val => val.path==dir.path)) directories.push(dir)
        break;
        default:
            selected.addFile(values[1],values[0])
    }
});

var answer = 0;

directories.forEach(item=> {
    console.log(item.path,item.getFilesize())
    if(item.getFilesize()<=100000) answer+=item.getFilesize();
})

console.log(answer)

