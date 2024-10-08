const { Schema, model } = require("mongoose");

const schema = Schema({
  commandName: { type: String, default: undefined },
  onlyChannels: { type: Array, default: [] },
  onlyRoles: { type: Array, default: [] },
});

module.exports = model("commandsetting", schema);