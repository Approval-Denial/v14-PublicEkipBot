
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")

const CoinDb = require("../../../../Global/Database/SystemDB/coin")

const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class yaziTrua extends Command {
    constructor(client) {
        super(client, {
            name: "yazitura",
            description: "yaziTrua",
            usage: ".yazitura <1-50.000>",
            category: "Economy",
            aliases: ["yazitura","yt"],
            cooldown:15,
            enabled: true,
            });
    }
async onRequest (client, message, args,embed) {
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
let betCoin = Number(args[0])
if(!betCoin || !Number(args[0])) return message.reply({content:`Kaç coin ile oynamak istiyorsun ?`})
if(betCoin >= 50000) return message.reply({content:"50.000 coinden fazla bir coin ile oyun oynamayazsın"})
    const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");

const messageMemberCoinData = await CoinDb.findOne({guildID:message.guild.id,userID:message.member.id})
if(!messageMemberCoinData) await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,profilOlusturma:Date.now(),hakkimda:"Girilmedi",evlilik:false,evlendigi:undefined,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
if(messageMemberCoinData.coin < betCoin) return message.reply({content:`Bu miktarla oynayabilmek için **${betCoin - messageMemberCoinData.coin}\`** daha coine ihtiyacın var.`}) 
await message.channel.send({
  components:[
    new ActionRowBuilder()
    .setComponents(
      new ButtonBuilder().setCustomId("yazi").setLabel("Yazı").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("tura").setLabel("Tura").setStyle(ButtonStyle.Secondary),
    )
  ],
  content:`${coin} ${message.member}, Coinini 2'ye katlamak için yazı mı ?, tura mı ? sorusuna cevap vermelisin!
**
Yazı mı ? 
Tura mı ?
**`}).then(async msg => {
  var filter = (button) => button.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
  collector.on('collect', async (inter) => {
    await inter.deferUpdate()
    const ihtimaller = ["yazi","tura"];
    const sonuc = await ihtimaller[Number(Math.floor(Math.random()*2))];
  const secim = inter.customId;
  inter.channel.send({content:`${message.member}, **Para Fırlatıldı!**`}).then(async sonucMSG=> {
  if(msg) await msg.delete();
  setTimeout(async() => {
   if(secim == sonuc){
    await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:(betCoin*2),gameSize:1}},{upsert:true})
    await sonucMSG.edit({content:`**${secim} Çıktı, ${message.member} ${(betCoin*2)} Coin ${coin} kazandın!**`})
   } else {
    await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:(-betCoin),gameSize:1}},{upsert:true})
    sonucMSG.edit({content:`**Üzgünüm ${message.member}, ${sonuc} Çıktı ve ${betCoin} Adet Coin ${coin} kaybettin!**`})
   }
  }, 3000);
  })
  })
})
}else return message.ReturnReply("This system is closed");
 
}
}
module.exports = yaziTrua;