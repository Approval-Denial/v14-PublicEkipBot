const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  only:{type:Boolean,default:false},
});

module.exports = model("Approval-taglialim", schema);
