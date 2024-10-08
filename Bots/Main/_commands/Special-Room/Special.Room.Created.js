
const { EmbedBuilder, PermissionsBitField, codeBlock, ChannelType, Events, ActionRowBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const request = require('request');
const SpecialRoomUser = require("../../../../Global/Database/Special.Room");
const SpecialRoom = require("../../../../Global/Database/SystemDB/Special.Room");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class SpecialRoomCreated extends Command {
  constructor(client) {
    super(client, {
      name: "SpecialRoomCreate",
      description: "Özel Oda Oluşturmak İçin",
      usage: ".SpecialRoomCreate",
      category: "Special-Room",
      aliases: ["src", "ozel-oda", "özel-oda"],

      enabled: false,

      developer: true
    });
  }


  async onRequest(client, message, args) {
    let specialRoomSystem = await SpecialRoom.findOne({ guildID: message.guild.id })
    if (!specialRoomSystem) return message.reply({ content: "Özel oda sistemi kapalı!" })
    const SpecialRoomData = await SpecialRoomUser.findOne({ guildID: message.guild.id, userID: message.member.user.id });
    if (!SpecialRoomData || SpecialRoomData?.only === false || !SpecialRoomData.only || ((SpecialRoomData && SpecialRoomData.channelID) && !message.guild.channels.cache.get(SpecialRoomData?.channelID))) {
      message.guild.channels.create({
        name: message.member.user.username,
        type: 2,
        parent: "1251462583349940245",
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            allow: [PermissionsBitField.Flags.Speak],
            deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendVoiceMessages]
          },
          {
            id: message.member.user.id,
            allow: [PermissionsBitField.Flags.MuteMembers, PermissionsBitField.Flags.DeafenMembers, PermissionsBitField.Flags.Stream],
          },
          { id: roles.jailedRole, deny: [PermissionsBitField.Flags.ViewChannel] },
          { id: roles.unregisterRoles[0], deny: [PermissionsBitField.Flags.ViewChannel] },
          { id: roles.suspectRole, deny: [PermissionsBitField.Flags.ViewChannel] },
        ],
      }).then(async channel => {
        channel.send({
          content: `${message.member}`,
          embeds: [
            new GenerateEmbed()
              .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL() })
              .setDescription(`${channel}, kanalının ayarlarını aşağıda ki butonlar ile değiştirebilirsiniz.`)
              .setImage("https://cdn.discordapp.com/attachments/1089646025192517733/1117358565355692093/voicePanel.png")
          ],
          components: [
            new ActionRowBuilder()
              .setComponents(
                new ButtonBuilder().setCustomId("edit").setEmoji(message.guild.findReaction(Düzenle,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("lock").setEmoji(message.guild.findReaction(KilitKapalı,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("unlock").setEmoji(message.guild.findReaction(KilitAçık,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("invisible").setEmoji(message.guild.findReaction(Görünmez,"ID")).setStyle(ButtonStyle.Secondary),
              ),
            new ActionRowBuilder()
              .setComponents(
                new ButtonBuilder().setCustomId("visible").setEmoji(message.guild.findReaction(Gorunur,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("add_user").setEmoji(message.guild.findReaction(Ekle,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("remove_user").setEmoji(message.guild.findReaction(Çıkar,"ID")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("channel_delete").setEmoji(message.guild.findReaction(Cop,"ID")).setStyle(ButtonStyle.Secondary),
              )
          ]
        }).then(async x => {
          message.channel.send({ content: `**${channel.name}** isimli kanalın oluşturuldu. sana özel panel için ${x.url}` })
          await SpecialRoom.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $set: { only: true, channelID: channel.id, date: Date.now() } }, { upsert: true })
        })
      })
    } else {
      let channel = message.guild.channels.cache.get(SpecialRoomData.channelID)
      message.reply({ content: `**${channel.name}** adında bir kanalın bulunuyor zaten!` })
    }
  }
}


async function emojiFind(name) {
  const guild = await client.guilds.cache.get(Guild.ID);
  const emoji = await guild.emojis.cache.find(x => x.name === name);
  if (emoji) return emoji.id
  else console.log(name + "İsimli emoji Bulunamadı!")
}
module.exports = SpecialRoomCreated
