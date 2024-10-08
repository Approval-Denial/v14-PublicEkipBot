
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")

const CoinDb = require("../../../../Global/Database/SystemDB/coin")

const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class SlotGame extends Command {
    constructor(client) {
        super(client, {
            name: "slot",
            description: "Slot",
            usage: ".Slot <1-50.000>",
            category: "Economy",
            aliases: ["Slot","s","slot"],
            cooldown:15,
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
const slot = [
  message.guild.findReaction(Kalp),
  message.guild.findReaction(Kiraz),
  message.guild.findReaction(Patlican)
] 
  
    let betCoin = Number(args[0])
    if(!betCoin || !Number(args[0])) return message.reply({content:`Kaç coin ile oynamak istiyorsun ?`})
    if(betCoin >= 50000) return message.reply({content:"50.000 coinden fazla bir coin ile oyun oynamayazsın"})
  
  
    let slotEmoji = message.guild.findReaction(Slot)
    let boskutu = message.guild.emojis.cache.find(x=> x.name == "appEmoji_boskutu")
    let yukaricizgi = message.guild.emojis.cache.find(x=> x.name == "appEmoji_yukarcizgi");
    let mainslot1 = slot[Math.floor(Math.random() * slot.length)];
    let mainslot2 = slot[Math.floor(Math.random() * slot.length)];
    let mainslot3 = slot[Math.floor(Math.random() * slot.length)];
    const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");

const messageMemberCoinData = await CoinDb.findOne({guildID:message.guild.id,userID:message.member.id})
if(!messageMemberCoinData) await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,profilOlusturma:Date.now(),hakkimda:"Girilmedi",evlilik:false,evlendigi:undefined,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
if(messageMemberCoinData.coin < betCoin) return message.reply({content:`Bu miktarla oynayabilmek için **${betCoin - messageMemberCoinData.coin}\`** daha coine ihtiyacın var.`}) 

let slotMessage = await message.channel.send({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${slotEmoji}${slotEmoji}${slotEmoji}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}`})
  
  setTimeout(() => {
  if(mainslot1 === mainslot2 && mainslot1 === mainslot3 ) {
  let carpma = betCoin * 2
  messageMemberCoinData.coin = (messageMemberCoinData.coin + carpma)
  messageMemberCoinData.gameSize = messageMemberCoinData.gameSize +1
  messageMemberCoinData.save();
  slotMessage.edit({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${mainslot1}${mainslot2}${mainslot3}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
**Tebrikler ${message.member.displayName}, ${carpma} Coin ${coin} Kazandın!**`})
  } else {
  messageMemberCoinData.coin = (messageMemberCoinData.coin - betCoin)
  messageMemberCoinData.gameSize = messageMemberCoinData.gameSize +1
  messageMemberCoinData.save();
  slotMessage.edit({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${mainslot1}${mainslot2}${mainslot3}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
**Üzgünüm... \`${message.member.displayName}\`, Kaybettin!**`})
  }
  }, 2500)
  
}else return message.ReturnReply("This system is closed");
 
}
}
module.exports = SlotGame;