const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  userID:String,
  bans:{type:Array, default:[]},
  banned:{type:Number, default:0},
  unban:{type:Number,default:0},
  limit:{type:Number,default:0},
});

module.exports = model("Approval-ban", schema);
