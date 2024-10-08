 function TodaysDate(){
    const moment = require('moment');
    const now = moment();
    const month = now.month() + 1; 
    const day = now.date();
    const year = now.year()
    let nowDate = `${day}.${month}.${year}`;
    return nowDate;
}
module.exports = {TodaysDate}