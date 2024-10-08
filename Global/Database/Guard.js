const { Schema, model } = require("mongoose");
const Guild = require("../Config/Guild");

const schema = Schema({
  guildID: String,
  database:{type:Boolean, default:false},
  serverGuard:{type:Boolean, default:false},
  rolesGuard:{type:Boolean, default:false},
  channelsGuard:{type:Boolean, default:false},
  banKickGuard:{type:Boolean, default:false},
  emojiStickersGuard:{type:Boolean, default:false},
  UrlSpammer:{type:Boolean, default:false},
  webAndofflineGuard:{type:Boolean, default:false},
  SafedMembers:{type:Array, default:Guild.Guild.Bots.devs},
  serverSafedMembers:{type:Array, default:Guild.Guild.Bots.devs},
  roleSafedMembers:{type:Array, default:Guild.Guild.Bots.devs},
  channelSafedMembers:{type:Array, default:Guild.Guild.Bots.devs},
  banKickSafedMembers:{type:Array, default:Guild.Guild.Bots.devs},
  emojiStickers:{type:Array, default:Guild.Guild.Bots.devs},
});

module.exports = model("Guard", schema);
