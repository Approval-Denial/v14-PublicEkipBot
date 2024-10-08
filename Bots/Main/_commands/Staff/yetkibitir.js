const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const yetkiliyapdb = require("../../../../Global/Database/SystemDB/yetkiliyap")
const yetkiliyapstaffdb = require("../../../../Global/Database/SystemDB/yetkiliyap.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Yetkibitir extends Command {
    constructor(client) {
        super(client, {
            name: "Yetkibitir",
            description: "Yetkili data siler.",
            usage: ".Yetkibitir",
            category: "Staff",
            aliases: ["Yetkibitir","yetkikaldır","yetkibitir","yetkisil"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms,...roles.üstYönetimPerms].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!member) return message.ReturnReply("member not specified")
    let roller = await member.roles.cache.filter(x=> x.id != message.guild.id && [...roles.manRoles,...roles.womanRoles,roles.boosterRole].some(y=> y == x.id)).map(x=> `${x.id}`);
    await member.roles.set(roller)
    await guildAutoStaffdb.deleteMany({userID: member.user.id, guildID: message.guild.id})
    message.reply({content:`${member} Kullanıcısının yetkileri başarı ile alındı`})
    }else return message.ReturnReply("Cannot use command")
  }
}
module.exports = Yetkibitir;