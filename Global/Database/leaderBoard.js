const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  channelID:{type:String},
  only:{type:Boolean},
  MessageBoardID:{type:String},
  VoiceBoardID:{type:String},
});

module.exports = model("leaderBoard", schema);
