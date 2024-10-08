const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  coinSystem:{type:Boolean, default:false}
});

module.exports = model("Approval-GuildCoinSystem", schema);
