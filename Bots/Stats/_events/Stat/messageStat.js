const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Events: { MessageCreate } } = require("discord.js")

const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageUserDate = require("../../../../Global/Database/Stats/Message/messageUserDate")
const levels = require("../../../../Global/Database/level")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild")
const guildChannel = require("../../../../Global/Database/Stats/Message/messageGuildChannel")
const userChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel")
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system")
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis");
const { TodaysDate } = require("../../../../Global/Functions/TodaysDate");

class messageCreate extends Event {
  constructor(client) {
    super(client, {
      name: MessageCreate,
      enabled: true,
    });
  }

  async onLoad(message) {

    const statSystemControl = await guildSystemConfig.findOne({ guildID: message.guild.id });
    var ControlStats = statSystemControl ? statSystemControl.statSystem : false;
    if (ControlStats == true) {
      if (message.author.bot || (roles.unregisterRoles && roles.unregisterRoles.some(x => message.member.roles.cache.has(x))) || (roles.bannedTagRole && message.member.roles.cache.has(roles.bannedTagRole)) || (roles.jailedRole && message.member.roles.cache.has(roles.jailedRole)) || (roles.suspectRole && message.member.roles.cache.has(roles.suspectRole))) return;
      const todaysDate = TodaysDate()
      await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1, totalStat: 1, lastMessage: 1 } }, { upsert: true });
      await messageUserDate.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id, date: todaysDate }, { $inc: { totalStat: 1 } }, { upsert: true });
      await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1, totalStat: 1 } }, { upsert: true });
      await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
      await userChannel.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
      const verilicekroller = [
        { role: "1251456011936727081", point: 50 },
        { role: "1251456016122642444", point: 100 },
        { role: "1251456019993989201", point: 500 },
        { role: "1251456023957602385", point: 2000 },
        { role: "1251456027702853745", point: 5000 },
      ];
      
      const user = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
      const totalMessage = user ? user.lastMessage : 0;
      
      for (let i = 0; i < verilicekroller.length; i++) {
        const verilenrol = verilicekroller[i];
        if (totalMessage == verilenrol.point) {
          let eskirol = verilicekroller.slice(i + 1).map(x => x.role);
      
          if (eskirol.length > 0) {
            await message.member.roles.remove(eskirol).catch(() => { });
          }
          setTimeout(async () => {
            await message.member.roles.add(verilenrol.role).catch(() => { });
            message.guild.channels.cache.get("1254179617024245840").send({
              content: `${message.author}, **${verilenrol.point}** mesajı geçtiği için **${message.guild.roles.cache.get(verilenrol.role).name}** rolünü kazandı!`
            });
          }, 2000);
                    break;
        }
      }
      
 
    } else {
      undefined;
    }
  }
}
module.exports = messageCreate;


