const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const leaderBoarddb = require("../../../../Global/Database/leaderBoard");
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const { CronJob } = require("cron");
const {ID} = require("../../../../Global/Config/Guild").Guild
const {EmbedBuilder,Events} = require("discord.js")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class leaderBoard extends Event {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            enabled: true,
        });    
    }    

 async   onLoad() {
    const guild = client.guilds.cache.get(ID)
  const embed =  new GenerateEmbed().setColor("2F3136").setAuthor({name: guild.name,iconURL: guild.iconURL()})
    .setFooter({text: "Developed By Luppux", iconURL: guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})})

    new CronJob("00 00 * * *", async () => {
const data = await leaderBoarddb.findOne({guildID:guild.id})
const only = data ? data.only : false;
if(only == true){
    const messageUsersData = await messageUser.find({ guildID: guild.id })
    const voiceUsersData = await voiceUser.find({ guildID: guild.id })
    const messageUsers = messageUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> guild.members.cache.get(x.userID)).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.totalStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> guild.members.cache.get(x.userID)).splice(0, 25).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\``).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
    const kanal = await guild.channels.cache.get(data.channelID)
    const mesajlistesi = await kanal.messages.fetch(data.MessageBoardID)
    const seslistesi = await kanal.messages.fetch(data.VoiceBoardID)
if(mesajlistesi) mesajlistesi.edit({embeds:[new GenerateEmbed().setTitle("Mesaj Sıralaması").setDescription(`${mesaj}`)]})
if(seslistesi) seslistesi.edit({embeds:[new GenerateEmbed().setTitle("Ses Sıralaması").setDescription(`${ses}`)]})
}
    }, null, true, "Europe/Istanbul").start();
   
    }
}    


module.exports = leaderBoard;
