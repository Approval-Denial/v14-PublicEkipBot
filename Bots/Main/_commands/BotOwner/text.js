
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Text extends Command {
    constructor(client) {
        super(client, {
            name: "text",
            description: "Bot ile mesaj göndermek için",
            usage: ".text (metin/embed)",
            category: "Approval",
            aliases: ["yaz"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    if(args[0] != "metin" && args[0] != "embed") return message.reply({content:"göndermek istediğiniz mesajın türünü seçiniz (metin/embed)"})
   if(args[0]== "metin"){
    message.channel.send({content:`${args.splice(1).join(" ")}`})
   }
   if(args[0]== "embed"){
    message.channel.send({embeds:[new GenerateEmbed().setDescription(`${args.splice(1).join(" ")}`)]})
   }
}
}
module.exports = Text;