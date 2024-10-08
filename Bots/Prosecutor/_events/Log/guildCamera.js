const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {EmbedBuilder} = require("discord.js")
const { Events: { VoiceStateUpdate } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class CameraStat extends Event {
    constructor(client) {
        super(client, {
            name: VoiceStateUpdate,
            enabled: true,
        });    
    }    

 async   onLoad(oldState, newState) {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    const startLog = await oldState.member.guild.channels.cache.find(x=> x.name == "camerastart_log");
    const stopLog = await oldState.member.guild.channels.cache.find(x=> x.name == "camerastop_log");
    if (((oldState.member.voice.channel && newState.member.voice.channel) && newState.member.voice.selfVideo == true)) {
        if(startLog)  return startLog.send({
            embeds:[
        new GenerateEmbed()
        .setAuthor({name:newState.member.user.tag,iconURL:newState.member.user.avatarURL({dynamic:true})})
        .setDescription(`\`${newState.member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${newState.member.voice.channel.name}** isimli ses kanalında **Kamera** açtı!`)
            ]
        })
    }
     if ((oldState.member.voice.selfVideo == true && newState.member.voice.selfVideo == false)) {
      if(stopLog)return stopLog.send({
            embeds:[
        new GenerateEmbed()
        .setAuthor({name:newState.member.user.tag,iconURL:newState.member.user.avatarURL({dynamic:true})})
        .setDescription(`\`${newState.member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${newState.member.voice.channel.name}** isimli ses kanalında **Kamera** kapattı!`)
            ]
        })
    }


    }
}    


module.exports = CameraStat;
