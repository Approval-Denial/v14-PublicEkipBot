const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const voiceJoinedAt = require('../../../../Global/Database/Stats/Voice/voiceJoinedAt');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class voiceChannelJoin extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelJoin",
            enabled: false,
        });
    }
    
 async onLoad(member, channel) {
    const statSystemControl = await guildSystemConfig.findOne({guildID:channel.guild.id});
    var kontrol = statSystemControl ? statSystemControl.statSystem : false;
    const GuildRolesConfig = require("../../../../Global/Database/Guild.Roles.Config");

const Guild = require("../../../../Global/Config/Guild");

  const roles = await GuildRolesConfig.findOne({guildID:Guild.Guild.ID})

    if(kontrol == true){
      if((roles && roles.unregisterRoles && (roles.unregisterRoles.some(x=> member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> member.roles.cache.has(x))))
      || (roles &&roles.bannedTagRole && (member.roles.cache.has(roles.bannedTagRole) || member.roles.cache.has(roles.bannedTagRole))) 
      || (roles &&roles.jailedRole && (member.roles.cache.has(roles.jailedRole) && member.roles.cache.has(roles.jailedRole))) 
      || (roles &&roles.suspectRole && (member.roles.cache.has(roles.suspectRole) || member.roles.cache.has(roles.suspectRole)))) return;
      if ((member && member.user.bot) || (member && member.user.bot)) return;

      await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });

    }
    }
}

module.exports = voiceChannelJoin
