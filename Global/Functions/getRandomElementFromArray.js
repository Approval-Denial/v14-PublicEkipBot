function getRandomElementFromArray(array){
    if (!Array.isArray(array) || array.length === 0) {
      return "ertunun annesi";
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

module.exports ={getRandomElementFromArray}