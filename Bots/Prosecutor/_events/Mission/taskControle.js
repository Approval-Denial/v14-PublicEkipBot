const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild");
const mission = require("../../../../Global/Database/mission/mission");
const aktiveTask = require("../../../../Global/Database/mission/aktiveTask");
const { Events: { ClientReady } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class taskControle extends Event {
  constructor(client) {
    super(client, {
      name: ClientReady,
      enabled: true,
    });
  }

  async onLoad() {
    const guild = await client.guilds.cache.get(Guild.ID);
    const TaskLog = await guild.channels.cache.find(x => x.name === "görev-log");
    setTimeout(async () => {
      const tasks = await aktiveTask.find({ guildID: guild.id });
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (Date.now() > (task.startTime + task.time)) {
          await mission.findOneAndUpdate({ guildID: guild.id, userID: task.userID }, { $push: { failedMissions: { name: task.name, date: Date.now() } } }, { upsert: true })
          await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: task.userID }, { upsert: true })
          if (TaskLog) await TaskLog.send({ content: `<@${task.userID}>, "${task.name}" isimli görevinin zamanı dolduğu için iptal edildi.` })
        }
      }
    }, 60000);
  }
}

module.exports = taskControle;