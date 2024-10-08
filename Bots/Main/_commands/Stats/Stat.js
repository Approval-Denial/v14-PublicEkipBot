
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");

const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, codeBlock ,StringSelectMenuBuilder } = require("discord.js");
const { post } = require("node-superfetch");
const User = require("../../../../Global/Database/Users")
const moment = require("moment");

const {Guild} = require("../../../../Global/Config/Guild")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system")

const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageUserChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel");

const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceUserChannel = require("../../../../Global/Database/Stats/Voice/voiceUserChannel")
const userParent = require("../../../../Global/Database/Stats/Voice/voiceUserParent")
const joinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt")

const cameraOpenedAt = require("../../../../Global/Database/Stats/Camera/cameraOpenedAt");
const voiceCameraUser = require("../../../../Global/Database/Stats/Camera/voiceCameraUser");
const voiceGuildCamera = require('../../../../Global/Database/Stats/Camera/voiceGuildCamera');
const voiceGuildCameraChannel = require('../../../../Global/Database/Stats/Camera/voiceGuildCameraChannel');
const voiceGuildCameraUserChannel = require('../../../../Global/Database/Stats/Camera/voiceGuildCameraUserChannel');

const streamOpenedAt = require("../../../../Global/Database/Stats/Streamer/streamOpenedAt");
const voiceStreamerUser = require("../../../../Global/Database/Stats/Streamer/voiceStreamerUser");
const voiceGuildStream = require('../../../../Global/Database/Stats/Streamer/voiceGuildStream');
const voiceGuildStreamChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamChannel');
const voiceGuildStreamUserChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamUserChannel');
const { convertNumbers } = require("../../../../Global/Functions/convertNumbers");

