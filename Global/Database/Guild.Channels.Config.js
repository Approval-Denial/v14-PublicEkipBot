const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  welcomeChannel: {type:String, default:undefined},
  suspectLog: {type:String, default:undefined},
  chatChannel: {type:String, default:undefined},
  jailedLog: {type:String, default:undefined},
  bannedLog: {type:String, default:undefined},
  cMutedLog: {type:String, default:undefined},
  vMutedLog: {type:String, default:undefined},
  inviteLog: {type:String, default:undefined},
  penaltyPointsLog: {type:String, default:undefined},
});

module.exports = model("Approval-GuildChannelsConfig", schema);
