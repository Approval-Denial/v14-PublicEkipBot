const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-yetkiliyap-staff", mongoose.Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    users:{type:Array,default:[]},
    count:{type:Number,default:0}
}));