const cameraOpenedAt = require("../../../../Global/Database/Stats/Camera/cameraOpenedAt");
const streamOpenedAt = require("../../../../Global/Database/Stats/Streamer/streamOpenedAt");
const voiceJoinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt");
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Events: { VoiceStateUpdate } } = require("discord.js")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
let ignoreUsers = [
  "1242903716713992315", "570859865782747136", "559744533626224650", "571955290962919476", "826383943178649620", "1243950828608557217", "1143709135104376832", "1142432875430555679", "1242860634937491486", "564394689973714974", "574365939882000426", "551016690696192013", "1241816798278717562", "1143185729179107428", "1241683868772208652", "1244223827035295856", "1244227578533904476", "1111663934508912790", "852641969242898443"
]

class VoiceStateUpdates extends Event {
  constructor(client) {
    super(client, {
      name: VoiceStateUpdate,
      enabled: true,
    });
  }
 
  async onLoad(oldState, newState) {
    const guild = oldState.guild;
    const member = newState.member;
    /************************************************/
    /* BOT                                          */
    /************************************************/

    if (oldState.member.user.bot || newState.member.user.bot || ignoreUsers.some(x=> x == member.id)) return;

    /************************************************/
    /* AFK                                          */
    /************************************************/

    if (guild.afkChannelId && !oldState.channelId && newState.channelId && newState.channelId === guild.afkChannelId) return;

    if (guild.afkChannelId && oldState.channelId && !newState.channelId && oldState.channelId === guild.afkChannelId) return;

    /************************************************/
    /* Join Channel                                 */
    /************************************************/

    if (!oldState.channelId && newState.channelId) {
      if(["1250864384952242370","1250863947444129792"].some(x=> member.roles.cache.has(x))) return await member.voice.disconnect();

      await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
      if (newState.streaming) await streamOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });

      if (newState.selfVideo) await cameraOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });

      if (newState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)))) return;
    };

    /************************************************/
    /* Leave Channel                                */
    /************************************************/

    if (oldState.channelId && !newState.channelId) {
      await saveStats("voice", member, oldState.channel)
      if (oldState.streaming) await saveStats("streamer", member, oldState.channel)

      if (oldState.selfVideo) await saveStats("camera", member, oldState.channel)

      if (oldState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)))) return;
    };

    /************************************************/
    /* Switch Channel                               */
    /************************************************/

    if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
      await saveStats("voice", member, oldState.channelId)
      if (oldState.streaming && !newState.streaming) await saveStats("streamer", member, oldState.channel)
      if (!oldState.streaming && newState.streaming) await streamOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
      if (oldState.selfVideo && !newState.selfVideo)  await saveStats("camera", member, oldState.channel)
      if (!oldState.selfVideo && newState.selfVideo) await cameraOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
      if ((oldState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)))) && !(newState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000))))) return;
      if (!(oldState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)))) && (newState.member.user.createdAt > (new Date(Date.now() - (14 * 24 * 60 * 60 * 1000))))) return;
    };

    /************************************************/
    /* Stream Camera Deaf Mute                      */
    /************************************************/

    if (oldState.channelId && newState.channelId && oldState.channelId === newState.channelId) {
      
      if (oldState.streaming && !newState.streaming) await saveStats("streamer", member, oldState.channel)
      if (!oldState.streaming && newState.streaming) await streamOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });

      if (oldState.selfVideo && !newState.selfVideo)  await saveStats("camera", member, oldState.channel)
      if (!oldState.selfVideo && newState.selfVideo) await cameraOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
    };

  }
}
module.exports = VoiceStateUpdates;


