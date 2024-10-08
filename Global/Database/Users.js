const mongoose = require('mongoose');

const Users = mongoose.model("Users", new mongoose.Schema({
    userID: String,
    TeyitNo: Number,
    Teyitler: { type: Array, default: [] },
    Registrant: Object,
    Inviter: Object,
    AfkStatus: Object,
    Names: { type: Array, default: [] },
    xp: Number,
    lvl: Number,
    xpToLvl: Number,
    renk: String,
    resim: String,
    saydamlik: String
}));

module.exports = Users