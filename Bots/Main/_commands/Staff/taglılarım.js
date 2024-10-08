
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const tagaldirstaff = require("../../../../Global/Database/SystemDB/tagaldir.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class taglılarım extends Command {
    constructor(client) {
        super(client, {
            name: "taglılarım",
            description: "Kişinin tag aldırdığı kişileri gösterir.",
            usage: ".taglılarım (@Approval/ID)",
            category: "Staff",
            aliases: ["taglılarım","taglılar","taglilarim"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms,roles.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
  let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  var sayi = 1
  var currentPage = 1
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const taglılardb = await tagaldirstaff.findOne({guildID:message.guild.id,userID:member.id});
    if(!taglılardb)return message.ReturnReply("No tagged people")
    var taglılar = [];
    for (let index = 0; index < taglılardb.users.length; index++) {
        sayi++
        const info = taglılardb.users[index];
        taglılar.push({UserID: info.memberId, Date:info.date})
    }
    let pages = taglılar.chunk(10)
    let geri = new ButtonBuilder().setCustomId('geri').setEmoji(await emojiBul("appEmoji_solOk")).setLabel("Önce ki Sayfa").setStyle(ButtonStyle.Secondary);
    let ileri = new ButtonBuilder().setCustomId('ileri').setEmoji(await emojiBul("appEmoji_sagOk")).setLabel("Sonra ki Sayfa").setStyle(ButtonStyle.Secondary)
    let carpi = new ButtonBuilder().setCustomId('cancel').setEmoji(await emojiBul("appEmoji_cop")).setLabel("Sayfaları Kapat").setStyle(ButtonStyle.Secondary)
    if(sayi < 5){
geri.setDisabled(true);
ileri.setDisabled(true);
}
message.channel.send({ components: [new ActionRowBuilder()
  .addComponents(
      geri,
    carpi,
      ileri

  )],embeds:[
  new GenerateEmbed().setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
  .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).user.tag} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
]})
  .then(async msg =>{
    var filter = (button) => button.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
    collector.on('collect', async (button, user) => {
        await button.deferUpdate();
    if (button.customId === "ileri") {
      if (currentPage == pages.length) return;
      currentPage++;
      await msg.edit({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
           carpi,
            ileri
      
        )],embeds:[
        new GenerateEmbed().setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
        .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
      ]})
    }
    if (button.customId === "geri") {
      if (currentPage == pages.length) return;
      currentPage--;
      await msg.edit({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
           carpi,
            ileri
      
        )],embeds:[
        new GenerateEmbed().setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
        .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
      ]})
    }
    if (button.customId === "geri"){
      if (button.customId === "cancel") {
        if (msg) msg.delete().catch(err => { });
        if (message) return message.delete().catch(err => { });
        await button.editReply({ content: `**Taglı Geçmişi Silindi!**`})
    }
    }
    })    
  })


} else  return message.ReturnReply("This system is closed");
}else return message.ReturnReply("Cannot use command")
}
}
module.exports = taglılarım;