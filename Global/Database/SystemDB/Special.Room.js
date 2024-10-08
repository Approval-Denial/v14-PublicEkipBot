const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-specialRoom", mongoose.Schema({
    guildID: { type: String, default: "" },
    only:{type:Boolean,default:false},
    date:{type:Number,default:Date.now()},
    cateogryID: { type: String, default: undefined },
    channelID: { type: String, default: undefined },
}));