function editArray(x, y) {
    const index = x.indexOf(y)


    if(index == -1){
        x.replace(index, 1)
        return x
    }
    return x
}
module.exports = {editArray}