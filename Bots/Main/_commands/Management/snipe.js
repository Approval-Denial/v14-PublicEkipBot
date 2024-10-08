
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const snipe =  require("../../../../Global/Database/snipe")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Snipe extends Command {
    constructor(client) {
        super(client, {
            name: "Snipe",
            description: "Son silinen mesaj hakkında bilgi verir.",
            usage: ".snipe",
            category: "Management",
            aliases: ["snipe"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    
const SnipeData = await snipe.findOne({guildID:message.guild.id})
if(!SnipeData) return message.reply({content:"Son silinen mesaj bulunamadı!"})
let mesaj = SnipeData ? SnipeData.deletedMessage : "Bulunamadı.";
let tarih = SnipeData ? (SnipeData.deletedMessageDate/1000).toFixed() : "Bulunamadı.";
let silen = SnipeData ? SnipeData.userID :"Bulunamadı";
if(silen == message.member.id) {
message.reply({embeds:[new GenerateEmbed().setDescription(`**<t:${tarih}:R> sildiğin mesaj: ${mesaj}**`)]})
} else {
message.channel.send({embeds:[new GenerateEmbed().setDescription(`<@${silen}>, kullanıcısının **<t:${tarih}:R> sildiği mesaj: ${mesaj}** `)]})
}
}
}
module.exports = Snipe;