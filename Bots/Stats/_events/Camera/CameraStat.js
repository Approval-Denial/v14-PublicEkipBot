const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const cameraOpenedAt = require("../../../../Global/Database/Stats/Camera/cameraOpenedAt");
const GuildRolesConfig = require("../../../../Global/Database/Guild.Roles.Config");
const Guild = require("../../../../Global/Config/Guild");
const { Events: { VoiceStateUpdate } } = require("discord.js")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis");
const { taskProgress } = require("../../../../Global/Functions/taskProgress");
class CameraStat extends Event {
  constructor(client) {
    super(client, {
      name: VoiceStateUpdate,
      enabled: false,
    });
  }

  async onLoad(oldState, newState) {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if ((roles.unregisterRoles && (roles && (roles.unregisterRoles.some(x => oldState.member.roles.cache.has(x)) || roles.unregisterRoles.some(x => newState.member.roles.cache.has(x)))))
      || (roles && roles.bannedTagRole && (oldState.member.roles.cache.has(roles.bannedTagRole) || newState.member.roles.cache.has(roles.bannedTagRole)))
      || (roles && roles.jailedRole && (oldState.member.roles.cache.has(roles.jailedRole) && newState.member.roles.cache.has(roles.jailedRole)))
      || (roles && roles.suspectRole && (oldState.member.roles.cache.has(roles.suspectRole) || newState.member.roles.cache.has(roles.suspectRole)))) return;
    const statSystemControl = await guildSystemConfig.findOne({ guildID: oldState.guild.id });
    var kontrol = statSystemControl ? statSystemControl.statSystem : false;
    const roles = await GuildRolesConfig.findOne({ guildID: Guild.Guild.ID })
    if (kontrol == true) {

      if ((oldState.member?.voice?.selfVideo == false && newState.member.voice.selfVideo == true)) {
        await cameraOpenedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
      }
      if ((oldState.member?.voice?.selfVideo == true && newState.member.voice.selfVideo == false)) {
        let cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: oldState.id });
        if (!cameraOpenedAtData) {
          await cameraOpenedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
          cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: oldState.id });
        }
        const data = Date.now() - cameraOpenedAtData.date;
        await saveStats("camera", oldState, oldState.channel, data);
        await taskProgress(oldState.member, "C-Streamer", data);
        await cameraOpenedAt.findOneAndDelete({ userID: oldState.id }, { upsert: true });
      }
    } else {
      return undefined;
    }

  }
}


module.exports = CameraStat;
