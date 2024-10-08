const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  channelID: String,
  channelName:String,
  dailyStat: { type: Number, default: 0 },
  weeklyStat: { type: Number, default: 0 },
  twoWeeklyStat: { type: Number, default: 0 },
  totalStat: { type: Number, default: 0 },
});

module.exports = model("voiceStreamUser", schema);
