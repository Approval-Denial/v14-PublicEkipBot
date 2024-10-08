const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID:{type:String,default:undefined},
  banning:{type:String,default:undefined},
  date:{type:Number,default:Date.now()},
});

module.exports = model("bannedOnBot", schema);