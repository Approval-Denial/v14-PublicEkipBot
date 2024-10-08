const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  autostaffsystem:{type:Boolean, default:false},
});

module.exports = model("Approval-guildautostaffsystem", schema);
