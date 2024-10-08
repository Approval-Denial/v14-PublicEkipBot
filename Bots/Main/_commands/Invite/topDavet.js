
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const GuildLevelSystem  = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const inviter =  require("../../../../Global/Database/invite/inviteSchema")
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class topDavet extends Command {
    constructor(client) {
        super(client, {
            name: "topDavet",
            description: "Davet Bilgilerinizi Gösterir.",
            usage: ".topDavet",
            category: "Invite",
            aliases: ["topdavet","davettop"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:message.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
    let data = await inviter.find({ guildID: message.guild.id });
    let davetSıralama = await data.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).length > 0 ? data.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).sort((a,b)=>b.total - a.total).map((x,Index)=>`\`${Index+1}.\` <@${x.userID}>: __${x.total}__ \`(G:${x.regular} | S: ${x.fake})\``).splice(0,10).join("\n"):`Veri Bulunamadı!`
message.channel.send({embeds:[new GenerateEmbed().setDescription(`**${message.guild.name}**, aşağıda en çok davet yapan **10** kullanıcı verilmiştir.`).setFields(
    {name:"Top 10 Davet", value:`**${davetSıralama}**`}
)]})
 }else return message.ReturnReply("This system is closed");
}
}
module.exports = topDavet;