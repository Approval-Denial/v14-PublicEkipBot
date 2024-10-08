const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  kurucuPerms:{type:Array, default:[]},
  üstYönetimPerms:{type:Array, default:[]},
  ortaYönetimPerms:{type:Array, default:[]},
  altYönetimPerms:{type:Array, default:[]},
  unregisterRoles:{type:Array, default:[]},
  manRoles:{type:Array, default:[]},
  womanRoles:{type:Array, default:[]},
  boosterRole:{type:String, default:undefined},
  botCommandsRole:{type:String, default:undefined},
  registerStaffRole:{type:Array, default:undefined},
  banStaffRole:{type:Array, default:undefined},
  jailedStaffRole:{type:Array, default:undefined},
  chatMuteStaffRole:{type:Array, default:undefined},
  voiceMuteStaffRole:{type:Array, default:undefined},
  suspectRole:{type:String, default:undefined},
  bannedTagRole:{type:String, default:undefined},
  jailedRole:{type:String, default:undefined},
  botRole:{type:String, default:undefined},
  chatMutedRole:{type:String, default:undefined},
  voiceMutedRole:{type:String, default:undefined},
});

module.exports = model("Approval-GuildRolesConfig", schema);
