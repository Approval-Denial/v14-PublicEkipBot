const moment = global.moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder,PermissionsBitField,Intents } = require('discord.js');
const query = require("./Distributors")
const GUILD_ROLES = require("../Database/Backup/Guild.Roles");
const GUILD_CATEGORY = require("../Database/Backup/Guild.Category.Channels");
const GUILD_TEXT = require("../Database/Backup/Guild.Text.Channels");
const GUILD_VOICE = require("../Database/Backup/Guild.Voice.Channels");
const Distributors = global.Distributors = [];
const axios = require("axios");
const Guild = require('../Config/Guild');
const missionSystem = require('../Database/SystemDB/mission.system');
const autostaff = require('../Database/SystemDB/guild.auto.staff');
const guard = require("../Database/Guard");
const voiceUser = require('../Database/Stats/Voice/voiceUser');
const voiceUserDate = require('../Database/Stats/Voice/voiceUserDate');
const voiceGuild = require('../Database/Stats/Voice/voiceGuild');
const voiceGuildChannel = require('../Database/Stats/Voice/voiceGuildChannel');
const voiceUserChannel = require('../Database/Stats/Voice/voiceUserChannel');
const voiceUserParent = require('../Database/Stats/Voice/voiceUserParent');
const voiceCameraUser = require('../Database/Stats/Camera/voiceCameraUser');
const vpiceGuildCameraUserDate = require('../Database/Stats/Camera/vpiceGuildCameraUserDate');
const voiceGuildCamera = require('../Database/Stats/Camera/voiceGuildCamera');
const cameraOpenedAt = require('../Database/Stats/Camera/cameraOpenedAt');
const voiceGuildCameraChannel = require('../Database/Stats/Camera/voiceGuildCameraChannel');
const voiceGuildCameraUserChannel = require('../Database/Stats/Camera/voiceGuildCameraUserChannel');
const voiceStreamerUser = require('../Database/Stats/Streamer/voiceStreamerUser');
const streamOpenedAt = require('../Database/Stats/Streamer/streamOpenedAt');
const voiceGuildStreamUserDate = require('../Database/Stats/Streamer/voiceGuildStreamUserDate');
const voiceGuildStream = require('../Database/Stats/Streamer/voiceGuildStream');
const voiceGuildStreamChannel = require('../Database/Stats/Streamer/voiceGuildStreamChannel');
const voiceGuildStreamUserChannel = require('../Database/Stats/Streamer/voiceGuildStreamUserChannel');
const rolePermissions = require('../Database/rolePermissions');
const aktiveTask = require('../Database/mission/aktiveTask');
const mission = require('../Database/mission/mission');
const cezapuan = require('../Database/penaltyDB/cezapuan');
const mute = require('../Database/penaltyDB/mute');
const penaltys = require('../Database/penaltyDB/penaltys');
const vmute = require('../Database/penaltyDB/vmute');
const voiceJoinedAt = require('../Database/Stats/Voice/voiceJoinedAt');
const { GenerateEmbed } = require('../Structures/Default.Embeds');

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../Config/emojis");
const { taskProgress } = require('../Functions/taskProgress');
const { TodaysDate } = require('../Functions/TodaysDate');

var allBots = global.allBots = [];

let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;
const voice = global.voice = require("@discordjs/voice")


const saveStats = global.saveStats = async function (type,user, channel) {
const todaysDate = TodaysDate()
if(type === "voice") {
  var joinedAtData = await voiceJoinedAt.findOne({ userID: user.id });
  if (!joinedAtData){
  await voiceJoinedAt.findOneAndUpdate({ userID: user.id }, { $set: { date: Date.now() } }, { upsert: true });
  joinedAtData = await voiceJoinedAt.findOne({ userID: user.id });
}
 let data = Date.now() - joinedAtData.date;
  await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  await voiceUserDate.findOneAndUpdate({ guildID: user.guild.id, userID: user.id ,date:todaysDate}, { $inc: { totalStat:data} }, { upsert: true });
  if (channel.parentId) await voiceUserParent.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentId }, { $inc: { parentData: data } }, { upsert: true });
  await taskProgress(user, "Voice", data);
  await voiceJoinedAt.findOneAndDelete({ userID: user.id });
  const verilicekroller2 = [ 
    { role: "1251456040629833801", point: 5 * 60 * 60 * 1000 },
    { role: "1251456045851869215", point: 20 * 60 * 60 * 1000 },
    { role: "1251456084430946325", point: 50 * 60 * 60 * 1000 },
    { role: "1251456090042925181", point: 100 * 60 * 60 * 1000 },
    { role: "1251456095965282305", point: 500 * 60 * 60 * 1000 },
  ];
  
  const userdb = await voiceUser.findOne({ guildID: user.guild.id, userID: user.id });
  const totalVoiceTime = userdb ? userdb.totalStat : 0;
  let verilecekRol = null;
  let kaldirilacakRol = null;
  
  for (let i = 0; i < verilicekroller2.length; i++) {
    const currentRole = verilicekroller2[i];
    const nextRole = verilicekroller2[i + 1];
  
    if (nextRole) {
      if (totalVoiceTime >= currentRole.point && totalVoiceTime < nextRole.point) {
        verilecekRol = currentRole.role;
        if (i > 0) {
          kaldirilacakRol = verilicekroller2[i - 1].role;
        }
        break;
      }
    } else if (totalVoiceTime >= currentRole.point) {
      verilecekRol = currentRole.role;
      if (i > 0) {
        kaldirilacakRol = verilicekroller2[i - 1].role;
      }
    }
  }
  let member = user.guild.members.cache.get(user.id)
  if (kaldirilacakRol && member.roles.cache.has(kaldirilacakRol)) {
    await member.roles.remove(kaldirilacakRol).catch(() => {});
  }
  
  if (verilecekRol && !member.roles.cache.has(verilecekRol)) {
    await member.roles.add(verilecekRol).catch(() => {});
    const rol = verilicekroller2.find(r => r.role === verilecekRol);
    member.guild.channels.cache.get("1254179617024245840").send({
      content: `${member}, **${rol.point / (60 * 60 * 1000)}** saat ses kanalında bulunduğu için **${member.guild.roles.cache.get(rol.role).name}** rolünü kazandı!`
    });
  }
  
  
}
if(type === "camera") {
  var cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: user.id });
  if (!cameraOpenedAtData){
  await cameraOpenedAt.findOneAndUpdate({ userID: user.id }, { $set: { date: Date.now() } }, { upsert: true });
  cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: user.id });
}
let data = Date.now() - cameraOpenedAtData.date;

  await vpiceGuildCameraUserDate.findOneAndUpdate({ guildID: user.guild.id, userID: user.id ,date:todaysDate}, { $inc: {totalStat:data} }, { upsert: true });
  await voiceCameraUser.findOneAndUpdate({ guildID:Guild.Guild.ID, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuildCamera.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildCameraChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceGuildCameraUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  await cameraOpenedAt.findOneAndDelete({ userID: user.id });
  await taskProgress(user, "C-Streamer", data);

}
if(type === "streamer") {
  var streamOpenedAtData = await streamOpenedAt.findOne({ userID: user.id });
  if (!streamOpenedAtData){
  await streamOpenedAt.findOneAndUpdate({ userID: user.id }, { $set: { date: Date.now() } }, { upsert: true });
  streamOpenedAtData = await streamOpenedAt.findOne({ userID: user.id });
}
let data = Date.now() - streamOpenedAtData.date;
  await voiceGuildStreamUserDate.findOneAndUpdate({ guildID: user.guild.id, userID: user.id ,date:todaysDate}, { $inc: {totalStat:data} }, { upsert: true });
  await voiceStreamerUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuildStream.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildStreamChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceGuildStreamUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  await taskProgress(user,"Streamer",data);
  await streamOpenedAt.findOneAndDelete({ userID: user.id });

}
}


