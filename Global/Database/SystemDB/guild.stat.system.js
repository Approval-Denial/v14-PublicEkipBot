const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  statSystem:{type:Boolean, default:false}
});

module.exports = model("Approval-GuildStatSystem", schema);
