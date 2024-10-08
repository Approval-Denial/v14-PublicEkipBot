const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  only:{type:Boolean,default:false},
  Type:{type:String,default:undefined},
  Tag:{type:String,default:undefined},
  unTag:{type:String,default:undefined},
  nameTags:{type:Array,default:[]},
  NumberTag:{type:String,default:undefined},
  tagRol:{type:String,default:undefined},
  tagLog:{type:String,default:undefined},
});

module.exports = model("Approval-GuildTag", schema);
