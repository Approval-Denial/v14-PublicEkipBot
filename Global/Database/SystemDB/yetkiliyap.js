const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-yetkiliyap", mongoose.Schema({
    guildID: { type: String, default: "" },
    only:{type:Boolean,default:false},
    userID: { type: String, default: "" },
    Staff: { type: String, default: "" },
    Date:{type:Number,default:Date.now()},
    count:{type:Number,default:0},
}));