const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const chalk = require('chalk')
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const joinedAt = require("../../../../Global/Database/SystemDB/voiceJoinedAt");
const { Events: { VoiceStateUpdate } } = require("discord.js")
const GuildRolesConfig = require("../../../../Global/Database/Guild.Roles.Config");
const Guild = require("../../../../Global/Config/Guild");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class MissionsVoice extends Event {
  constructor(client) {
    super(client, {
      name: VoiceStateUpdate,
      enabled: true,
    });
  }

  async onLoad(oldState, newState) {

    const roles = await GuildRolesConfig.findOne({ guildID: Guild.Guild.ID })

    if ((roles.unregisterRoles && (roles.unregisterRoles.some(x => oldState.member.roles.cache.has(x)) || roles.unregisterRoles.some(x => newState.member.roles.cache.has(x))))
      || (roles.bannedTagRole && (oldState.member.roles.cache.has(roles.bannedTagRole) || newState.member.roles.cache.has(roles.bannedTagRole)))
      || (roles.jailedRole && (oldState.member.roles.cache.has(roles.jailedRole) && newState.member.roles.cache.has(roles.jailedRole)))
      || (roles.suspectRole && (oldState.member.roles.cache.has(roles.suspectRole) || newState.member.roles.cache.has(roles.suspectRole)))) return;
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    let missionsystemdb = await missionsystem.findOne({ guildID: oldState.guild.id });
    let mission_system = missionsystemdb ? missionsystemdb.only : false;
    if (mission_system == true) {

      var guildAutoStaff = await guildAutoStaffdb.findOne({ guildID: oldState.guild.id, userID: oldState.id })
      const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
      if (authorityStatus == true) {

        if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
        let joinedAtData = await joinedAt.findOne({ userID: oldState.id });
        if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
        joinedAtData = await joinedAt.findOne({ userID: oldState.id });
        const data = Date.now() - joinedAtData.date;
        if (oldState.channelId && !newState.channelId) {
          await missionsystem.findOneAndUpdate({ guildID: oldState.guild.id, userID: oldState.id }, { $inc: { voiceTask: data } }, { upsert: true });
          await missionsControled(oldState.id, oldState.guild.id, "Ses")
          await joinedAt.deleteOne({ userID: oldState.id });
        } else if (oldState.channelId && newState.channelId) {
          await missionsystem.findOneAndUpdate({ guildID: oldState.guild.id, userID: oldState.id }, { $inc: { voiceTask: data } }, { upsert: true });
          await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
          await missionsControled(oldState.id, oldState.guild.id, "Ses")
        }
      }
    }
  }
}
module.exports = MissionsVoice;
