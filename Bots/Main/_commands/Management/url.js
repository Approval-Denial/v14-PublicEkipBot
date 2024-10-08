const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class UrlS extends Command {
    constructor(client) {
        super(client, {
            name: "Url",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".Url",
            category: "Management",
            aliases: ["Url","url"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
        message.guild.fetchVanityData().then(res => {
    let Embedcik = new GenerateEmbed().setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})}).setDescription(`Sunucu özel daveti: **${res.code}** Kullanımı : **${res.uses}**`)
        message.reply({embeds:[Embedcik] }) })      
    

    } else return message.ReturnReply("Cannot use command")
}
}
module.exports = UrlS;

