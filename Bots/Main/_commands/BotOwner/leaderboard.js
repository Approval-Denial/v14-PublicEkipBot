
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const req = require('request');

const leaderBoarddb = require("../../../../Global/Database/leaderBoard");
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class leaderboard extends Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            description: "Hocam komut işte",
            usage: ".leaderboard KanalID",
            category: "Approval",
            aliases: ["leaderboard"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
if(args[0] == "kur"){
const kanal = message.guild.channels.cache.get(args[1])
const leaderboardData = await leaderBoarddb.findOne({guildID:message.guild.id})
if(!leaderboardData){
        const messageUsersData = await messageUser.find({ guildID: message.guild.id })
        const voiceUsersData = await voiceUser.find({ guildID: message.guild.id })
        const messageUsers = messageUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.totalStat).toLocaleString()} mesaj\``).join(`\n`);
        const voiceUsers = voiceUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\``).join(`\n`);
        const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
        const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
        let a = await kanal.send({embeds:[new GenerateEmbed().setTitle("Mesaj Sıralaması").setDescription(`${mesaj}`)]});
        let b = await kanal.send({embeds:[new GenerateEmbed().setTitle("Ses Sıralaması").setDescription(`${ses}`)]})
        await leaderBoarddb.findOneAndUpdate(
            {guildID:message.guild.id
        },
            {$set:{
                only:true,
                MessageBoardID:a.id,
                VoiceBoardID:b.id,
                channelID:kanal.id
            }},{upsert:true})
            if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));


} else {
    if(message) message.replyReaction(message.guild.findReaction(Cross,"ID"));

return message.reply({content:"Leaderboard zaten kurulu?"})
}
} else if(args[0] == "sil"){
    const leaderboardData = await leaderBoarddb.findOne({guildID:message.guild.id})
if(leaderboardData){
    const kanal = await message.guild.channels.cache.get(leaderboardData.channelID)
    const mesajlistesi = await kanal.messages.fetch(leaderboardData.MessageBoardID)
    const seslistesi = await kanal.messages.fetch(leaderboardData.VoiceBoardID)
    if(mesajlistesi) mesajlistesi.delete();
    if(seslistesi) seslistesi.delete();
    await leaderBoarddb.findOneAndDelete({guildID:message.guild.id},{upsert:true})
    if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

}
else {
    if(message) message.replyReaction(message.guild.findReaction(Cross,"ID"));

    return message.reply({content:"hocam kurulu değil :D"})
    }
} else if (args[0] = "yenile"){
    let guild = message.guild;

    const data = await leaderBoarddb.findOne({guildID:guild.id})
const only = data ? data.only : false;
if(only == true){
    const messageUsersData = await messageUser.find({ guildID: guild.id })
    const voiceUsersData = await voiceUser.find({ guildID: guild.id })
    const messageUsers = messageUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.totalStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\``).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
    const kanal = await guild.channels.cache.get(data.channelID)
    const mesajlistesi = await kanal.messages.fetch(data.MessageBoardID)
    const seslistesi = await kanal.messages.fetch(data.VoiceBoardID)
if(mesajlistesi) mesajlistesi.edit({embeds:[new GenerateEmbed().setTitle("Mesaj Sıralaması").setDescription(`${mesaj}`)]})
if(seslistesi) seslistesi.edit({embeds:[new GenerateEmbed().setTitle("Ses Sıralaması").setDescription(`${ses}`)]})
if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

} else {
    if(message) message.replyReaction(message.guild.findReaction(Cross,"ID"));

}
    
}

else {
    if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

    const leaderboardData = await leaderBoarddb.findOne({guildID:message.guild.id})
if(leaderboardData){
    const kanal = await message.guild.channels.cache.get(leaderboardData.channelID)
message.reply({content:`**Leader Board**
> ${kanal} kanalında aktif!`})
}
else {
    if(message) message.replyReaction(message.guild.findReaction(Cross,"ID"));

    return message.reply({content:"hocam kurulu değil :D"})
    }
}
 }
}
module.exports = leaderboard;