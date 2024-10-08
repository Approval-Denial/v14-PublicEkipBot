const { Schema, model } = require("mongoose");
const { TodaysDate } = require("../../../Functions/TodaysDate");
let nowDate = TodaysDate()

const schema = Schema({
  guildID: {type:String,default:undefined},
  userID: {type:String,default:undefined},
  date: {type:String,default:nowDate},
  total: {type:Number,default:0},
});

module.exports = model("message_user_date", schema);