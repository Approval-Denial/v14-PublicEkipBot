const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-afk", mongoose.Schema({
    guildID: { type: String, default: "" },
    only:{type:Boolean,default:false},
    userID: { type: String, default: "" },
    date:{type:Number,default:Date.now()},
    reason:{type:String,default:"Sebep Yok!"},
}));