const sureCevir = global.sureCevir = function(veri){
  return moment.duration(veri).format("H [Saat], m [dakika]");
}
const sifre = global.sifre = async function() {
  var character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var lengthPsw = 8;
  var randomPsw = '';
  for (var i=0; i < lengthPsw; i++) {
   var numPws = Math.floor(Math.random() * character.length);
   randomPsw += character.substring(numPws,numPws+1);
  }
  return randomPsw
 }
const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY")   
    return tarihci;
};

const createEnum = global.createEnum = function(keys) {
    const obj = {};
    for (const [index, key] of keys.entries()) {
      if (key === null) continue;
      obj[key] = index;
      obj[index] = key;
    }
    return obj;
}
const checkDays = global.checkDays = function(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days === 1 ? " Gün" : " Gün") + " Önce";
}
const rakam = global.rakam = function(sayi,x) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': message.guild.findReaction(Sıfır),
        '1': message.guild.findReaction(bir),
        '2': message.guild.findReaction(İki),
        '3': message.guild.findReaction(Uc),
        '4': message.guild.findReaction(Dört),
        '5': message.guild.findReaction(Beş),
        '6': message.guild.findReaction(Alti),
        '7': message.guild.findReaction(Yedi),
        '8': message.guild.findReaction(Sekiz),
        '9': message.guild.findReaction(Dokuz),
      }
      [d];
    })
  }
  return basamakbir;
}
const sleep = global.sleep = function(ms) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}
const timeTR = global.timeTR = function(value) {
  const days = Math.floor(value / 86400000);
  value = value % 86400000;
  const hours = Math.floor(value / 3600000);
  value = value % 3600000;
  const minutes = Math.floor(value / 60000);
  value = value % 60000;
  const seconds = Math.floor(value / 1000);
  return (days ? days + ' gün' : '') + (hours ? hours + ' saat' : '') + (minutes ? minutes + ' dakika' : '') + (seconds ? seconds + ' saniye' : '')
}
const LeaderBoard = global.LeaderBoard =async function(Guild, Channel, Voice, Message){
  const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../Database/Stats/Message/messageGuild");
const messageGuildChannel = require("../Database/Stats/Message/messageGuildChannel");
const voiceGuild = require("../Database/Stats/Voice/voiceGuild");
const voiceGuildChannel = require("../Database/Stats/Voice/voiceGuildChannel");
const messageUser = require("../Database/Stats/Message/messageUser");
const voiceUser = require("../Database/Stats/Voice/voiceUser");
const messageUsersData = await messageUser.find({ guildID: Guild.id }).sort({ twoWeeklyStat: -1 });
const voiceUsersData = await voiceUser.find({ guildID: Guild.id }).sort({ twoWeeklyStat: -1 });
const messageGuildData = await messageGuild.findOne({ guildID: Guild.id });
const voiceGuildData = await voiceGuild.findOne({ guildID: Guild.id });
const messageUsers = messageUsersData.splice(0, 20).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
const voiceUsers = voiceUsersData.filter(x=> Guild.members.cache.get(x.userID)).splice(0, 20).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\``).join(`\n`);
const mesaj = `
Toplam üye mesajları: \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} mesaj\`

${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}
`

