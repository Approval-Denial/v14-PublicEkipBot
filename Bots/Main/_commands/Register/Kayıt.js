
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, StringSelectMenuBuilder, codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const Users = require("../../../../Global/Database/Users")
const taglialimdb = require("../../../../Global/Database/SystemDB/guild.tagli.alim")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Kayıt extends Command {
  constructor(client) {
    super(client, {
      name: "kayıt",
      description: "Sunucuya üyeleri kayıt etmek için kullanılır.",
      usage: ".kayıt @Approval/ID isim yaş",
      category: "Register",
      aliases: ["e", "k", "erkek", "kız", "kayıt", "kayit"],

      enabled: true,
    });
  }
  async onRequest(client, message, args, embed) {
    if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
      ||
      [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms, ...roles.registerStaffRole].some(x => message.member.roles.cache.has(x))) {
      const data = await tagsistem.findOne({ guildID: message.guild.id });
      const a = data.only

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      args = args.filter(a => a !== "" && a !== " ").splice(1);
      let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
      let yaş = args.filter(arg => !isNaN(arg))[0] || undefined
      let kayıtRolleri = [...roles.womanRoles, ...roles.manRoles]
      if (!member) return message.ReturnReply("member not specified")
      if (member.roles.cache.has(roles.jailedRole)) return message.ReturnReply("Penalized user");
      if (member.roles.cache.has(roles.suspectRole)) return message.ReturnReply("suspicious user");
      if (member.roles.cache.has(roles.bannedTagRole)) return message.ReturnReply("User with banned tag");
      if (kayıtRolleri.some(role => member.roles.cache.has(role))) return message.ReturnReply("registered user");
      if (member.user.bot) return message.ReturnReply("its a bot");
      if (!member.manageable) return message.ReturnReply("insufficient authorization");
      if (!isim) return message.ReturnReply("name not specified");
     // if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !yaş) return message.ReturnReply("age not specified");
      if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization");
      let taglialimdata = await taglialimdb.findOne({ guildID: message.guild.id });
      let taglialimonly = taglialimdata ? taglialimdata.only : false;
      if ((a == true && data.Type == "Public") && (taglialimonly == true && (!member.displayName.includes(data.Tag) && ![roles.boosterRole, roles.vipRole].some(x => member.roles.cache.has(x))))) return message.ReturnReply("not tagged");
      const tag = `${a == true ? `${data.Type == "Public" ? `${member.displayName.includes(data.Tag) ? `${data.Tag}`:`${data.unTag}`}` :`${data.nameTags.some(x=> member.user.username.includes(x) || member.user.discriminator == data.NumberTag) ? `${data.Tag}`:`${data.unTag}`}`}` : ""}`

      var setName = `${tag} ${isim} `;
      if (setName.length > 32) return message.ReturnReply("API Limit")

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('Erkek')
            .setLabel("Erkek")
            .setEmoji(message.guild.findReaction(Man, "ID"))
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('approval')
            .setLabel("Approval")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('Kadın')
            .setLabel("Kadın")
            .setEmoji(message.guild.findReaction(Woman, "ID"))
            .setStyle(ButtonStyle.Danger),

        );
      const log = message.guild.channels.cache.find(x => x.name == "kayıt_log")
      const chat = message.guild.channels.cache.get(channels.chatChannel);
      let missionsystemdb = await missionsystem.findOne({ guildID: message.guild.id });
      let mission_system = missionsystemdb ? missionsystemdb.only : false;
      var guildAutoStaff = await guildAutoStaffdb.findOne({ guildID: message.guild.id, userID: message.member.id })
      const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
       message.channel.send({
        components: [row], embeds: [new GenerateEmbed().setDescription(`${member} adlı kullanıcının adı **${setName}** olarak değiştirilmesi ve kaydının tamamlanması için aşağıda ki butonları kullanınız.
      `)]
      }).then(async msg => {
      var filter = i => i.user.id === message.member.id;
      const collector = msg.createMessageComponentCollector({filter, time: 30000 });
      collector.on('collect', async (i) => {
        await i.deferUpdate()
        let tamamlandi = await new ButtonBuilder().setCustomId("tamamlandı.").setDisabled(true).setLabel("Kayıt Tamamlandı").setStyle(ButtonStyle.Secondary).setEmoji(message.guild.findReaction(Tik, "ID"))
        if (member.displayName.includes(data.Tag)) await member.roles.add(data.tagRol)
        if (i.customId == "CANCEL") {
          if (msg) msg.delete().catch(err => { });
          if (message) await message.delete();
        }
        if (i.customId == "Erkek") {
          await msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member}, Üyesinin ismi **${setName}** olarak değiştirildi ve **Erkek** olarak kayıt edilip ${roles.manRoles.map(x => `<@&${x}>`).join(", ")} ${roles.manRoles.length > 1 ? "rolleri" : "rolü"}rolleri verildi!`)], components: [new ActionRowBuilder({ components: [tamamlandi] })] })
          if (log) await log.send({ embeds: [new GenerateEmbed().setDescription(`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) \`Erkek\` olarak kayıt edildi.${`\n- İsim Yaş: **${setName} | ${yaş != undefined ? yaş : ""}**`}` )]})
          await member.setNickname(setName)
          await member.roles.remove(roles.unregisterRoles)
          await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
          await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol: roles.manRoles[0], date: Date.now(), Gender: "Erkek" } } }, { upsert: true });
          await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${setName}`, rol: roles.manRoles[0], islem: "Kayıt" } } }, { upsert: true });
          await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: roles.manRoles[0], date: Date.now() } } }, { upsert: true });
          setTimeout(async () => { await member.roles.add(roles.manRoles); }, 1000);
          if (chat) await chat.send({ content: `${member}, sunucumuza **Erkek** olarak katıldı! onu sevgiyle kucaklıyalım!` }).destroyMessage();
          if (message) await message.replyReaction(message.guild.findReaction(Tik,"ID"))
          if (mission_system == true && authorityStatus == true) {
            await missionsystem.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { registrationTask: 1 } }, { upsert: true })
            await missionsControled(message.member.id, message.guild.id, "Kayıt")
          }
        }
        if (i.customId == "Kadın") {
          await msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member}, Üyesinin ismi **${setName}** olarak değiştirildi ve **Kadın** olarak kayıt edilip ${roles.womanRoles.map(x => `<@&${x}>`).join(", ")} ${roles.womanRoles.length > 1 ? "rolleri" : "rolü"} verildi.`)], components: [new ActionRowBuilder({ components: [tamamlandi] })] })
          if (log) await log.send({ embeds:[new GenerateEmbed().setDescription( `**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) \`Kadın\` olarak kayıt edildi. ${`\n- İsim Yaş: **${setName} | ${yaş != undefined ? yaş : ""}**`}`)] })
          await member.setNickname(setName)
          await member.roles.remove(roles.unregisterRoles)
          await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
          await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol: roles.womanRoles[0], date: Date.now(), Gender: "Kadın" } } }, { upsert: true });
          await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${setName}`, rol: roles.womanRoles[0], islem: "Kayıt" } } }, { upsert: true });
          await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: roles.womanRoles[0], date: Date.now() } } }, { upsert: true });
          setTimeout(async () => { await member.roles.add(roles.womanRoles); }, 1000);
          if (chat) await chat.send({ content: `${member}, sunucumuza **Kız** olarak katıldı! onu sevgiyle kucaklıyalım!` }).destroyMessage();
          if (message) await message.replyReaction(message.guild.findReaction(Tik,"ID"))
          if (mission_system == true && authorityStatus == true) {
            await missionsystem.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { registrationTask: 1 } }, { upsert: true })
            await missionsControled(message.member.id, message.guild.id, "Kayıt")
          }
        }
      })        
      })

    } else return message.ReturnReply("Cannot use command")
  }
}

module.exports = Kayıt
