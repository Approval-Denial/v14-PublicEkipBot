const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  banUse: { type: Number, default: 0 },
  jailUse: { type: Number, default: 0 },
  muteUse: { type: Number, default: 0 },
  vmuteUse: { type: Number, default: 0 },

  staffUse: { type: Number, default: 0 }
});

module.exports = model("moderasyon", schema);