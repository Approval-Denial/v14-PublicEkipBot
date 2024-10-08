
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class unBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "ID'si girilen kullanıcının yasağını kaldırır.",
            usage: ".unban ID",
            category: "Moderation",
            aliases: ["bankaldir","bankaldır"],

            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
      const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `${hata}`

        const hataEmbed =  new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
    const id = args[0];
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    if(!id) return  message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Yasağını kaldırmak istediğiniz kullanıcının ID'sini girmeniz gerekiyor.`)]}).destroyMessage();
    if(!message.guild.bans.cache.find(x=> x.user.id == id)) return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} ID'si girilen kullanıcının yasağı bulunamadı.`)]}).destroyMessage();
    if(message.guild.bans.cache.find(x=> x.user.id == id)) {
    const cezaId = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:id,  cezaId: cezaId+1}, {$set:{penaltys:{Staff:message.member.id, Punished:id, SentencingDate:Date.now(),Reason:reason, type:"UNBAN"}}},{upsert:true})
    await message.guild.members.unban(id, {reason:`Yasak ${message.member.user.tag} Tarafından Kaldırıldı!`})
    await message.reply({content:`"${id}" ID'li kullanıcının  ${reason == "Sebep Girilmedi." ? "** **":`${reason} sebebiyle olan`}  sunucu yasağı kaldırıldı!`})
    if(channels.bannedLog !=undefined && message.guild.channels.cache.get(channels.bannedLog)) message.guild.channels.cache.get(channels.bannedLog)
    .send({embeds:[
        embed
        .setTitle(`#${cezaId+1} Numaralı Yeni Ceza`)
        .setDescription(`#${cezaId + 1} Numaralı Cezanın Detayları:
- Yetkili: ${message.member} (\`${message.member.user.tag} - ${message.member.id}\`)
- Kullanıcı: <@${id}> (\`${id}\`)
- İşlem: Yasak Kaldırma (Unban)
- Tarih: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
- Sebep: ${reason}`)
    ]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unban:1},$push:{bans:{Punished:id, SentencingDate:Date.now(), Type:"UNBAN", Reason:reason }}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:id}, {$inc:{cezapuan:-25}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**<@${id}> Ceza puanın güncellendi!** Mevcut ceza puanın: **${cezapuandata ? cezapuandata.cezapuan : 0}**    `})
    }
} else return message.ReturnReply("Cannot use command")
}
}
module.exports = unBan;