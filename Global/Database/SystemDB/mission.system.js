const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-mission_system", mongoose.Schema({
    guildID: { type: String, default: "" },
    only:{type:Boolean,default:false},
    userID: { type: String, default: "" },
    voiceTask: { type: Number, default: 0 },
    messageTask: { type: Number, default: 0 },
    registrationTask : { type: Number, default: 0 },
    InviteTask: { type: Number, default: 0 },
    tagInviteTask: { type: Number, default: 0 },
    StaffInviteTask: { type: Number, default: 0 },
}));