const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  InviteSystem:{type:Boolean, default:false}
});

module.exports = model("Approval-GuildInviteSystem", schema);
