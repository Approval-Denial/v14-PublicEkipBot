const { Schema, model } = require("mongoose");

const schema = Schema({
  userID: String,
  date: { type: Number, default: 0 },
});

module.exports = model("voiceJoinedAtMissions", schema);
