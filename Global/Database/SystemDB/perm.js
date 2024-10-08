const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-perms", mongoose.Schema({
    guildID: { type: String, default: "" },
    perms:{type:Array,default:[]}
}));