const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID:String,
  firsTask:Date,
  firstBadgename:String,
  firstBadgedate:Date,
  badges:Array,
  failedMissions:Array,
  completedTask:Array,
});

module.exports = model("rozetligorev", schema);
