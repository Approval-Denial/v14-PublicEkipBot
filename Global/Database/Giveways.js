let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cekilis = new Schema({
    messageID: String,
    katilan: Array,
    time: String,
})

module.exports = mongoose.model("cekilis", cekilis)