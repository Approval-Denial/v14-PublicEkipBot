const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  userID:String,
  jails:{type:Array, default:[]},
  jail:{type:Number, default:0},
  unjail:{type:Number,default:0},
  limit:{type:Number,default:0},
});

module.exports = model("Approval-jail", schema);
