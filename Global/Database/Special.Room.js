const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  only : {type:Boolean,default:false},
  channelID:{type:String,default:undefined},
  date: { type: Number, default: Date.now() },
  lastEntry: { type: Number, default: Date.now() },
});

module.exports = model("special-room-user", schema);