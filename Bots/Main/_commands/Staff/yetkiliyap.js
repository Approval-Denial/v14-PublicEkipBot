
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
class yetkiliyap extends Command {
    constructor(client) {
        super(client, {
            name: "yetkiliyap",
            description: "Yetkili yapmak ve görev vermek için kullanılır.",
            usage: ".yetkiliyap @Approval/ID",
            category: "Staff",
            aliases: ["yetkiliyap","ytyap"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms,roles.registerStaffRole,"1209603254468612107"].some(x=> message.member.roles.cache.has(x))){

      let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.ReturnReply("member not specified")
  if(member.id == message.member.id) return message.ReturnReply("its a own")
  var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id})
  const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
  if(authorityStatus == true) return message.reply({embeds:[new GenerateEmbed().setDescription(`${member} <t:${(guildAutoStaff.startingdate/1000).toFixed()}:R> <@${guildAutoStaff.staffID}> tarafından yetkili yapılmıştır.`)]});
  else{
    const row = new ActionRowBuilder()
    .addComponents(
     new ButtonBuilder().setCustomId("evet").setLabel("Evet").setStyle(ButtonStyle.Success),
     new ButtonBuilder().setCustomId("hayir").setLabel("Hayır").setStyle(ButtonStyle.Danger),
    )
    let msg = await message.channel.send({content:`[${member}]`,embeds:[new GenerateEmbed().setDescription(`${message.member} daveti ile yetkili olmayı kabul ediyor musun ?`)],components:[row]})
    var filter = (button) => button.user.id === member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
    collector.on('collect', async (i) => {
    await i.deferUpdate();
    if(i.customId == "evet"){
      
      await guildAutoStaffdb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{staffID:message.member.id,startingdate:Date.now(),staffRank:1,authorityStatus:true,AMP:0}},{upsert:true});
      await yetkiliyapdb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{only:true,Date:Date.now(),Staff:message.member.id}},{upsert:true});
      await yetkiliyapstaffdb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{count:1},$push:{users:{memberId:member.id,date:Date.now()}}},{upsert:true})
      await member.roles.add([StaffAutoRank[1].Role,...StaffAutoRank[1].Powers]).catch(err => { });
      guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id});
      message.reply({embeds:[new GenerateEmbed().setDescription(`${message.member}, ${member} yetkili olarak işaretlendi!`)]})
      await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{StaffInviteTask:1}},{upsert:true})
      await missionsControled(message.member.id,message.guild.id,"Yetkili")
  if (msg) await msg.delete()

    }
  if(i.customId == "hayir"){
    message.reply({content:"`Reddedildi!`",ephemeral:true})
    if (msg) await msg.delete()
    if(message) await message.delete();
    }
    
    })
    collector.on("end", async (collected, reason) => {
        if (reason === "time") {
          if (msg) await msg.delete()
          if(message) await message.delete();
        }
      });

  }


      }else  return message.ReturnReply("This system is closed");
    }else return message.ReturnReply("Cannot use command")
  }
}
module.exports = yetkiliyap;
/*
**Yetkili Bilgisi:**
    \`Seviyesi  :\` **[1]**
    \`Yetkisi   :\` <@&${StaffAutoRank[staffrank].Role}>
    \`Yetkili   :\` ${message.member} **(${message.member.user.tag})**
    \`Tarih     :\` <t:${(Date.now()/1000).toFixed()}>** (<t:${(Date.now()/1000).toFixed()}:R>)**
    
    **Görevleri;**
    \`Kayıt Görevi  :\`  \`[0/${StaffAutoRank[staffrank].Missions.R}]\`
    \`Ses Görevi    :\` \`[${sureCevir(60000)}/${sureCevir(StaffAutoRank[staffrank].Missions.V)}]\`
    \`Mesaj Görevi  :\` \`[0/${StaffAutoRank[staffrank].Missions.M}]\`
    \`Davet Görevi  :\` \`[0/${StaffAutoRank[staffrank].Missions.I}]\`
    \`Taglı Görevi  :\` \`[0/${StaffAutoRank[staffrank].Missions.TI}]\`
    \`Yetkili Görevi:\` \`[0/${StaffAutoRank[staffrank].Missions.SI}]\`
    
    **Yetki Durumu:**
    ${await progressBar(StaffAutoRank[staffrank].AMP,StaffAutoRank[staffrank+1].AMP,6)}: **<@&${StaffAutoRank[staffrank].Role}> __>__ <@&${StaffAutoRank[staffrank+1].Role}>**
*/