const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const streamOpenedAt = require("../../../../Global/Database/Stats/Streamer/streamOpenedAt");
const voiceStreamerUser = require('../../../../Global/Database/Stats/Streamer/voiceStreamerUser');
const voiceGuildStream = require('../../../../Global/Database/Stats/Streamer/voiceGuildStream');
const voiceGuildStreamChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamChannel');
const voiceGuildStreamUserChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamUserChannel');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class voiceStreamingStop extends Event {
    constructor(client) {
        super(client, {
            name: "voiceStreamingStop",
            enabled: false,
        });
    }
    
 async onLoad(member, channel) {
 const statSystemControl = await guildSystemConfig.findOne({guildID:channel.guild.id});
 var kontrol = statSystemControl ? statSystemControl.statSystem : false;
 if(kontrol == true){
   if(roles &&(roles.unregisterRoles && (roles.unregisterRoles.some(x=> member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> member.roles.cache.has(x))))
   ||roles && (roles.bannedTagRole && (member.roles.cache.has(roles.bannedTagRole) || member.roles.cache.has(roles.bannedTagRole))) 
   ||roles && (roles.jailedRole && (member.roles.cache.has(roles.jailedRole) && member.roles.cache.has(roles.jailedRole))) 
   ||roles && (roles.suspectRole && (member.roles.cache.has(roles.suspectRole) || member.roles.cache.has(roles.suspectRole)))) return;
   if ((member && member.user.bot) || (member && member.user.bot)) return;
   var streamstartAt = await streamOpenedAt.findOne({ userID: member.id });
   if (!streamstartAt){
   await streamOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
   streamstartAt = await streamOpenedAt.findOne({ userID: member.id });
 }
 const data = Date.now() - streamstartAt.date;
 await voiceStreamerUser.findOneAndUpdate({ guildID: channel.guild.id, userID: member.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
 await voiceGuildStream.findOneAndUpdate({ guildID: channel.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
 await voiceGuildStreamChannel.findOneAndUpdate({ guildID: channel.guild.id}, { $inc: { channelData: data } }, { upsert: true });
 await voiceGuildStreamUserChannel.findOneAndUpdate({ guildID: channel.guild.id, userID: member.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  await taskProgress(member,"Streamer",data);

 await streamOpenedAt.findOneAndDelete({ userID: member.id }, { upsert: true });

 }

    }
}

module.exports = voiceStreamingStop