const ses = `
Toplam ses verileri: \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : "Veri Bulunmuyor.").format("H [saat], m [dakika]")}\`

${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}
`
  const kanal = await Guild.channels.cache.get(Channel);
  const Top1 = await kanal.messages.fetch(Voice);
  const Top2 = await kanal.messages.fetch(Message);
  if(Top1) {
    Top1.edit({embeds:[new GenerateEmbed()
      .setAuthor({name:Guild.name + " (Ses)", iconURL: Guild.iconURL()})
      .setDescription(`\`••❯\` Toplam \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : 0).format("H [saat], m [dakika]")}\`

${voiceUsers}`)
.setFooter({text:`Güncelleme Tarihi: ${new Date(Date.now()).toTurkishFormatDate()}`,iconURL:Guild.iconURL()})
]})
  }
  if(Top2) {
    Top2.edit({embeds:[new GenerateEmbed()
      .setAuthor({name:Guild.name+ " (Mesaj)", iconURL: Guild.iconURL()})
      .setDescription(`\`••❯\` Toplam \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} Mesaj\`

${messageUsers}`)
.setFooter({text:`Güncelleme Tarihi: ${new Date(Date.now()).toTurkishFormatDate()}`,iconURL:Guild.iconURL()})
]})
  }
}
const GetBanner = global.GetBanner = async function bannerURL(user, client, rep) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return rep.reply({content:"Banner Bulunamadı."}).then(x=> setTimeout(() => {x.delete()}, 5000))
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)

}
const ytkapa = global.ytkapa = async function(guildID) {
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  sunucu.roles.cache.filter(r => r.editable && (r.permissions.has(PermissionsBitField.Flags.Administrator) || r.permissions.has(PermissionsBitField.Flags.ManageGuild) || r.permissions.has(PermissionsBitField.Flags.ManageRoles) || r.permissions.has(PermissionsBitField.Flags.ManageWebhooks) || r.permissions.has(PermissionsBitField.Flags.BanMembers) || r.permissions.has(PermissionsBitField.Flags.KickMembers)|| r.permissions.has(PermissionsBitField.Flags.ModerateMembers))).forEach(async r => {
    await rolePermissions.findOneAndUpdate({roleID:r.id},{$set:{BitField:new PermissionsBitField(r.permissions.bitfield)}},{upsert:true})
    await r.setPermissions(PermissionsBitField.Flags.SendMessages);
  });
}
const ytçek = global.ytçek = async function(member){
  let roller = await member.roles.cache.filter(r => r.permissions.has(PermissionsBitField.Flags.Administrator) || r.permissions.has(PermissionsBitField.Flags.ManageGuild) || r.permissions.has(PermissionsBitField.Flags.ManageRoles) || r.permissions.has(PermissionsBitField.Flags.ManageWebhooks) || r.permissions.has(PermissionsBitField.Flags.BanMembers) || r.permissions.has(PermissionsBitField.Flags.KickMembers)|| r.permissions.has(PermissionsBitField.Flags.ModerateMembers)).map(z=> z.id)
  await member.roles.remove(roller)
}
const sik = global.sik = async function(guild,kisiID, tur) {
  let uye = guild.members.cache.get(kisiID);
  if (!uye) return;
  if (tur === "am") return guild.members.ban(uye.id,{ reason: "Luppux Server Security" }).catch(err=> console.log(`${uye.user.tag} kişisini yetkim yetmediği için banlıyamadım.`));
};
const guildChannels = global.guildChannels = async function(guild) {
  if (guild) {
      const channels = []
      await guild.channels.cache.forEach(ch => {
          channels.push(ch)
      })
      for (let index = 0; index < channels.length; index++) {
          const channel = channels[index];
          let ChannelPermissions = []
          channel.permissionOverwrites.cache.forEach(perm => {
              ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow.bitfield, deny: "" + perm.deny.bitfield })
          });
          if ((channel.type === 0) || (channel.type === 5)) {
              await GUILD_TEXT.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_TEXT({
                          type:0,
                          channelID: channel.id,
                          name: channel.name,
                          nsfw: channel.nsfw,
                          parentID: channel.parentId,
                          position: channel.position,
                          rateLimit: channel.rateLimitPerUser,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.nsfw = channel.nsfw,
                          kanalYedek.parentID = channel.parentId,
                          kanalYedek.position = channel.position,
                          kanalYedek.rateLimit = channel.rateLimitPerUser,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});;
          }
          if (channel.type === 2) {
              await GUILD_VOICE.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_VOICE({
                          type:2,
                          channelID: channel.id,
                          name: channel.name,
                          bitrate: channel.bitrate,
                          parentID: channel.parentId,
                          position: channel.position,
                          userLimit: channel.userLimit ? channel.userLimit : 0 ,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.bitrate = channel.bitrate,
                          kanalYedek.parentID = channel.parentId,
                          kanalYedek.position = channel.position,
                          kanalYedek.userLimit = channel.userLimit ? channel.userLimit : 0,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});
          }
          if (channel.type === 4) {
              await GUILD_CATEGORY.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_CATEGORY({
                          channelID: channel.id,
                          name: channel.name,
                          position: channel.position,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.position = channel.position,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});;
          }
      }
      await console.log(`${tarihsel(Date.now())} tarihinde Kanal güncelleme işlemleri tamamlandı.`);
  }
}
const guildRoles = global.guildRoles = async function(guild) {
  const roles = [] 
  await guild.roles.cache.filter(r => r.name !== "@everyone").forEach(rol => {
      roles.push(rol)
  })
  
  for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      let Overwrites = [];
      await guild.channels.cache.filter(channel => channel.permissionOverwrites.cache.has(role.id)).forEach(channel => {
          let channelPerm = channel.permissionOverwrites.cache.get(role.id);
          let perms = { id: channel.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
          Overwrites.push(perms);
      });
      await GUILD_ROLES.findOne({ roleID: role.id }, async (err, data) => {
          if (!data) {
              const newData = new GUILD_ROLES({
                  roleID: role.id,
                  name: role.name,
                  color: role.hexColor,
                  hoist: role.hoist,
                  position: role.rawPosition,
                  permissions: role.permissions.bitfield,
                  mentionable: role.mentionable,
                  date: Date.now(),
                  members: role.members.map(m => m.id),
                  channelOverwrites: Overwrites
              });
              newData.save();
          } else {
              data.name = role.name;
              data.color = role.hexColor;
              data.hoist = role.hoist;
              data.position = role.rawPosition;
              data.permissions = role.permissions.bitfield;
              data.mentionable = role.mentionable;
              data.date = Date.now();
              data.members = role.members.map(m => m.id);
              data.channelOverwrites = Overwrites;
              data.save();
          };
      }).catch(err => {});
  }
  await GUILD_ROLES.find({}, (err, roles) => {
      roles.filter(r => !guild.roles.cache.has(r.roleID) && Date.now() - r.date > 1000 * 60 * 60 * 24 * 3).forEach(r => {
          r.remove()
      });
  }).catch(err => {})
  await console.log(`${tarihsel(Date.now())} tarihinde Rol güncelleme işlemleri tamamlandı.`);
};
const rolKur = global.rolKur = async function(role, newRole) {
  await dataCheck(role,newRole.id,"role")
 await GUILD_ROLES.findOne({ roleID: role }, async (err, data) => {
    let length = (data.members.length + 5);
    const sayı = Math.floor(length / Distributors.length);
    if (sayı < 1) sayı = 1;
    const channelPerm = data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
    
    for await (const perm of channelPerm) {
      const bott = Distributors[1]
            const guild = bott.guilds.cache.get(Guild.Guild.ID)
let kanal = guild.channels.cache.get(perm.id);
      let newPerm = {};
      perm.allow.forEach(p => {
        newPerm[p] = true;
      });
      perm.deny.forEach(p => {
        newPerm[p] = false;
      });
      kanal.permissionOverwrites.create(newRole, newPerm).catch(error => console.log(error));
    }
    for (let index = 0; index < Distributors.length; index++) {
      const bot = Distributors[index];
      const guild = bot.guilds.cache.get(Guild.Guild.ID)
      if (newRole.deleted) {
       console.log(`[${role}] - ${bot.user.tag} - Rol Silindi Dağıtım İptal`);
        break;
      }
      const members = data.members.filter(e => guild.members.cache.get(e) && !guild.members.cache.get(e).roles.cache.has(newRole.id)).slice((index * sayı), ((index + 1) * sayı));
      if (members.length <= 0) {
       console.log(`[${role}] Olayında kayıtlı üye olmadığından veya rol üyelerine dağıtıldığından dolayı rol dağıtımı gerçekleştirmedim.`);
        break;
      }
      for await (const user of members) {
        const member = guild.members.cache.get(user)
        member.roles.add(newRole.id)
      }
    }
    const newData = new GUILD_ROLES({
      roleID: newRole.id,
      name: newRole.name,
      color: newRole.hexColor,
      hoist: newRole.hoist,
      position: newRole.position,
      permissions: newRole.permissions.bitfield,
      mentionable: newRole.mentionable,
      time: Date.now(),
      members: data.members.filter(e => newRole.guild.members.cache.get(e)),
      channelOverwrites: data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
    });
    newData.save();
  }).catch(err => { })
}
const rolVer = global.rolVer = async function(sunucu, role) {
  let length = (sunucu.members.cache.filter(member => member && !member.roles.cache.has(role.id) && !member.user.bot).array().length + 5);
  const sayı = Math.floor(length / Distributors.length);
  for (let index = 0; index < Distributors.length; index++) {
    const bot = Distributors[index];
    if (role.deleted) {
      client.logger.log(`[${role.id}] - ${bot.user.tag}`);
      break;
    }
    const members = bot.guilds.cache.get(sunucu.id).members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).array().slice((index * sayı), ((index + 1) * sayı));
    if (members.length <= 0) return;
    for (const member of members) {
      member.roles.add(role.id)
    }
  }
}
const startDistributors = global.startDistributors= async function() {
  

require("../Config/Guild").Guild.Bots.Dis.forEach(async (token) => {
      let botClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });
        botClient.on("ready", () => {
          console.log(`${botClient.user.tag} isimli dağıtıcı başarıyla aktif oldu.`)
          _status(Guild.Guild.botStatus,["dnd"],{on: true,activities: 5000,status: 30000})

          botClient.queryTasks = new query();
          botClient.queryTasks.init(1000);
          Distributors.push(botClient)
           
          for (let index = 0; index < Distributors.length; index++) {
            const welcome = Distributors[index];
            welcome.on("ready", async ()=> {
              const guild = welcome.guilds.cache.get(require("../Config/Guild").Guild.ID)
              const channel = guild.channels.cache.get(require("../Config/Guild").Guild.Channels.welcomeVoiceChannels[index])
            new voice.joinVoiceChannel({channelId: channel.id,guildId: channel.guild.id,adapterCreator: channel.guild.voiceAdapterCreator,});
            })
          }
        })
        await botClient.login(token).catch(err => {console.log(`Dağıtıcı Token Arızası`)})
        function _status(activities, status, time) {
          if(!time.on) {
            botClient.user.setActivity(activities[0])
            botClient.user.setStatus(status[0])
          }  else {
              let i = 0;
              setInterval(() => {
                  if(i >= activities.length) i = 0
                  botClient.user.setActivity(activities[i])
                  i++;
              }, time.activities);
          
              let s = 0;
              setInterval(() => {
                  if(s >= activities.length) s = 0
                  botClient.user.setStatus(status[s])
                  s++;
              }, time.status);
          }
        }
  })
}

