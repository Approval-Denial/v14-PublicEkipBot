const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceGuild = require("../../../../Global/Database/Stats/Voice/voiceGuild");
const voiceGuildCamera = require("../../../../Global/Database/Stats/Camera/voiceGuildCamera");
const voiceGuildStream = require("../../../../Global/Database/Stats/Streamer/voiceGuildStream");
const voiceCameraUser = require("../../../../Global/Database/Stats/Camera/voiceCameraUser");
const voiceStreamerUser = require("../../../../Global/Database/Stats/Streamer/voiceStreamerUser");
const momen = require("moment")
require("moment-timezone")
require("moment-duration-format")
const { Events: { ClientReady } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class statReset extends Event {
    constructor(client) {
        super(client, {
            name: ClientReady,
            enabled: true,
        });    
    }    

 async   onLoad() {
const guild = client.guilds.cache.get(Guild.ID)
const channel = guild.channels.cache.find(x=> x.name == "stats-log");
const dailyStatReset = new CronJob('0 0 * * *', async () => {
  await messageGuild.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await voiceGuild.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await voiceGuildCamera.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await voiceGuildStream.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  
  await voiceStreamerUser.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await voiceCameraUser.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await messageUser.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });
  await voiceUser.updateMany({ guildID: guild.id }, { $set: { dailyStat: 0 } });

  if (channel) {
    await channel.send(`**__Daily__ stats reset.\nDate: \`${new Date().toLocaleDateString('tr-TR')}\`**`);
  }
}, null, true, 'Europe/Istanbul');
await dailyStatReset.start();

const weeklyStatReset = new CronJob("00 00 * * 0", async () => {
  await messageGuild.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceGuild.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceGuildCamera.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceGuildStream.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceStreamerUser.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceCameraUser.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await messageUser.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  await voiceUser.updateMany({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
  
  if(channel) await channel.send({content:`** __Weekly__ stats reset.\nDate: \`${new Date(Date.now()).toTurkishFormatDate()}\`**`})

}, null, true, "Europe/Istanbul")
await weeklyStatReset.start();
const monthlyStatReset = new CronJob("* * 01 * *", async () => {
  await messageGuild.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuild.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuildCamera.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuildStream.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceStreamerUser.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceCameraUser.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await messageUser.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  await voiceUser.updateMany({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
  if(channel) await channel.send({content:`** __Monthly__ stats reset.\nDate: \`${new Date(Date.now()).toTurkishFormatDate()}\`**`})
}, null, true, "Europe/Istanbul")
await monthlyStatReset.start();

    }
}    
module.exports = statReset;
