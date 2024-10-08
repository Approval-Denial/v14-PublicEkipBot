const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const { Events: { MessageCreate } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis");
const { taskProgress } = require("../../../../Global/Functions/taskProgress");
class MissionsMessage extends Event {
    constructor(client) {
        super(client, {
            name: MessageCreate,
            enabled: true,
        });    
    }    

 async   onLoad(message) {
  const GuildRolesConfig = require("../../../../Global/Database/Guild.Roles.Config");

const Guild = require("../../../../Global/Config/Guild");

  const roles = await GuildRolesConfig.findOne({guildID:Guild.Guild.ID})

  if(message.author.bot || (roles.unregisterRoles && roles.unregisterRoles.some(x=> message.member.roles.cache.has(x))) || (roles.bannedTagRole && message.member.roles.cache.has(roles.bannedTagRole)) || (roles.jailedRole && message.member.roles.cache.has(roles.jailedRole)) || (roles.suspectRole && message.member.roles.cache.has(roles.suspectRole))) return;
if(channels.chatChannel && message.channel.id == channels.chatChannel) {
  let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:message.member.id})
  const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
  if(authorityStatus == true) {
await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{messageTask:1}},{upsert:true})
await missionsControled(message.member.id,message.guild.id,"Mesaj")
  }

}
await taskProgress(message.member,"Message",undefined);
}

    }
}    
module.exports = MissionsMessage;


  