
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const yetkiliyapdb = require("../../../../Global/Database/SystemDB/yetkiliyap")
const yetkiliyapstaffdb = require("../../../../Global/Database/SystemDB/yetkiliyap.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class yetkim extends Command {
    constructor(client) {
        super(client, {
            name: "yetkim",
            description: "Yetkililinin görevleri ve yetkili istatistiklerini gösterir.",
            usage: ".yetkim",
            category: "Staff",
            aliases: ["staff","yt"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms,roles.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
      var missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id})
    const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
    if(authorityStatus == true) {
const row = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder().setCustomId("bilgi").setLabel("Bilgi").setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("gorevler").setLabel("Görevler").setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("durum").setLabel("Durum").setStyle(ButtonStyle.Secondary),
  )
  guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id});
        let staffrank = guildAutoStaff ? guildAutoStaff.staffRank : 1;
message.channel.send({components:[row],embeds:[new GenerateEmbed().setDescription(`Merhaba ${member},
aşağıda ki butonları kullanarak yetkiniz, yetki durumunuz ve görevleriniz hakkında bilgi alablirsiniz.

**Yetkili Bilgisi:**
    \`Seviyesi  :\` **[${staffrank}]**
    \`Yetkisi   :\` <@&${StaffAutoRank[staffrank].Role}>
    \`Yetkili   :\` <@${guildAutoStaff.staffID}> **(\`${guildAutoStaff.staffID}\`)**
    \`Tarih     :\` <t:${(guildAutoStaff.startingdate/1000).toFixed()}>** (<t:${(guildAutoStaff.startingdate/1000).toFixed()}:R>)**
`)
]}).then(async msg => {
  var filter = (button) => button.user.id === message.member.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
  collector.on('collect', async (i) => {
  await i.deferUpdate();
  if(i.customId == "bilgi"){
    missionsystemdb = await missionsystem.findOne({guildID:message.guild.id,userID:member.id});
  await msg.edit({components:[row],embeds:[new GenerateEmbed().setDescription(`Merhaba ${member},
  aşağıda ki butonları kullanarak yetkiniz, yetki durumunuz ve görevleriniz hakkında bilgi alablirsiniz.
  
  **Yetkili Bilgisi:**
  \`Seviyesi  :\` **[${staffrank}]**
  \`Yetkisi   :\` <@&${StaffAutoRank[staffrank].Role}>
  \`Yetkili   :\` <@${guildAutoStaff.staffID}> **(\`${guildAutoStaff.staffID}\`)**
  \`Tarih     :\` <t:${(guildAutoStaff.startingdate/1000).toFixed()}>** (<t:${(guildAutoStaff.startingdate/1000).toFixed()}:R>)**

  **Aktiviteler:**
  \`Ses     :\` **${missionsystemdb ? moment.duration(missionsystemdb.voiceTask).format("H [Saat], m [dakika]") : "Ses Verisi Bulunamadı!"}**
  \`Mesaj   :\` **${missionsystemdb ? missionsystemdb.messageTask : "Mesaj Verisi Bulunamadı!"}**
  \`Kayıt   :\` **${missionsystemdb ? missionsystemdb.registrationTask : "Kayıt Verisi Bulunamadı!"}**
  \`Davet   :\` **${missionsystemdb ? missionsystemdb.InviteTask : "Davet Verisi Bulunamadı!"}**
  \`Taglı   :\` **${missionsystemdb ? missionsystemdb.tagInviteTask : "Taglı Verisi Bulunamadı!"}**
  \`Yetkili :\` **${missionsystemdb ? missionsystemdb.StaffInviteTask : "Yetkili Verisi Bulunamadı!"}**
  `)
  ]})
  }
  if(i.customId == "gorevler"){
    missionsystemdb = await missionsystem.findOne({guildID:message.guild.id,userID:member.id});
    await msg.edit({components:[row],embeds:[new GenerateEmbed().setDescription(`Merhaba ${member},
    aşağıda ki butonları kullanarak yetkiniz, yetki durumunuz ve görevleriniz hakkında bilgi alablirsiniz.
    
    **Görevleri;**
    \`Ses Görevi     :\` ${await progressBar(missionsystemdb ? missionsystemdb.voiceTask : 0,StaffAutoRank[staffrank].Missions.V,10)} \`[${sureCevir(missionsystemdb ? missionsystemdb.voiceTask : 0)}/${moment.duration(StaffAutoRank[staffrank].Missions.V).format("H [Saat]")}]\`
    \`Mesaj Görevi   :\` ${await progressBar(missionsystemdb ? missionsystemdb.messageTask : 0,StaffAutoRank[staffrank].Missions.M,10)} \`[${missionsystemdb ? missionsystemdb.messageTask : 0}/${StaffAutoRank[staffrank].Missions.M}]\`
    \`Kayıt Görevi   :\` ${await progressBar(missionsystemdb ? missionsystemdb.registrationTask : 0,StaffAutoRank[staffrank].Missions.R,10)} \`[${missionsystemdb ? missionsystemdb.registrationTask : 0}/${StaffAutoRank[staffrank].Missions.R}]\`
    \`Davet Görevi   :\` ${await progressBar(missionsystemdb ? missionsystemdb.InviteTask : 0,StaffAutoRank[staffrank].Missions.I,10)} \`[${missionsystemdb ? missionsystemdb.InviteTask : 0}/${StaffAutoRank[staffrank].Missions.I}]\`
    \`Taglı Görevi   :\` ${await progressBar(missionsystemdb ? missionsystemdb.tagInviteTask : 0,StaffAutoRank[staffrank].Missions.TI,10)} \`[${missionsystemdb ? missionsystemdb.tagInviteTask : 0}/${StaffAutoRank[staffrank].Missions.TI}]\`
    \`Yetkili Görevi :\` ${await progressBar(missionsystemdb ? missionsystemdb.StaffInviteTask : 0,StaffAutoRank[staffrank].Missions.SI,10)} \`[${missionsystemdb ? missionsystemdb.StaffInviteTask : 0}/${StaffAutoRank[staffrank].Missions.SI}]\`
    `)
    ]})
  }
  if(i.customId == "durum"){
    missionsystemdb = await missionsystem.findOne({guildID:message.guild.id,userID:member.id});
  await msg.edit({components:[row],embeds:[new GenerateEmbed().setDescription(`Merhaba ${member},
  aşağıda ki butonları kullanarak yetkiniz, yetki durumunuz ve görevleriniz hakkında bilgi alablirsiniz.
  
  **Yetki Durumu:**
  \`Sonra ki Yetkisi  :\` <@&${StaffAutoRank[staffrank+1].Role}>
  \`Sonra ki Seviyesi :\` **[${staffrank+1}]**
  \`Gerekli Puan      :\` **${StaffAutoRank[staffrank+1].AMP}**
  \`Kalan Puan        :\` **${(StaffAutoRank[staffrank].AMP) - (guildAutoStaff ? guildAutoStaff.AMP : 0)}**
  \`İlerleme Durumu   :\` ${await progressBar(guildAutoStaff ? guildAutoStaff.AMP : 0,StaffAutoRank[staffrank+1].AMP,8)}

  `)
  ]})
  }
  })
})

    } else return message.ReturnReply("Cannot use command")


      }else  return message.ReturnReply("This system is closed");
    }else return message.ReturnReply("Cannot use command")
  }
}
module.exports = yetkim;
/*
    

    

*/