const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const voiceJoinedAt = require('../../../../Global/Database/Stats/Voice/voiceJoinedAt');
const voiceUser = require('../../../../Global/Database/Stats/Voice/voiceUser');
const voiceGuild = require('../../../../Global/Database/Stats/Voice/voiceGuild');
const voiceGuildChannel = require('../../../../Global/Database/Stats/Voice/voiceGuildChannel');
const voiceUserChannel = require('../../../../Global/Database/Stats/Voice/voiceUserChannel');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class voiceChannelSwitch extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelSwitch",
            enabled: false,
        });
    }
    
 async onLoad(member, oldChannel, newChannel) {
    const GuildRolesConfig = require("../../../../Global/Database/Guild.Roles.Config");

const Guild = require("../../../../Global/Config/Guild");

  const roles = await GuildRolesConfig.findOne({guildID:Guild.Guild.ID})

            const statSystemControl = await guildSystemConfig.findOne({guildID:oldoldChannel.guild.id});
            var kontrol = statSystemControl ? statSystemControl.statSystem : false;
            if(kontrol == true){
              if(roles &&(roles.unregisterRoles && (roles.unregisterRoles.some(x=> member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> member.roles.cache.has(x))))
              ||roles && (roles.bannedTagRole && (member.roles.cache.has(roles.bannedTagRole) || member.roles.cache.has(roles.bannedTagRole))) 
              ||roles && (roles.jailedRole && (member.roles.cache.has(roles.jailedRole) && member.roles.cache.has(roles.jailedRole))) 
              ||roles && (roles.suspectRole && (member.roles.cache.has(roles.suspectRole) || member.roles.cache.has(roles.suspectRole)))) return;
              if ((member && member.user.bot) || (member && member.user.bot)) return;
              var joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
              if (!joinedAtData){
              await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
              joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
            }
            const data = Date.now() - joinedAtData.date;
                    await voiceUser.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
                    await voiceGuild.findOneAndUpdate({ guildID: oldChannel.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
                    await voiceGuildChannel.findOneAndUpdate({ guildID: oldChannel.guild.id}, { $inc: { channelData: data } }, { upsert: true });
                    await voiceUserChannel.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id, channelID: oldChannel.id }, { $inc: { channelData: data } }, { upsert: true });
                    if (oldChannel.parentId) await voiceUserParent.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id, parentID: oldChannel.parentId }, { $inc: { parentData: data } }, { upsert: true });
                    await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });        
            }
    }
}

module.exports = voiceChannelSwitch
