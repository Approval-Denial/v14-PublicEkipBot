const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  levelSystem:{type:Boolean, default:false},
});

module.exports = model("Approval-GuildLevelSystem", schema);
