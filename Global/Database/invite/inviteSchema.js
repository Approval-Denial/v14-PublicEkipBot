const mongoose = require('mongoose');

const invitesSchema = mongoose.Schema({
    guildID: String,
    userID: String,
    total: { type: Number, default: 0 },
    regular: { type: Number, default: 0 },
    leave: { type: Number, default: 0 },
    fake: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    inviter: { type: String, default: null },

})

module.exports = mongoose.model('Approval_Invite', invitesSchema);