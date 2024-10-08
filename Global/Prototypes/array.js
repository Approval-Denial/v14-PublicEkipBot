Array.prototype.edit = function (type,value) {
if(type == "Remove") {
let arr = removeToID(value,this)
} 
if(type == "Add") {
    this.push(value)
}
}

function removeToID(ID,Array){
    const index = Array.indexOf(ID);
    if(index !== -1){
      arr.splice(index,1)
    }
    return Array
  }