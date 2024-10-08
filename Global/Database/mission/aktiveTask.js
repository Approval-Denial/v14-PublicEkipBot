const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID:String,
  startTime:Number,
  category:String,
  time:Number,
  reward:Number,
  ID:String,
  value:String,
  Point:Number,
  name:String,
  progress:Number,
  completed:Boolean
});

module.exports = model("aktiveTask", schema);
