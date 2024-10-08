const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {ID} = require("../../../../Global/Config/Guild").Guild
const {EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,AttachmentBuilder} = require("discord.js")
const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");
const coinDB = require("../../../../Global/Database/SystemDB/coin")
var size = 0;
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class findTheFullChest extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {
  //  if(message.member.id == "852927097433358408") { message.delete()}
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
if(message.channel.id !=channels.chatChannel) return;
size++;
if(size == 150){
    const tıklakazan = new ActionRowBuilder({components:[new ButtonBuilder().setCustomId("tiklakazan").setLabel("Tıkla!").setEmoji(await emojiBul("appEmoji_elmas")).setStyle(ButtonStyle.Secondary)]})
    message.channel.send({components:[tıklakazan],embeds:[new GenerateEmbed(message,client).setImage("https://cdn.discordapp.com/attachments/1011397607685374033/1061407355423703110/tklakazan.png")]}).then(async msg =>{
    const collector = msg.createMessageComponentCollector({ time: 10000 });
    var tkBasanlar = [];
    collector.on('collect', async (i) => {
    const sayi = await Math.floor(Math.random()*2);
    if(tkBasanlar.includes(i.user.id)) return i.reply({content:`**Bu oyundan elendiniz. Sırada ki oyunda bol şans**`,ephemeral:true})
    if (i.customId == "tiklakazan") {
    if(sayi == 1){
    const coin = await Math.floor(Math.random()*500);
    i.reply({content:`**Tebrikler, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})  
    await coinDB.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin,gameSize:1}},{upsert:true}) 
    if (msg) await msg.delete()
    tkBasanlar = [];
    } else {
        tkBasanlar.push(i.user.id)
        i.reply({embeds:[new GenerateEmbed(message,client).setImage("https://cdn.discordapp.com/attachments/1011397607685374033/1061409527850872913/1061388565247967374.gif")],ephemeral:true})
    }
    }
    })
    collector.on("end", async (collected, reason) => {
        if (reason === "time") {
            tkBasanlar = [];
          if (msg) await msg.delete()
        }
      });
    })

} else if (size == 300){
    size = 0;
    const satirBir = new ActionRowBuilder({components:[
        new ButtonBuilder().setCustomId("1").setEmoji(await emojiBul("appEmoji_bir")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("2").setEmoji(await emojiBul("appEmoji_iki")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("3").setEmoji(await emojiBul("appEmoji_uc")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("4").setEmoji(await emojiBul("appEmoji_dort")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("5").setEmoji(await emojiBul("appEmoji_bes")).setStyle(ButtonStyle.Secondary),
    ]})
     message.channel.send({components:[satirBir],embeds:[new GenerateEmbed(message,client).setImage("https://media.discordapp.net/attachments/1209999331223142462/1213430307521568768/dolusandik.png")]})
     .then(async msg => {
     const sayi = await Math.floor(Math.random()*6);;
     const collector = msg.createMessageComponentCollector({ time: 10000 });
     var dkbBasanlar = [];
     collector.on('collect', async (i) => {
        if(dkbBasanlar.includes(i.user.id)) return i.reply({content:`**Bu oyundan elendiniz. Sırada ki oyunda bol şans!**`,ephemeral:true})
        if (i.customId == `${sayi}`) {
        const coin = await Math.floor(Math.random()*1000);
        i.reply({content:`**Tebrikler doğru kasayı buldun, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})    
        await coinDB.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin,gameSize:1}},{upsert:true}) 
        if (msg) await msg.delete()
        dkbBasanlar = [];
        } else {
            dkbBasanlar.push(i.user.id)
        i.reply({embeds:[new GenerateEmbed(message,client).setImage("https://cdn.discordapp.com/attachments/1011397607685374033/1061409527850872913/1061388565247967374.gif")],ephemeral:true})
        }
        })
        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
                dkbBasanlar = [];
              if (msg) await msg.delete()
            }
          });
     })
}
}
    }
}    


module.exports = findTheFullChest;