require("moment-duration-format");
class Stats2 extends Command {
    constructor(client) {
        super(client, {
            name: "Stat",
            description: "Kişinin istatistiklerini gösterir. (basic)",
            usage: ".statsbasic (@Approval/ID)",
            category: "Statistics",
            aliases: ["statbasic","basitstat","bs","basitistatistik","stat"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
  const statsystemCollect = await statSystemDB.findOne({guildID:message.guild.id});
let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
if(controlsystem == true) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    var kategoriler = [];
    message.guild.channels.cache.filter(x=> x.parentId).forEach(channel => {
      if(channel.type == 2){
      if(!kategoriler.includes(channel.parentId)){
        kategoriler.push(channel.parentId)
      }
      }});
    var kategorilermsg =[];
    await kategoriler.filter(x=> message.guild.channels.cache.get(x)).sort((a,b) => message.guild.channels.cache.get(a).rawPosition - message.guild.channels.cache.get(b).rawPosition).forEach(async x=>{
     if(message.guild.channels.cache.get(x)) await kategoriStatToplam(x,message.guild,member) != false ? await kategorilermsg.push(`${message.guild.findReaction(Category)} **${message.guild.channels.cache.get(x).name}** : \`${await kategoriStatToplam(x,message.guild,member)}\``) : ``;
    await kategorilermsg;
     });
    const memberMessageData = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    const memberVoiceData = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop = memberMessageData.filter(x => message.guild.channels.cache.has(x.channelID)).length > 0 ? memberMessageData.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${convertNumbers(index + 1,message.guild)} <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."
    let voiceTop = memberVoiceData.filter(x => message.guild.channels.cache.has(x.channelID)).length > 0 ? memberVoiceData.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${convertNumbers(index + 1,message.guild)} <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceStreamData = await voiceStreamerUser.findOne({guildID:message.guild.id,userID:member.id})
    var voiceStream = voiceStreamData ? voiceStreamData.totalStat : 0;

    const voiceCameraData = await voiceCameraUser.findOne({guildID:message.guild.id,userID:member.id})
    var voiceCamera = voiceCameraData ? voiceCameraData.totalStat : 0;
    let joinedAtData = await joinedAt.findOne({ userID: member.id });
    let kup = message.guild.findReaction(Kup)
    let saat = message.guild.findReaction(Time)
    var a = 0;
    if(joinedAtData){
      a = Date.now() - joinedAtData.date;
    };
    const row = new ActionRowBuilder()
    .setComponents(
    new StringSelectMenuBuilder()
    .setCustomId("istatistik")
    .setPlaceholder("İstatistik Türünü Seçin.")
    .setOptions(
      [
        {label:"Genel",description:"Tüm İstatistiklerinizi Gösterir.",value:"genel",emoji:{id:message.guild.findReaction(Elmas,"ID")}},
        {label:"Mesaj",description:"Tüm Mesaj İstatistiklerinizi Gösterir.",value:"mesaj",emoji:{id:message.guild.findReaction(Metin,"ID")}},
        {label:"Ses",description:"Tüm Ses İstatistiklerinizi Gösterir.",value:"ses",emoji:{id:message.guild.findReaction(Ses,"ID")}},
        {label:"Yayin",description:"Tüm Yayin İstatistiklerinizi Gösterir.",value:"yayin",emoji:{id:message.guild.findReaction(Yayın,"ID")}},
        {label:"Kamera",description:"Tüm KAmera İstatistiklerinizi Gösterir.",value:"kamera",emoji:{id:message.guild.findReaction(Kamera,"ID")}},
      ]
    )
    )
    let e;
    let r ;
       await message.channel.send( {components:[r =row], embeds:[e =new GenerateEmbed()
        .setDescription(`${member}, Aşağıda senin genel istatistiklerin gösteriliyor.`).addFields(
        {name:`${message.guild.findReaction(Metin)} Genel Mesaj`, value: `${codeBlock("fix", `${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
        {name:`${message.guild.findReaction(Ses)} Genel Ses`, value: `${codeBlock("fix",moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
        {name:`\u200B`,value:`\u200B`,inline:true},
        {name:`${message.guild.findReaction(Kamera)} Genel Kamera`, value: `${codeBlock("fix",moment.duration(voiceCamera).format("H [Saat], m [dakika]"))}`, inline:true},
        {name:`${message.guild.findReaction(Yayın)} Genel Yayin`, value: `${codeBlock("fix",moment.duration(voiceStream).format("H [Saat], m [dakika]"))}`, inline:true},
        {name:`\u200B`,value:`\u200B`,inline:true},
        {name:`${kup} Kanal Sıralaması (Top 5)`, value:`${voiceTop}`,inline:false},
        {name:`${kup} Mesaj Sıralaması (Top 5)`, value:`${messageTop}`,inline:false},
      )] }).then(msg=> {
        if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"))
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
        collector.on('collect', async (menu) => {
          await menu.deferUpdate();
        if(menu.values[0] == "genel"){
          msg.edit({embeds:[e],components:[r]})
        }
        if(menu.values[0] == "mesaj"){
          var messageTopData = await messageUser.find({ guildID: message.guild.id});

          messageTopData = messageTopData.sort((a,b)=> b.totalStat - a.totalStat);
          let messageTopMessage = `\u200B`;
          for (let i = 0; i < messageTopData.length; i++) {
              if(messageTopData[i].userID == member.id) messageTopMessage += `Mesaj Sıralamasında Şuan \`${i+1}.\` Sırada!`
          }
         await msg.edit({components:[row],embeds:[new GenerateEmbed()
            .setDescription(`${member}, Aşağıda senin mesaj istatistiklerin gösteriliyor.`).addFields(
            {name:`${message.guild.findReaction(Metin)} Genel Mesaj`, value: `${codeBlock("fix", `${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`${kup} Mesaj Sıralaması (Top 5)`, value:messageTop,inline:false},
            {name:`${kup} Zaman Dalgası`,value:`**${saat} __Günlük Mesaj__: \`${Number(messageData ? messageData.dailyStat : 0)}\`
${saat} __Haftalık Mesaj__: \`${Number(messageData ? messageData.weeklyStat : 0)}\`
${saat} __Aylık Mesaj__: \`${Number(messageData ? messageData.twoWeeklyStat : 0)}\`**`,inline:false},
            {name:`${kup} Sıralama`,value:`${messageTopMessage}`,inline:false}
          )]}).catch(err=> console.log(err))
        }
        if(menu.values[0] == "ses"){
          var VoiceTopData = await voiceUser.find({ guildID: message.guild.id});
          VoiceTopData = VoiceTopData.sort((a,b)=> b.totalStat - a.totalStat);
          let messageTopVoice = `\u200B`;
          for (let i = 0; i < VoiceTopData.length; i++) {
              if(VoiceTopData[i].userID == member.id) messageTopVoice += `Ses Sıralamasında Şuan \`${i+1}.\` Sırada!`
          }
          await msg.edit( {components:[row], embeds:[new GenerateEmbed()
            .setDescription(`${member}, Aşağıda senin ses istatistiklerin gösteriliyor.`).addFields(
            {name:`${message.guild.findReaction(Ses)} Genel Ses`, value: `${codeBlock("fix",moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`${kup} Kategori Sıralaması`,value:`${kategorilermsg.length> 0 ? kategorilermsg.join(`\n`) : "Veri bulunmuyor."}`,inline:false},
            {name:`${kup} Kanal Sıralaması (Top 5)`, value:voiceTop,inline:false},
            {name:`${kup} Zaman Dalgası`,value:`** ${saat} __Günlük Ses__: \`${sureCevir(voiceData ? voiceData.dailyStat : 0)}\`
${saat} __Haftalık Ses__: \`${sureCevir(voiceData ? voiceData.weeklyStat : 0)}\`
${saat} __Aylık Ses__: \`${sureCevir(voiceData ? voiceData.twoWeeklyStat : 0)}\`\n**`,inline:false},
            {name:`${kup} Sıralama`,value:`${messageTopVoice}`,inline:false}

          )] })
        }
        if(menu.values[0] == "kamera"){
          const kameraData = await voiceCameraUser.findOne({guildID:message.guild.id,userID:member.id});
          var gunlukKamera = kameraData ? kameraData.dailyStat : 0;
          var haftalıkKamera = kameraData ? kameraData.weeklyStat : 0;
          var aylıkKamera = kameraData ? kameraData.twoWeeklyStat : 0;
          var genelKamera = kameraData ? kameraData.totalStat : 0;
          var VocieKameraTopData = await voiceCameraUser.find({ guildID: message.guild.id});
          VocieKameraTopData = VocieKameraTopData.sort((a,b)=> b.totalStat - a.totalStat);
          var messageTopCamera = `\u200B`;
          for (let i = 0; i < VocieKameraTopData.length; i++) {
              if(VocieKameraTopData[i].userID == member.id) messageTopCamera += `Kamera Sıralamasında Şuan \`${i+1}.\` Sırada!`
          }
          const memberVoiceCameraData = await voiceGuildCameraUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
          let cameraTopChannel = memberVoiceCameraData.filter(x => message.guild.channels.cache.has(x.channelID)).length > 0 ? memberVoiceCameraData.splice(0, 10).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${convertNumbers(index + 1,message.guild)} <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."
          await msg.edit( {components:[row], embeds:[new GenerateEmbed()
            .setDescription(`${member}, Aşağıda senin kamera istatistiklerin gösteriliyor.`).addFields(
            {name:`${message.guild.findReaction(Kamera)} Genel Kamera`, value: `${codeBlock("fix",moment.duration(genelKamera).format("H [Saat], m [dakika]"))}`, inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`${kup} Kanal Sıralaması (Top 10)`, value:cameraTopChannel,inline:false},
            {name:`${kup} Zaman Dalgası`,value:`
            ** ${saat} __Günlük Kamera__: \`${sureCevir(gunlukKamera)}\`
            ${saat} __Haftalık Kamera__: \`${sureCevir(haftalıkKamera)}\`
            ${saat} __Aylık Kamera__: \`${sureCevir(aylıkKamera)}\`**`,inline:false},
            {name:`${kup} Sıralama`,value:`${messageTopCamera}`,inline:false}

          )] })
        }
        if(menu.values[0] == "yayin"){
          const kameraData = await voiceStreamerUser.findOne({guildID:message.guild.id,userID:member.id});
          var gunlukKamera = kameraData ? kameraData.dailyStat : 0;
          var haftalıkKamera = kameraData ? kameraData.weeklyStat : 0;
          var aylıkKamera = kameraData ? kameraData.twoWeeklyStat : 0;
          var genelKamera = kameraData ? kameraData.totalStat : 0;
          var VocieStreamTopData = await voiceStreamerUser.find({ guildID: message.guild.id});

          VocieStreamTopData = VocieStreamTopData.sort((a,b)=> b.totalStat - a.totalStat);
          var messageTopStream = `\u200B`;
          for (let i = 0; i < VocieStreamTopData.length; i++) {
              if(VocieStreamTopData[i].userID == member.id) messageTopStream += `Yayın Sıralamasında Şuan \`${i+1}.\` Sırada!`
          }
          const memberVoiceCameraData = await voiceGuildStreamUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
          let cameraTopChannel = memberVoiceCameraData.filter(x => message.guild.channels.cache.has(x.channelID)).length > 0 ? memberVoiceCameraData.splice(0, 10).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${convertNumbers(index + 1,message.guild)} <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."
          await msg.edit( {components:[row], embeds:[new GenerateEmbed()
            .setDescription(`${member}, Aşağıda senin yayın istatistiklerin gösteriliyor.`).addFields(
            {name:`${message.guild.findReaction(Yayın)} Genel Yayin`, value: `${codeBlock("fix",moment.duration(genelKamera).format("H [Saat], m [dakika]"))}`, inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`\u200B`,value:`\u200B`,inline:true},
            {name:`${kup} Kanal Sıralaması (Top 10)`, value:cameraTopChannel,inline:false},
            {name:`${kup} Zaman Dalgası`,value:`
            ** ${saat} __Günlük Yayin__: \`${sureCevir(gunlukKamera)}\`
            ${saat} __Haftalık Yayin__: \`${sureCevir(haftalıkKamera)}\`
            ${saat} __Aylık Yayin__: \`${sureCevir(aylıkKamera)}\`**`,inline:false},
            {name:`${kup} Sıralama`,value:`${messageTopStream}`,inline:false}

          )] })
        }

        })
      })
}else  return message.ReturnReply("This system is closed");

}
}
async function kategoriStatToplam(parentsArray, guild, author) {
    const data = await userParent.find({ guildID: guild.id, userID: author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    if(voiceStat == 0) return false;
    else return moment.duration(voiceStat).format("H [saat], m [dakika]");
  }
module.exports = Stats2;