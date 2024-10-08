const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class voiceChannelSwitch extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelSwitch",
            enabled: true,
        });
    }
    
 async onLoad(member, oldChannel, newChannel) {
if(member.user.bot) return;
const log = await oldChannel.guild.channels.cache.find(x=> x.name == "voiceswitch_log")
if(log) await log.send({
    embeds:[
new GenerateEmbed()
.setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})})
.setDescription(`\`${member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${oldChannel.name}** isimli ses kanaldan çıkıp **${newChannel.name}** kanalına giriş yaptı!`)
    ]
})

    }
}

module.exports = voiceChannelSwitch
