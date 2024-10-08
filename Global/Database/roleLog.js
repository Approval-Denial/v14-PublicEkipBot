const mongoose = require("mongoose");

const schema = mongoose.model('aUser', new mongoose.Schema({
    _id: String,
    Roles: { type: Array }
}))
module.exports = schema;