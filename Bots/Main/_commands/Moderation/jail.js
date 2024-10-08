
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const ms = require("ms");
const jail = require("../../../../Global/Database/penaltyDB/jail");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Jail extends Command {
    constructor(client) {
        super(client, {
            name: "Jail",
            description: "ID'si girilen kullanıcıyı süreli bir şekilde sunucunun metin ve ses kanallarından uzaklaştırır.",
            usage: ".jail @Approval/ID <süre> <sebep>",
            category: "Moderation",
            aliases: ["jail","cezali","cezalı"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.jailedStaffRole].some(x=> message.member.roles.cache.has(x))){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.ReturnReply("member not specified")
    if (member.user.bot) return message.ReturnReply("its a bot")
    if (!member.manageable) return message.ReturnReply("insufficient authorization")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization")
    var sure = args[1]
    if(!sure || !ms(sure)) return  message.ReturnReply("No duration specified")
    sure = ms(sure)
    let mutesure = args[1].replace(`s`, " Saniye").replace(`m`, " Dakika").replace(`h`, " Saat").replace(`d`, " Gün").replace(`w`, " Hafta")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "JAIL" && x.Punished == member.id && x.Finished == false)).length > 0
    if(cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunduğu için uzaklaştırma işlemi yapılamaz.`})
    await infraction(
        message.member,
        member,
        "JAIL",
        reason,
        sure,
        message
        
      );

} else return message.ReturnReply("Cannot use command")
}
}
module.exports = Jail;