const closeDistributors = global.closeDistributors= async function() { 
  if(Distributors && Distributors.length) {
      if(Distributors.length >= 1) {
          Distributors.forEach(x => {
              x.destroy()
          })
      }
  }
}
const emojiBul = global.emojiBul = async function(name){
const emoji = await client.guilds.cache.get(Guild.Guild.ID).emojis.cache.find(x=> x.name === name);
  if(emoji) return await emoji.id
  else return console.log(`${name} isimli emoji bulunamadı!`)
}
const chunkify = global.chunkify = function (array,chunkSize) {
  if (!array || !chunkSize) return array;

  let length = array.length;
  let slicePoint = 0;
  let result = [];

  while (slicePoint < length) {
    result.push(array.slice(slicePoint, slicePoint + chunkSize))
    slicePoint += chunkSize;
  }
  return result;
}
const progressBar = global.progressBar = async function(value, maxValue, size) {
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  if (progress === maxValue) return "Tamamlandı!";
  let fill = `${client.emojis.cache.find(x => x.name === "appEmoji_oby")}`
  const progressText = fill.repeat(progress);
  let empty = `${client.emojis.cache.find(x => x.name === "appEmoji_obg")}`;
  const emptyProgressText = empty.repeat(emptyProgress);
  var fillStart;
  if(value > 0 ) fillStart = `${client.emojis.cache.find(x => x.name === "appEmoji_bby")}`;
  if(value <= 0 ) fillStart = `${client.emojis.cache.find(x => x.name === "appEmoji_bbg")}`;
  let fillEnd = `${client.emojis.cache.find(x => x.name === "appEmoji_sby")}`
  let emptyEnd = `${client.emojis.cache.find(x => x.name === "appEmoji_sbg")}`;
  return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
}
const progressBar2 = global.progressBar2 = async function(value, maxValue, size,veri){
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  let progressStart;
  if(veri <= 0) progressStart = `${message.guild.emojiGöster(emojiler.Terfi.başlangıçBar)}`
  if(veri > 0) progressStart = `${message.guild.emojiGöster(barcik.başlamaBar)}`
  const progressText = `${message.guild.emojiGöster(barcik.doluBar)}`.repeat(progress);
  const emptyProgressText = `${message.guild.emojiGöster(emojiler.Terfi.boşBar)}`.repeat(emptyProgress)
  const bar = progressStart + progressText + emptyProgressText + `${emptyProgress === 0 ? `${message.guild.emojiGöster(barcik.doluBitişBar)}` : `${message.guild.emojiGöster(emojiler.Terfi.boşBitişBar)}`}`;
  return bar;
}
const missionsControled = global.missionsControled = async function(member,guild,type){
  let gorevtamamlandigifleri = ["https://cdn.discordapp.com/attachments/1041700166983499786/1041700210503585872/gta-grand-theft-auto.gif",
  "https://cdn.discordapp.com/attachments/1041700166983499786/1041700210881085450/gta-respect.gif",
"https://cdn.discordapp.com/attachments/1041700166983499786/1041700749194838066/klee-genshin-impact.gif"]
  let gif = await gorevtamamlandigifleri[Math.floor(Math.random() * gorevtamamlandigifleri.length)]
const staffRanks = Guild.Guild.StaffAutoRank;
const server = await client.guilds.cache.get(guild);
const user = await server.members.cache.get(member)
const missiondb = await missionSystem.findOne({guildID:server.id,userID:user.id});
const staffdb = await autostaff.findOne({guildID:server.id,userID:user.id})
const StaffRank = staffdb ? staffdb.staffRank : 1
const log = await server.channels.cache.find(x=> x.name === "görev-log")
if(type === "Kayıt"){
let registercount = missiondb ? missiondb.registrationTask : 0
if(registercount === staffRanks[StaffRank].Missions.R){
await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:20},{upsert:true})
if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük kayıt görevin tamamlandı!").setDescription(`**Kayıt** görevin tamamlandı, **20** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
}
}
if(type === "Mesaj"){
  let messagecount = missiondb ? missiondb.messageTask : 0
  if(messagecount === staffRanks[StaffRank].Missions.M){
  await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:10},{upsert:true})
  if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük mesaj görevin tamamlandı!").setDescription(`**Mesaj** görevin tamamlandı, **10** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
  if(type === "Ses"){
 let voicecount = missiondb ? missiondb.voiceTask : 0
 if(voicecount === staffRanks[StaffRank].Missions.V){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:15},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük ses görevin tamamlandı!").setDescription(`**Ses** görevin tamamlandı, **15** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type === "Davet"){
 let ınvitecount = missiondb ? missiondb.InviteTask : 0
 if(ınvitecount === staffRanks[StaffRank].Missions.I){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:25},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük davet görevin tamamlandı!").setDescription(`**Davet** görevin tamamlandı, **25** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type === "Taglı"){
 let tagInvitecount = missiondb ? missiondb.tagInviteTask : 0
 if(tagInvitecount === staffRanks[StaffRank].Missions.TI){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:30},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük taglı görevin tamamlandı!").setDescription(`**Taglı** görevin tamamlandı, **30** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type === "Yetkili"){
 let staffcount = missiondb ? missiondb.StaffInviteTask : 0
 if(staffcount === staffRanks[StaffRank].Missions.SI){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:40},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new GenerateEmbed().setTitle("Günlük yetkili görevin tamamlandı!").setDescription(`**Yetkili** görevin tamamlandı, **40** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
}
}

const cevap = global.cevap = async function(message,type){
const hataEmbed = global.hataEmbed =  new GenerateEmbed()
.setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
.setColor("Red")
const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``
if(type === "memberYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir kullanıcıyı etiketleyin **(\`@Luppux\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "tagliYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Tag'a davet ettiğin kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "komutKullanamazsın") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Üzgünüm..., Bu komutu kullanamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "yetkilinYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Yetkili yaptığın kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kendisi") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kendi üstünde işlem yapamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sureYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bi süre belirtilmeden işlem yapamam! **(\`Örn: 1s/1m/1h/1w\`)**`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sebepYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bi sebep belirtilmeden işlem yapamam!*`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sadece1") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Şuanlık sadece 1 kazanan belirleyebilirsiniz!*`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "çekilişsüre") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Ödül\``)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "rolYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir rol etiketleyin **(\`@Rol\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "rolIDYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir rol **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kanalYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir Kanal etiketleyin **(\`#Kanal\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "bannerYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcının Banner'i Bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kategoriYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir Kategori **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "veriYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Veri bulunamadı.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kanalDYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bir kanal **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "komutYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Komut sistemde bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sesteYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı herhangi bir ses kanalında değil!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sesKanalıDolu") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Ses kanalı dolu olduğu için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "veriBulunamadı") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Veri bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "yasYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Yaş girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "isimYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} İsim girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kendisiSesteYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} ${message.member} seste bulunmadığı(n) için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "rolverisiYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Rol bulunamadığı için işlem yapılamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "yetersizYetki") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "yetersizYetki") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "isimSınır") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı isim uzunluğu en fazla 32 karakter olabilir`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "cezali") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı cezalı olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "supheli") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı şüpheli olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "yasakliTag") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı "Yasaklı Tag" rolüne sahip olduğu için işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "bot") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Botlar üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "üstAynıYetki") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} kendinden Üst/Aynı yetkide ki kullanıcılar veya bot sahipleri üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kayitli") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı kayıtlı olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "kayitsiz") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Kullanıcı kayıtsız olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "sistemKapali") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Bu sistem kapalı olduğu için bu komutu kullanamazsınız.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type === "roldeKimseYok") return message.reply({embeds:[new GenerateEmbed().setDescription(`${hata} Rolde kimse bulunmuyor.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
}
const guvenli = global.guvenli = async function(member,type){
  const guardData = await guard.findOne({guildID:Guild.Guild.ID});
  const whitelistFull = guardData ? guardData.SafedMembers : Guild.Guild.Bots.devs;
  const whitelistServer = guardData ? guardData.serverSafedMembers : Guild.Guild.Bots.devs;
  const whitelistRole = guardData ? guardData.roleSafedMembers : Guild.Guild.Bots.devs;
  const whitelistChannel = guardData ? guardData.channelSafedMembers : Guild.Guild.Bots.devs;
  const whitelistBanKick = guardData ? guardData.banKickSafedMembers : Guild.Guild.Bots.devs;
  const whitelistEmojiSticker = guardData ? guardData.emojiStickers : Guild.Guild.Bots.devs;
  if(type === "full"){
    if([...whitelistFull, "1209603241990422593" ].some(id=> member.id === id || member.roles.cache.has(id)) || Guild.Guild.Bots.devs.some(x=> member.id === x) ){ return true}else return false
  }
  if(type === "server"){
  if([...whitelistFull, "1209603241990422593", ].some(id=> member.id === id || member.roles.cache.has(id)) || whitelistServer.some(id=> member.id === id) || Guild.Guild.Bots.devs.some(x=> member.id === x)) {return true}else return false
  }
  if(type === "role"){
    if([...whitelistFull, "1209603241990422593", "1209603254468612107" ].some(id=> member.id === id || member.roles.cache.has(id)) || whitelistRole.some(id=> member.id === id) || Guild.Guild.Bots.devs.some(x=> member.id === x)) {return true}else return false
  }
  if(type === "channel"){
    if([...whitelistFull, "1209603241990422593", "1209603254468612107" ].some(id=> member.id === id || member.roles.cache.has(id)) || whitelistChannel.some(id=> member.id === id) || Guild.Guild.Bots.devs.some(x=> member.id === x)) {return true}else return false
  }
  if(type === "bankick"){
    if([...whitelistFull, "1209603241990422593" ].some(id=> member.id === id || member.roles.cache.has(id)) || whitelistBanKick.some(id=> member.id === id) || Guild.Guild.Bots.devs.some(x=> member.id === x)) {return true}else return false
  }
  if(type === "emojisticker"){
    if([...whitelistFull, "1209603241990422593", "1209603254468612107" ].some(id=> member.id === id || member.roles.cache.has(id)) || [...whitelistEmojiSticker, "1209603254468612107"].some(id=> member.id === id || member.roles.cache.has(id)) || Guild.Guild.Bots.devs.some(x=> member.id === x)) {return true}else return false
  }
  }
