const { Collection, EmbedBuilder, PermissionsBitField,codeBlock } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {WelcomeLeave} = require("canvafy")
const { Events: { GuildMemberAdd } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: GuildMemberAdd,
            enabled: true,
        });
    }
    
 async onLoad(member) {
if(member.user.bot) return;
const log = await member.guild.channels.cache.find(x=> x.name === "join-log")
const welcome = await new WelcomeLeave()
.setAvatar(member.user.avatar ? member.user.displayAvatarURL({ forceStatic: true, extension: "png" }) : member.guild.icon ? member.guild.iconURL({forceStatic: true, extension: "png"}) : "https://cdn.discordapp.com/avatars/852800814808694814/f049464229d9f1e032fcd19c9e86b186.webp")
.setBackground("image", member.guild.banner ? member.guild.bannerURL({forceStatic: true, extension: "png" ,size:2048}) : "https://cdn.discordapp.com/attachments/1087030211813593190/1105791152013185044/SIBLING_-_SVSSS_fanfic_story.jpg")
.setTitle("Aramıza Katıldı!")
.setDescription(`${member.user.tag}, Sunucuya Hoşgeldin, seninle beraber ${member.guild.members.cache.size} kişi olduk 🎉`)
.setBorder("#2a2e35")
.setAvatarBorder("#2a2e35")
.setOverlayOpacity(0.8)
.build();

 if(log) await log.send({
  files: [{
    attachment: welcome.toBuffer(),
    name: `welcome-${member.id}.png`
  }]
});
//log.send({embeds:[new GenerateEmbed().setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})}).setDescription(`${member}, <t:${(Date.now()/1000).toFixed()}:R> sunucuya katıldı, kendisiyle beraber **${member.guild.memberCount}** kullanıcı olduk!`)]})
    }
}

module.exports = guildMemberAdd
