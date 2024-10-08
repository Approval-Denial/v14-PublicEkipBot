
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const vmute = require("../../../../Global/Database/penaltyDB/vmute")
const ms = require("ms");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class VoiceUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "V-unmute",
            description: "ID'si girilen kullanıcının metin kanallarındaki susturmasını açar.",
            usage: ".vunmute @Approval/ID",
            category: "Moderation",
            aliases: ["unvmute","vunmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.voiceMuteStaffRole].some(x=> message.member.roles.cache.has(x))){
        const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``

    const hataEmbed =  new GenerateEmbed()
    .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
    .setColor("Red")
    .setFooter({text: "Developed By Luppux | Hata olduğunu düşünüyorsan geliştirici ile iletişime geç!", iconURL: message.guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})});
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  message.ReturnReply("member not specified")
    if (member.user.bot) return message.ReturnReply("its a bot")
    if (!member.manageable) return message.ReturnReply("insufficient authorization")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "VOICE-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0 ? true : false
    if(((roles && roles.voiceMutedRole) && !member.roles.cache.has(roles.voiceMutedRole) ) || (cezakontrol === false) ) return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} **${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`)]}).destroyMessage();
    if(member.voice.mute == false) return message.reply({content:`**${member.user.tag}** Ses kanallarında susturması bulunamadı.`})
      await unInfraction(message.guild,member,message.member,reason,"VOICE-MUTE",message.reply({content:`${member} Kullanıcısının **SesMute** kaldırıldı`}))
} else return message.ReturnReply("Cannot use command")
}
}
module.exports = VoiceUnMute;