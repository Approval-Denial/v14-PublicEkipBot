const { Event } = require("../../../../Global/Structures/Default.Events");
const { EmbedBuilder,PermissionsBitField,InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters, ActionRow,FileType} = require("discord.js");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const {Guild} = require("../../../../Global/Config/Guild")
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const moment = require("moment");
const cooldowns = new Map();
require("moment-duration-format");
moment.locale("tr")
class modalsubmit extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate",
            enabled: true,
        });    
    }    

 async onLoad(interaction) {
    if (interaction.type != InteractionType.ModalSubmit) return;

    if (interaction.customId === 'mazahlar') {
      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('utku')
          .setLabel("Kabul Et")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('efe')
          .setLabel("Reddet")
          .setStyle(ButtonStyle.Danger),
   
      );
      let mazaret = interaction.fields.getTextInputValue('soru35');
      let embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Mazaret Mesajı")
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, forceStatic: true }))
          .setDescription(`${interaction.user} Kullanıcısının Mazareti\n\n\`\`\`${mazaret}\`\`\``);
    interaction.reply({content: `Mazaretiniz gönderildi, yetkililer tarafından onay alınca mesaj gelicektir.`, ephemeral: true});
      const targetGuildId = Guild.ID;  
      const targetGuild = interaction.client.guilds.cache.get(targetGuildId);
          const targetChannel = targetGuild.channels.cache.find(channel => channel.name === "mazaret-log");
            let msg = await  targetChannel.send({ embeds: [embed]})
     
     }
  
    if (interaction.customId === 'booster31') {
        if(!interaction.member.roles.cache.has("1250816950926573569") && !interaction.member.roles.cache.has("1250866663520211045")) return interaction.reply({content:"Renk rollerini almak için sunucuya takviye yapmanız gerekmektedir.", ephemeral: true})
     
      if (cooldowns.has(interaction.user.id)) {
          const expirationTime = cooldowns.get(interaction.user.id);
          const remainingTime = (expirationTime - Date.now()) / 1000;
  
          return interaction.reply({
              content: `Bu komutu tekrar kullanabilmek için lütfen ${remainingTime.toFixed(1)} saniye bekleyin.`,
              ephemeral: true
          });
      }
      const isim = await interaction.fields.getTextInputValue("soru1");
      const data = await tagsistem.findOne({guildID: interaction.guild.id});
      let yazilacakIsim;
      const a = data.only;
      const tag = `${a == true ? `${data.Type == "Public" ? `${interaction.member.displayName.includes(data.Tag) ? `${data.Tag}` : `${data.unTag}`}` : `${data.nameTags.some(x=> interaction.member.displayName.includes(x) || interaction.member.user.discriminator == data.NumberTag) ? `${data.Tag}` : `${data.unTag}`}`}` : ""}`;
      yazilacakIsim = `${tag} ${isim}`;
      interaction.member.setNickname(`${yazilacakIsim}`);
      await interaction.reply({content: `İsminiz Değiştirildi`, ephemeral: true});
      const cooldownTime = 30 * 60 * 1000;
      cooldowns.set(interaction.user.id, Date.now() + cooldownTime);
      setTimeout(() => {
          cooldowns.delete(interaction.user.id);
      }, cooldownTime);
  }
      if(interaction.customId == "sikayetModal"){
        let s1 = interaction.fields.getTextInputValue('soru1');
        interaction.reply({content:`> ✅ **Şikayetin Alındı!**`,ephemeral:true});
     
       let embed = new EmbedBuilder()
       .setColor("Red")
       .setTitle("Şikayet Bildirisi")
       .setThumbnail(interaction.user.displayAvatarURL({dynamic:true,forceStatic:true}))
       .setDescription(`${interaction.user} Kullanıcısının Şikayeti\n\n\`\`\`${s1}\`\`\``)
       const log = await interaction.guild.channels.cache.find(x=> x.name == "öneri-şikayet-log")
           if(log) await log.send({embeds:[embed]})
           else console.error("server-support İsimli Kanal Sunucuda Bulunmamakta, Modal Gönderilemedi!")
      } 
      if(interaction.customId == "istekModal"){
        let s1 = interaction.fields.getTextInputValue('soru1');
        interaction.reply({content:`> ✅ **Önerin Alındı!**`,ephemeral:true});
     
       let embed = new EmbedBuilder()
       .setColor("Green")
       .setTitle("Öneri/İstek Bildirisi")
       .setThumbnail(interaction.user.displayAvatarURL({dynamic:true,forceStatic:true}))
       .setDescription(`${interaction.user} Kullanıcısının Öneri/İstek Bildirisi\n\n\`\`\`${s1}\`\`\``)
       const log = await interaction.guild.channels.cache.find(x=> x.name == "öneri-şikayet-log")
           if(log) await log.send({embeds:[embed]})
           else console.error("server-support İsimli Kanal Sunucuda Bulunmamakta, Modal Gönderilemedi!")
      } 
      if (interaction.customId === 'başvuruabim') {
        const voiceData = await voiceUser.findOne({ guildID: interaction.guild.id, userID: interaction.user.id });
        const messageData = await messageUser.findOne({ guildID: interaction.guild.id, userID: interaction.user.id });
        const isim_yas = interaction.fields.getTextInputValue('isim-yas');
        const baskayerdesponsor = interaction.fields.getTextInputValue('baskayerdesponsor');
        const nelerverebilir = interaction.fields.getTextInputValue('nelerverebilir');
        const kaccekilis = interaction.fields.getTextInputValue('kaccekilis');
        const karsilik = interaction.fields.getTextInputValue('karsilik');
        let sagok = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_unlem"))
        let sagok2 = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_boskutu"))
        let member = interaction.guild.members.cache.get(interaction.user.id)
        interaction.reply({content:`Başvurunuz başarıyla gönderildi! Teşekkür ederiz.`,ephemeral:true})
        interaction.guild.channels.cache.find(x=> x.name === "yetkili-başvuru-log").send({
            content:`${interaction.user}`,
            embeds:[
                new EmbedBuilder()
                .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL()})
                .setThumbnail(interaction.guild.bannerURL())
                .setDescription(`
${sagok} __**Kullanıcı Hakkında**__
${sagok2} **ID:** \` ${interaction.user.id} \`
${sagok2} **Kullanıcı:** ${interaction.user}
${sagok2} **Sunucuya Katılım Tarih:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>\n
${sagok} __**Başvuru Bilgi**__
${sagok2} **İsim ve Yaş:** \`${isim_yas}\`
${sagok2} **Daha önce başka yerde yetkili oldun mu?:**\`${baskayerdesponsor}\`
${sagok2} **Bize neler katabilirsin?:**\`${nelerverebilir}\`
${sagok2} **Günde Ne kadar aktif olabilirsin?:**\`${kaccekilis}\`
${sagok2} **Neden burada yetkili olmalısınız?:**\`${karsilik}\`\n
${sagok} __**İstatislik Bilgileri**__
${sagok2} **Toplam Mesaj:** \` ${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj \`
${sagok2} **Toplam Ses:** \` ${moment.duration(voiceData ? voiceData.totalStat : 0).format("H [Saat], m [dakika]")} \`
`)
                .setFooter({text:`Aşağıda ki butonları kullanarak onaylayıp reddedebilirsin.`})
            ],
            components:[
                new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder().setCustomId("onayla").setEmoji(await emojiBul("appEmoji_tik")).setLabel("Onayla").setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId("reddedildi").setEmoji(await emojiBul("appEmoji_carpi")).setLabel("Reddet.").setStyle(ButtonStyle.Danger),
                )
            ]
        }).then(async message => {
            const filter = d =>  interaction.guild.members.cache.get(d.user.id).permissions.has(PermissionsBitField.Flags.Administrator)
            const collector = message.createMessageComponentCollector({ filter: filter})
            collector.on('collect', async (ytInter) => {
            await ytInter.deferUpdate()
            if(ytInter.customId == "onayla"){
            let member = message.mentions.members.first();
            var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id})
            await guildAutoStaffdb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{staffID:message.member.id,startingdate:Date.now(),staffRank:1,authorityStatus:true,AMP:0}},{upsert:true});
            await member.roles.add([StaffAutoRank[1].Role,...StaffAutoRank[1].Powers]).catch(err => { });
            guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id});
            await message.edit({components:[]})
            member.send({content:`Yetkili başvurusu için yaptığınız başvuru kabul edildi!`}).catch(x=> undefined)
            }
            if(ytInter.customId == "reddedildi"){
                await message.edit({components:[]})
                let member = message.mentions.members.first();
                member.send({content:`Yetkili başvurunuz ${ytInter.user} tarafından reddedildi!`}).catch(x=> undefined)
            }
            })
        })
    }
    if (interaction.customId === 'sponsor-basvuru-form') {
   
      const isim_yas = interaction.fields.getTextInputValue('isim-yas');
      const baskayerdesponsor = interaction.fields.getTextInputValue('sponsor');
      const nelerverebilir = interaction.fields.getTextInputValue('sa');
      let sagok = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_unlem"))
      let sagok2 = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_boskutu"))
      let member = interaction.guild.members.cache.get(interaction.user.id)
      interaction.reply({content:`Başvurunuz başarıyla gönderildi! Teşekkür ederiz.`,ephemeral:true})
      interaction.guild.channels.cache.find(x=> x.name === "sponsor-başvuru-log").send({
          content:`${interaction.user}`,
          embeds:[
              new EmbedBuilder()
              .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL()})
              .setThumbnail(interaction.guild.bannerURL())
              .setDescription(`
${sagok} __**Kullanıcı Hakkında**__
${sagok2} **ID:** \` ${interaction.user.id} \`
${sagok2} **Kullanıcı:** ${interaction.user}
${sagok2} **Sunucuya Katılım Tarih:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>\n
${sagok} __**Başvuru Bilgi**__
${sagok2} **İsim ve Yaş:** \`${isim_yas}\`
${sagok2} **Daha önce başka yerde yetkili oldun mu?:**\`${baskayerdesponsor}\`
${sagok2} **Bize neler katabilirsin?:**\`${nelerverebilir}\`
`)
              .setFooter({text:`Aşağıda ki butonları kullanarak onaylayıp reddedebilirsin.`})
          ],
          components:[
              new ActionRowBuilder()
              .setComponents(
                  new ButtonBuilder().setCustomId("onayla").setEmoji(await emojiBul("appEmoji_tik")).setLabel("Onayla").setStyle(ButtonStyle.Success),
                  new ButtonBuilder().setCustomId("reddedildi").setEmoji(await emojiBul("appEmoji_carpi")).setLabel("Reddet.").setStyle(ButtonStyle.Danger),
              )
          ]
      }).then(async message => {
          const filter = d => interaction.guild.members.cache.get(d.user.id).permissions.has(PermissionsBitField.Flags.Administrator)
          const collector = message.createMessageComponentCollector({ filter: filter})
          collector.on('collect', async (ytInter) => {
          await ytInter.deferUpdate()
          if(ytInter.customId == "onayla"){
          let member = message.mentions.members.first();
          await member.roles.add("1162418564943327343").catch(err => { });
          await message.edit({components:[]})
          member.send({content:`Sponsorluk için yaptığınız başvuru kabul edildi!`}).catch(x=> undefined)
          }
          if(ytInter.customId == "reddedildi"){
              await message.edit({components:[]})
              let member = message.mentions.members.first();
              member.send({content:`Sponsor başvurunuz ${ytInter.user} tarafından reddedildi!`}).catch(x=> undefined)
          }
          })
      })
  }
  } 

  

}    


module.exports = modalsubmit;
function removeToID(ID,Array){
  const index = Array.indexOf(ID);
  if(index !== -1){
    Array.splice(index,1)
  }
  return Array
}