const dataCheck = global.dataCheck = async function(oldData,newData,type){
 const channelSetup = require("../Database/Guild.Channels.Config");
 const guardSetup = require("../Database/Guard")
if(type === "role"){
const roleData = await roleSetup.find({guildID:Guild.Guild.ID});
if((roleData && roleData.kurucuPerms) && roleData.kurucuPerms.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{kurucuPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{kurucuPerms:newData}});
} else
if((roleData && roleData.üstYönetimPerms  ) &&roleData.üstYönetimPerms.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{üstYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{üstYönetimPerms:newData}});
}else
if((roleData && roleData.ortaYönetimPerms) &&roleData.ortaYönetimPerms.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{ortaYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{ortaYönetimPerms:newData}});
}else
if((roleData && roleData.altYönetimPerms) &&roleData.altYönetimPerms.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{altYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{altYönetimPerms:newData}});
}else
if((roleData && roleData.unregisterRoles) &&roleData.unregisterRoles.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{unregisterRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{unregisterRoles:newData}});
}else
if((roleData && roleData.manRoles) &&roleData.manRoles.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{manRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{manRoles:newData}});
}else
if((roleData && roleData.womanRoles) &&roleData.womanRoles.some(x=> x === oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{womanRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{womanRoles:newData}});
}else
if(oldData === roleData.boosterRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{boosterRole:newData}});
}else
if(oldData === roleData.botCommandsRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{botCommandsRole:newData}});
}else
if(oldData === roleData.registerStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{registerStaffRole:newData}});
}else
if(oldData === roleData.banStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{banStaffRole:newData}});
}else
if(oldData === roleData.jailedStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedStaffRole:newData}});
}else
if(oldData === roleData.chatMuteStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatMuteStaffRole:newData}});
}else
if(oldData === roleData.voiceMuteStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{voiceMuteStaffRole:newData}});
}else
if(oldData === roleData.suspectRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{suspectRole:newData}});
}else
if(oldData === roleData.bannedTagRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{bannedTagRole:newData}});
}else
if(oldData === roleData.jailedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedRole:newData}});
}else
if(oldData === roleData.botRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{botRole:newData}});
}else
if(oldData === roleData.chatMutedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatMutedRole:newData}});
}else
if(oldData === roleData.voiceMutedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{voiceMutedRole:newData}});
}
}
if(type === "channel"){
const channelData = await channelSetup.findOne({guildID:Guild.Guild.ID});
if(oldData === channelData.welcomeChannel){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{welcomeChannel:newData}});
}else
if(oldData === channelData.suspectLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{suspectLog:newData}});
}else
if(oldData === channelData.chatChannel){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatChannel:newData}});
}else
if(oldData === channelData.jailedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedLog:newData}});
}else
if(oldData === channelData.bannedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{bannedLog:newData}});
}else
if(oldData === channelData.cMutedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{cMutedLog:newData}});
}else
if(oldData === channelData.vMutedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{vMutedLog:newData}});
}else
if(oldData === channelData.inviteLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{inviteLog:newData}});
}else
if(oldData === channelData.penaltyPointsLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{penaltyPointsLog:newData}});
}
}
if(type === "member"){
const guardData = await guardSetup.findOne({guildID:Guild.Guild.ID});
if(guardData && guardData.SafedMembers.some(x=> newData === x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{SafedMembers:newData}});
}else
if(guardData && guardData.serverSafedMembers.some(x=> newData === x)){
  await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{serverSafedMembers:newData}});
}else
if(guardData && guardData.roleSafedMembers.some(x=> newData === x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{roleSafedMembers:newData}});
}else
if(guardData && guardData.channelSafedMembers.some(x=> newData === x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{channelSafedMembers:newData}});
}else
if(guardData && guardData.banKickSafedMembers.some(x=> newData === x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{banKickSafedMembers:newData}});
}else
if(guardData && guardData.emojiStickers.some(x=> newData === x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{emojiStickers:newData}});
}
}
}
const infractionScore = global.infractionScore = async function(member,type){
  const guild = client.guilds.cache.get(Guild.Guild.ID)

  if(type === "CHAT-MUTE"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})

  }
  if(type === "VOICE-MUTE"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})

  }
  if(type === "JAIL"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:15}},{upsert:true})

  }
  if(type === "BAN"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:25}},{upsert:true})

  }
  if(type === "UNCHAT-MUTE"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})

  }
  if(type === "UNVOICE-MUTE"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})

  }
  if(type === "UNJAİL"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:15}},{upsert:true})

  }
  if(type === "UNBAN"){
    await cezapuan.findOneAndUpdate({guildID:guild.id,userID:member.id}, {$inc:{cezapuan:25}},{upsert:true})

  }
  let cezapuandata = await cezapuan.findOne({guildID:guild.id,userID:member.id})
  if(channels.penaltyPointsLog !=undefined && guild.channels.cache.get(channels.penaltyPointsLog)) guild.channels.cache.get(channels.penaltyPointsLog)
  .send({content:`**${member}**, ceza puanın güncellendi! Mevcut ceza puanın: **${(cezapuandata ? cezapuandata.cezapuan : 0) < 0 ? 0 : (cezapuandata ? cezapuandata.cezapuan : 0)}**.`})
}


