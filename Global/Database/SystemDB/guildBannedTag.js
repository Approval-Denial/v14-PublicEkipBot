const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  only:{type:Boolean,default:false},
  symbolTags:{type:Array,default:[]},
  labelTags:{type:Array,default:[]},
  members:{type:Array,default:[]}
});

module.exports = model("Approval-GuildBannedTag", schema);
