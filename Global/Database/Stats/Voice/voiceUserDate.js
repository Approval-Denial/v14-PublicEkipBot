const { Schema, model } = require("mongoose");
const { TodaysDate } = require("../../../Functions/TodaysDate");
let nowDate = TodaysDate()
const schema = Schema({
  guildID: String,
  userID: String,
  totalStat: { type: Number, default: 0 },
  date: {type:String,default:nowDate},

});

module.exports = model("voiceUserDate", schema);