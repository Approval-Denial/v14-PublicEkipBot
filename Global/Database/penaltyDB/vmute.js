const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  userID:String,
  vmutes:{type:Array, default:[]},
  vmute:{type:Number, default:0},
  unvmute:{type:Number,default:0},
  limit:{type:Number,default:0},
});

module.exports = model("Approval-vmute", schema);
