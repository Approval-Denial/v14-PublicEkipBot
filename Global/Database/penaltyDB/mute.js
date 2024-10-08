const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  userID:String,
  mutes:{type:Array, default:[]},
  mute:{type:Number, default:0},
  unmute:{type:Number,default:0},
  limit:{type:Number,default:0},
});

module.exports = model("Approval-mute", schema);
