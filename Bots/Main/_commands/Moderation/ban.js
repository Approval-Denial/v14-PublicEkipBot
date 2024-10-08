
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
class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "Ban",
            description: "ID'si girilen kullanıcıyı sunucudan yasaklar.",
            usage: ".ban @Approval/ID",
            category: "Moderation",
            aliases: ["yasakla","ban","sik","uçur","ucur"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.ReturnReply("member not specified")
    if (member.user.bot) return message.ReturnReply("its a bot")
    if (!member.manageable) return message.ReturnReply("insufficient authorization")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization")
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"BAN"}}},{upsert:true})
    await message.guild.members.ban(member.id, {reason:`${message.member.user.tag} Tarafından Yasaklandı!`})
    await message.reply({content:`${member.id}" ID'li kullanıcı, "__${reason == "Sebep Girilmedi." ? "** **":`${reason} sebebiyle`}__" sunucudan yasaklandı!`})
    if(channels.bannedLog !=undefined && message.guild.channels.cache.get(channels.bannedLog)) message.guild.channels.cache.get(channels.bannedLog)
    .send({embeds:[new GenerateEmbed().setDescription(`${member} (\`${member.id}\`) Sunucudan Yasaklandı!

Cezanın Detayları:
#${ceza + 1}
- Yetkili: ${message.member} (\`${message.member.user.tag}\`)
- Kullanıcı: ${member} (\`${member.id}\`)
- İşlem: Yasaklama (Ban)
- Tarih: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
- Sebep: ${reason}`)]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,banned:1},$push:{bans:{Punished:member.id, SentencingDate:Date.now(), Type:"BAN", Reason:reason}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:25}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
} else return message.ReturnReply("Cannot use command")
}
}
module.exports = Ban;