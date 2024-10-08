const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField ,Events:{ChannelUpdate} } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const TextChannels = require("../../../../Global/Database/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../Global/Database/Backup/Guild.Voice.Channels");
const guardPenaltyDB = require("../../../../Global/Database/guardPenalty")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class channelUpdate extends Event {
    constructor(client) {
        super(client, {
            name: ChannelUpdate,
            enabled: true,
        });    
    }    

 async  onLoad(oldChannel, newChannel) {
    if(oldChannel.guild.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const channelguardonly = Guard ? Guard.channelsGuard : false;
    if(channelguardonly == true){
    let entry = await guild.fetchAuditLogs({type: 11}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;

    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    const log = guild.channels.cache.find(x => x.name == "channel-guard")
    const embed = new EmbedBuilder({
        title:"Server Channel Protection - Security II",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor || Date.now() - entry.createdTimestamp > 5000 || orusbuevladı.user.bot)return;
    if (await guvenli(orusbuevladı,"channel") == true){
      if(oldChannel.name != newChannel.name){
    await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Kanal Güncelleme (İsmi)`,Tarih:Date.now()}}},{upsert:true})
      if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** isimli kanalı **${newChannel.name}** olarak değiştirdi.`)]})
    } 
    if(oldChannel.parentId != newChannel.parentId){
      await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Kanal Güncelleme (Kategori Değiştirildi)`,Tarih:Date.now()}}},{upsert:true})
        if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** kanalını \`${newChannel.guild.channels.cache.get(newChannel.parentId).name}\` kategorisine taşıdı.`)]})
      }
    if(newChannel.type == 2 && (oldChannel.userLimit != newChannel.userLimit)){
      await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Kanal Güncelleme (Limit)`,Tarih:Date.now()}}},{upsert:true})
      if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** kanalının limiti \`${newChannel.userLimit}\` olarak değiştirildi.`)]})
    } 
    if((newChannel.type === 0 || (newChannel.type === 5)) && (oldChannel.topic != newChannel.topic)){
      await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Kanal Güncelleme (Açıklama)`,Tarih:Date.now()}}},{upsert:true})
      if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** kanal açıklaması \`${newChannel.topic}\` olarak değiştirildi.`)]})
    }
    await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Kanal Güncelleme`,Tarih:Date.now()}}},{upsert:true})
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** isimi kanal güncellendi!`)]})

  }
      await ytkapa(Guild.ID)
      await ytçek(orusbuevladı)
    if (newChannel.type !== 4 && newChannel.parentId !== oldChannel.parentId) newChannel.setParent(oldChannel.parentId);
    if (newChannel.type === 4) {
      await newChannel.edit({
        position: oldChannel.position,
        name: oldChannel.name,
      });
    } else if (newChannel.type === 0 || (newChannel.type === 5)) {
      await newChannel.edit({
        name: oldChannel.name,
        position: oldChannel.position,
        topic: oldChannel.topic,
        nsfw: oldChannel.nsfw,
        rateLimitPerUser: oldChannel.rateLimitPerUser,
      });
    } else if (newChannel.type === 2) {
      await newChannel.edit({
        name: oldChannel.name,
        position: oldChannel.position,
        bitrate: oldChannel.bitrate,
        userLimit: oldChannel.userLimit,
      });
    };
 
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldChannel.name}** isimli kanalı güncellediği için rolleri alındı ve kanal eski haline getirildi. silindi.`)]})
  }
 }
}

module.exports = channelUpdate;