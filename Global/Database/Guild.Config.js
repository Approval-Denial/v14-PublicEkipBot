const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  only:{type:Boolean, default:false},
  registerCommands:{type:Boolean, default:true},
  moderationCommands:{type:Boolean, default:true},
  statisticsCommands:{type:Boolean, default:true},
  globalCommands:{type:Boolean, default:true},
  slashCommands:{type:Boolean, default:true},

});

module.exports = model("Approval-GuildConfig", schema);
