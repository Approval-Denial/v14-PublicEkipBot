const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const CoinDB = require("../../../../Global/Database/SystemDB/coin.js")
const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class coin extends Command {
    constructor(client) {
        super(client, {
            name: "coin",
            description: "hm",
            usage: ".coin (@Approval/ID)",
            category: "Economy",
            aliases: ["coin","param"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
    if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));
    const member = message.member
    const coin = message.guild.findReaction(Coin)

    var data = await CoinDB.findOne({guildID:message.guild.id,userID:member.id})
    if(!data) await CoinDB.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,profilOlusturma:Date.now(),hakkimda:"Girilmedi",evlilik:false,evlendigi:undefined,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
    data = await CoinDB.findOne({guildID:message.guild.id,userID:member.id})
    message.reply({content:`**Şuanda __${data.coin}__ ${coin} Coin'in bulunuyor. **`})
} else return message.ReturnReply("This system is closed");
}
}
module.exports = coin;