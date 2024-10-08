const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID:{type:String,default:""},
  only:{type:Boolean,default:false},
  date:{type:Number,default:Date.now()},
  type:{type:String,default:"Girilmedi!"},
  password:{type:String,default:undefined},
  passwordRenewalDate:{type:Number,default:Date.now()},
});

module.exports = model("musteri", schema);
