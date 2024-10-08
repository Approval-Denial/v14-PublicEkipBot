const { Schema,model } = require("mongoose");
const { TodaysDate } = require("../../../Functions/TodaysDate");
let nowDate = TodaysDate()
const schema = Schema({
  guildID: String,
  userID: String,
  date: {type:String,default:nowDate},
  general: { type: Number, default: 0 },

});

module.exports = model("voiceCameraUserDate", schema);