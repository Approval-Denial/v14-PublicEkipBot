const mongoose = require('mongoose');

const Snipe = mongoose.model("approval-snipe", mongoose.Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    deletedMessage:{type:String,default:"Bulunamadı."},
    deletedMessageDate:{type:Number,default:Date.now()},
    deletedMessageAttachement:{type:String,default:null}
}))

module.exports = Snipe;