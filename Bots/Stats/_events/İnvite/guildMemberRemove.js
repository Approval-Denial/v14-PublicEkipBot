const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const ms = require('ms');
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
  const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis");
const { taskProgress } = require('../../../../Global/Functions/taskProgress');
class MemberRemove extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            enabled: true,
        });
    }
    
 async onLoad(member) {

  const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:member.guild.id});
  const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
  const invChannel = member.guild.channels.cache.get(channels.inviteLog);
  if(!invChannel) return console.log("İnv Log kanalı Bulunamadı!")
  let fakeControl = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7

  let inviteUser = await inviteSchema.findOne({ guildID: member.guild.id, userID: member.id })
  let inviter = client.users.cache.get(inviteUser.inviter)
  const solOk = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_solOk")
  const carpi = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi")
  const tik = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_tik")
  if(!inviter) {

      if(invChannel) invChannel.send({ content: `${solOk} **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> sunucumuzdan ayrıldı, **ÖZEL URL** ile giriş yapmıştı. ${fakeControl === true ? "`❌`": ""}` })

  } else if(inviter.id === inviteUser.inviter) {
      await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: -1, regular: -1, leave: 1 } }, { upsert: true })
      const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });
      const toplam = data.total+data.bonus 
      if(invChannel) invChannel.send({ content: `${solOk} **${inviter.tag}** (**${toplam+1}**) daveti ile sunucuya katılan ${solOk}  **${member.user.tag}**, <t:${Math.floor(Date.now() / 1000)}:R> sunucudan ayrıldı. kalan daveti: **${toplam}** `});
      await taskProgress(member,"Invite",-1);

  
  }
}
 }
}
module.exports = MemberRemove;