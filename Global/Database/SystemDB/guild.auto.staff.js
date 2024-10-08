const mongoose = require('mongoose');

const autostaff = mongoose.model("approval-guildAutoStaff", mongoose.Schema({
    guildID:{type:String,default:""},
    userID:{type:String,default:""},
    startingdate:{type:Number,default:Date.now()},
    staffID:{type:String,default:""},
    staffRank:{type:Number,default:1},
    authorityStatus:{type:Boolean,default:false},
    AMP:{type:Number,default:0},
}))

module.exports = autostaff;