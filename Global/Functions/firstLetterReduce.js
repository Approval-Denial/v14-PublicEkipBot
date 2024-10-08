
function firstLetterReduce(content){
    const firstLetter = content.charAt(0).toLowerCase();
    const result = firstLetter + content.slice(1);
    return result
}

module.exports = {firstLetterReduce}