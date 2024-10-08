const mongoose = require('mongoose');
module.exports =  mongoose.model("approval-coin", mongoose.Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    coin: { type: Number, default: 0 },
    beklemeSuresi: { type: Number, default: Date.now() },
    gameSize:{type:Number,default:0},
    profilOlusturma:{type:Number,default:Date.now()},
    hakkimda:{type:String,default:"Girilmedi!"},
    evlilik:{type:Boolean,default:false},
    evlendigi:{type:String,default:""},
    dailyCoinDate:{type:Number,default:Date.now()},
    profilArkaPlan:{type:String,default:""},
    rozetSeviyesi:{type:String,default:""},
}));