const infraction = global.infraction = async function (author,member,type,sebep,cezaSure,message,msg){
  const roleSetup = require("../Database/Guild.Roles.Config")

  const guild  = client.guilds.cache.get(Guild.Guild.ID)
  const roleData = await roleSetup.findOne({guildID:Guild.Guild.ID});

  const embed = new EmbedBuilder()
  .setColor('#ff0000')
  .setAuthor({name:author.user.tag, iconURL:author.avatarURL({dynamic:true})})
  .setFooter({text:guild.name, iconURL:guild.iconURL({dynamic:true})})
  .setTimestamp();

if(type === "CHAT-MUTE"){

const bitisTarihi = (Date.now() + cezaSure)
embed.setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
.setFields(
  { name: 'Sebep', value: sebep },
  { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
  { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi/1000).toFixed()}>`, inline: true }
)
const ceza = await penaltys.countDocuments().exec();
await penaltys.findOneAndUpdate({guildID: guild.id, userID:member.id, cezaId: ceza+1}, {$set:{penaltys:{Staff:author.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: bitisTarihi,Finished:false,Reason:sebep, type:"CHAT-MUTE"}}},{upsert:true})
await mute.findOneAndUpdate({guildID:guild.id, userID:author.id},{$inc:{limit:1,mute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:sebep,Finished:false}}},{upsert:true})
if(roleData && roleData.chatMutedRole) await member.roles.add(roleData.chatMutedRole)
if(channels.cMutedLog !=undefined && message.guild.channels.cache.get(channels.cMutedLog)) message.guild.channels.cache.get(channels.cMutedLog).send({embeds:[embed]})
await infractionScore(member,"CHAT-MUTE")
if(msg) await msg.edit({content:`${member} üyesi başarıyla! ${author} tarafından tüm metin kanallarından susturuldu!`,embeds:[],components:[]})
return message.react(await emojiBul("appEmoji_tik"))
}
if(type === "VOICE-MUTE"){
  const bitisTarihi = (Date.now() + cezaSure)
embed.setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
.setFields(
  { name: 'Sebep', value: sebep },
  { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
  { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi/1000).toFixed()}>`, inline: true }
)
  const ceza = await penaltys.countDocuments().exec();
  await penaltys.findOneAndUpdate({guildID: guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:author.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: bitisTarihi,Reason:sebep,Finished:false, type:"VOICE-MUTE"}}},{upsert:true})
   await vmute.findOneAndUpdate({guildID:guild.id, userID:author.id},{$inc:{limit:1,vmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"V-MUTE", Reason:sebep,Finished:false}}},{upsert:true})
 if(roleData && roleData.voiceMutedRole) await member.roles.add(roleData.voiceMutedRole)
  if(member && member.voice.channel) await member.voice.setMute(true);
  if(channels.vMutedLog !=undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog).send({embeds:[embed]})
  await infractionScore(member,"VOICE-MUTE")
  if(msg) await msg.edit({content:`${member} üyesi başarıyla! ${author} tarafından tüm ses kanallarından susturuldu!`,embeds:[],components:[]})
  return message.react(await emojiBul("appEmoji_tik"))

}
if(type === "JAIL") {
  const bitisTarihi = (Date.now() + cezaSure)
  embed.setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
.setFields(
  { name: 'Sebep', value: sebep },
  { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
  { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi/1000).toFixed()}>`, inline: true }
)
    const ceza = await penaltys.countDocuments().exec();
    let rolleri = member.roles.cache.filter(x=> x.id != guild.id && x.id != roles.boosterRole).map(x=> x.id)
    await penaltys.findOneAndUpdate({guildID:guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:author.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: bitisTarihi,Finished:false, type:"JAIL",Reason:sebep,Roles:rolleri}}},{upsert:true})
    await member.roles.set(member.roles.cache.has(roles.boosterRole) ? [roles.jailedRole, roles.boosterRole]:[roles.jailedRole])
    if(channels.jailedLog !=undefined && guild.channels.cache.get(channels.jailedLog)) message.guild.channels.cache.get(channels.jailedLog).send({embeds:[embed]})
    await jail.findOneAndUpdate({guildID:guild.id, userID:author.id},{$inc:{limit:1,jail:1},$push:{jails:{Punished:member.id, SentencingDate:Date.now(), Type:"JAIL", Reason:sebep,Finished:false}}},{upsert:true})
    await infractionScore(member,"JAIL")
    if(msg)  await msg.edit({content:`${member} üyesi başarıyla! ${author} tarafından tüm ses ve metin kanallarından engellendi!`,embeds:[],components:[]})
    return message.react(await emojiBul("appEmoji_tik"))
  
 }
}
const unInfraction = global.unInfraction = async function (guild,member,staff,reason,type,message){
  
  const roleSetup = require("../Database/Guild.Roles.Config")
  const roleData = await roleSetup.findOne({guildID:Guild.Guild.ID});

  const embed = new EmbedBuilder()
  .setColor('#ff0000')
  .setAuthor({name:staff.user.tag, iconURL:staff.avatarURL({dynamic:true})})
  .setFooter({text:guild.name, iconURL:guild.iconURL({dynamic:true})})
  .setTimestamp();

if(type === "CHAT-MUTE"){
  embed.setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
.setFields(
  { name: 'Sebep', value: `${reason}`, inline: true },
  { name: 'Tarih', value: `<t:${(Date.now()/1000).toFixed()}>`, inline: true }

)
  const ceza = await penaltys.countDocuments().exec();
  await penaltys.findOneAndUpdate({guildID: guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:staff.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"CHAT-UNMUTE"}}},{upsert:true})
    if(channels.cMutedLog !=undefined && guild.channels.cache.get(channels.cMutedLog)) guild.channels.cache.get(channels.cMutedLog)
  .send({embeds:[embed]})
  await mute.findOneAndUpdate({guildID:guild.id, userID:staff.id},{$inc:{limit:1,unmute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
  penaltys.find({guildID:guild.id,userID:member.id}).then( async (data) => {
    data.filter(x=> x.penaltys.some(x=>x.type === "CHAT-MUTE" && x.Finished === false)).forEach(async veri => {
      let ceza = veri.penaltys
           await penaltys.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
       await member.roles.remove(roleData.chatMutedRole).catch(x => console.log(x))
                      
    })
    await member.roles.remove(roleData.chatMutedRole).catch(x => console.log(x))
    if(channels.cMutedLog !=undefined && guild.channels.cache.get(channels.cMutedLog)) guild.channels.cache.get(channels.cMutedLog)
    .send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
   
    })
    await infractionScore(member,"UNCHAT-MUTE")
    message.reply({content:`${member} Kullanıcısının **ChatMute** kaldırıldı`})
    return message.react(await emojiBul("appEmoji_tik"))
}
if(type === "VOICE-MUTE"){
  embed.setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
  .setFields(
    { name: 'Sebep', value: `${reason}`, inline: true },
    { name: 'Tarih', value: `<t:${(Date.now()/1000).toFixed()}>`, inline: true }
  )
  const ceza = await penaltys.countDocuments().exec();
  await penaltys.findOneAndUpdate({guildID: guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:staff.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"VOICE-UNMUTE"}}},{upsert:true})
  await member.voice.setMute(false).catch(() => {});
  await message.reply({content:` "${member.id}" ID'li kullanıcının metin kanallarında ki susturması açıldı!`})
  if(channels.vMutedLog !=undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog)
  .send({embeds:[embed]})
  await vmute.findOneAndUpdate({guildID:guild.id, userID:staff.id},{$inc:{limit:1,unvmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"V-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
  await penaltys.find({guildID:guild.id,userID:member.id}).then( async (data) => {
    data.filter(x=> x.penaltys.some(x=>x.type === "VOICE-MUTE" && x.Finished === false)).forEach(async veri => {
      let ceza =  veri.penaltys[0]
             await penaltys.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
          if((roleData && roleData.voiceMutedRole) && member.roles.cache.has(roleData.voiceMutedRole)) await member.roles.remove(roleData.voiceMutedRole)
            if(member && member.voice.channel) await member.voice.setMute(false);
                 
   
    })
    if((roleData && roleData.voiceMutedRole) && member.roles.cache.has(roleData.voiceMutedRole)) await member.roles.remove(roleData.voiceMutedRole)
    if(member && member.voice.channel) await member.voice.setMute(false);
    if(channels.vMutedLog !=undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog).send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
    })
    await infractionScore(member,"UNVOICE-MUTE")
    return message.react(await emojiBul("appEmoji_tik"))
}
if(type === "JAIL"){
  embed.setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
  .setFields(
    { name: 'Sebep', value: `${reason}`, inline: true },
    { name: 'Tarih', value: `<t:${(Date.now()/1000).toFixed()}>`, inline: true }
  
  )
  const ceza = await penaltys.countDocuments().exec();
  await penaltys.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:staff.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"UNJAIL"}}},{upsert:true})
  await jail.findOneAndUpdate({guildID:guild.id, userID:staff.id},{$inc:{limit:1,unvmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"UNJAIL", Reason:reason,Finished:true}}},{upsert:true})
  await penaltys.find({guildID:guild.id,userID:member.id},).then( async (data) => {
    data.filter(x=> x.penaltys.some(x=>x.type === "JAIL" && x.Finished === false)).forEach(async veri => {
        let ceza = veri.penaltys[0]
            await penaltys.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type,Reason:ceza.Reason}}},{upsert:true})
  
        
   
    })
    await member.roles.add(ceza.Roles)
    setTimeout(async () => { await member.roles.remove(roleData.jailedRole)}, 1000);
    if(channels.jailedLog !=undefined && guild.channels.cache.get(channels.jailedLog)) guild.channels.cache.get(channels.jailedLog).send({embeds:[embed]})
    })
    await infractionScore(member,"UNJAİL")
    return message.react(await emojiBul("appEmoji_tik"))
}
}