function firstLetterEnlargement(content){
    const firstLetter = content.charAt(0).toUpperCase();
    const result = firstLetter + content.slice(1);
    return result
}
module.exports = {firstLetterEnlargement}