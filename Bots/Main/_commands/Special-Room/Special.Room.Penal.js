
const { EmbedBuilder, TextInputBuilder, PermissionsBitField, codeBlock, ChannelType, Events, ActionRowBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const request = require('request');
const specialRoomSystemdb = require("../../../../Global/Database/SystemDB/Special.Room");
const SpecialRoom = require("../../../../Global/Database/Special.Room");

const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class Special_Room_Penal extends Command {
  constructor(client) {
    super(client, {
      name: "Special Room Penal",
      description: "Özel oda Paneli",
      usage: ".srp",
      category: "Special-Room",
      aliases: ["srp", "ozel-oda-panel"],

      enabled: false,

      developer: true
    });
  }

  async onLoad(client) {
   client.on("voiceChannelSwitch", async (member, oldChannel, newChannel) => {
    const guild = await client.guilds.cache.get(Guild.ID)
    const memberData = await SpecialRoom.findOne({ guildID: guild.id, userID: member.id });
    if ((memberData && memberData.channelID) && oldChannel.id === memberData.channelID) {
      if (oldChannel.members.size == 0) {
        let silincek = await guild.channels.cache.get(memberData.channelID);
        silincek.delete()
        await SpecialRoom.findOneAndDelete({ guildID: guild.id, channelID: silincek.id }, { upsert: true })
      }
    }
   })
    client.on("voiceChannelLeave", async (member, channel) => {
      const guild = await client.guilds.cache.get(Guild.ID)
      const memberData = await SpecialRoom.findOne({ guildID: guild.id, userID: member.id });
      if ((memberData && memberData.channelID) && channel.id === memberData.channelID) {
        if (channel.members.size == 0) {
          let silincek = await guild.channels.cache.get(memberData.channelID);
          silincek.delete()
          await SpecialRoom.findOneAndDelete({ guildID: guild.id, channelID: silincek.id }, { upsert: true })
        }
      }
    })
    client.on(Events.ChannelDelete, async (channel) => {
      const guild = await client.guilds.cache.get(Guild.ID)
      let specialRoomSystem = await specialRoomSystemdb.findOne({ guildID: guild.id })
      if (!specialRoomSystem) return;
      const channelData = await SpecialRoom.findOne({ guildID: channel.guild.id, channelID: channel.id });
      if (channelData) {
        await SpecialRoom.findOneAndDelete({ guildID: channel.guild.id, channelID: channel.id }, { upsert: true })
        const member = await client.users.cache.get(channelData.userID)
        if (member) {
          await member.send({ content: `Özel odan silindi!` }).catch(x => undefined);
        }
      }
    })
    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
      const guild = await client.guilds.cache.get(Guild.ID)
      let specialRoomSystem = await specialRoomSystemdb.findOne({ guildID: guild.id })
      if (!specialRoomSystem) return;
      const memberData = await SpecialRoom.findOne({ guildID: newState.guild.id, userID: newState.member.id });
      if (newState.member.voice.channel?.id == specialRoomSystem.channelID) {
        const memberData = await SpecialRoom.findOne({ guildID: newState.guild.id, userID: newState.member.id });
        if (memberData) {
          await newState.member.voice.setChannel(memberData.channelID);
        } else {
          newState.guild.channels.create({
            name: newState.member.user.username,
            parent: "1251462583349940245",
            type: 2,
            permissionOverwrites: [
              {
                id: newState.guild.roles.everyone,
                allow: [PermissionsBitField.Flags.Speak],
                deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendVoiceMessages]
              },
              {
                id: newState.member.user.id,
                allow: [PermissionsBitField.Flags.Connect,PermissionsBitField.Flags.MuteMembers, PermissionsBitField.Flags.DeafenMembers, PermissionsBitField.Flags.Stream],
              },
              { id: roles.jailedRole, deny: [PermissionsBitField.Flags.ViewChannel] },
              { id: roles.unregisterRoles[0], deny: [PermissionsBitField.Flags.ViewChannel] },
              { id: roles.suspectRole, deny: [PermissionsBitField.Flags.ViewChannel] },
            ],
          }).then(async channel => {
            await newState.member.voice.setChannel(channel.id);
            channel.send({
              content: `${newState.member}`,
              embeds: [
                new GenerateEmbed()
                  .setAuthor({ name: newState.member.user.username, iconURL: newState.member.user.avatarURL() })
                  .setDescription(`${channel}, kanalının ayarlarını aşağıda ki butonlar ile değiştirebilirsiniz.`)
                  .setImage("https://cdn.discordapp.com/attachments/1089646025192517733/1117358565355692093/voicePanel.png")
              ],
              components: [
                new ActionRowBuilder()
                  .setComponents(
                    new ButtonBuilder().setCustomId("edit").setEmoji(newState.guild.findReaction(Düzenle, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("lock").setEmoji(newState.guild.findReaction(KilitKapalı, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("unlock").setEmoji(newState.guild.findReaction(KilitAçık, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("invisible").setEmoji(newState.guild.findReaction(Görünmez, "ID")).setStyle(ButtonStyle.Secondary),
                  ),
                new ActionRowBuilder()
                  .setComponents(
                    new ButtonBuilder().setCustomId("visible").setEmoji(newState.guild.findReaction(Gorunur, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("add_user").setEmoji(newState.guild.findReaction(Ekle, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("remove_user").setEmoji(newState.guild.findReaction(Çıkar, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("channel_delete").setEmoji(newState.guild.findReaction(Cop, "ID")).setStyle(ButtonStyle.Secondary),
                  )
              ]
            }).then(async x => {
              await SpecialRoom.findOneAndUpdate({ guildID: newState.guild.id, userID: newState.member.id }, { $set: { only: true, channelID: channel.id, date: Date.now() } }, { upsert: true })
            })
          })
        }





      }
      if ((memberData && memberData.channelID) && (newState.member.voice.channel.id === memberData.channelID)) {
        await SpecialRoom.findOneAndUpdate({ guildID: newState.guild.id, userID: newState.member.id }, { $set: { lastEntry: Date.now() } }, { upsert: true })
      }
    })
    client.on(Events.InteractionCreate, async i => {
      const guild = await client.guilds.cache.get(Guild.ID)
      let specialRoomSystem = await specialRoomSystemdb.findOne({ guildID: guild.id })
      if (!specialRoomSystem) return;
      let ChannelData = await SpecialRoom.findOne({ guildID: i.guild.id, userID: i.member.id })
      switch (i.customId) {
        case "edit":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          try {
            let modal = await new ModalBuilder().setTitle(`${channel.name} Voice Penal`).setCustomId("voicePanelChannelEdit")
              .setComponents(
                new ActionRowBuilder().setComponents(new TextInputBuilder().setCustomId("channelName").setLabel("Yeni adı giriniz.").setPlaceholder(`${channel.name}`).setStyle(TextInputStyle.Short).setValue(`${channel.name}`)),
                new ActionRowBuilder().setComponents(new TextInputBuilder().setCustomId("channelLimit").setLabel("Yeni limiti giriniz.").setPlaceholder(`${channel.userLimit}`).setStyle(TextInputStyle.Short).setValue(`${channel.userLimit}`)),
                new ActionRowBuilder().setComponents(new TextInputBuilder().setCustomId("channelBitrate").setLabel("Yeni Bit Hızını Giriniz.").setPlaceholder(`8 ve katlarını giriniz`).setStyle(TextInputStyle.Short).setValue(`${channel.bitrate / 1000}`)),
              )
            await i.showModal(modal);
          } catch (error) {
            console.log(error)
          }


          break;
        case "lock":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          await channel.permissionOverwrites.create(i.guild.roles.everyone, { 1048576: false })
            .then(x => i.reply({ content: `Ses Kanalını Başarıyla Kitledin!`, ephemeral: true }))
            .catch(x => i.reply({ content: `Ses Kanalı Kitleme İşlemi Başarısız!`, ephemeral: true }))
          break;
        case "unlock":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          await channel.permissionOverwrites.create(i.guild.roles.everyone, { 1048576: true })
            .then(x => i.reply({ content: `Ses Kanalının Kilidini Başarıyla Açtın!`, ephemeral: true }))
            .catch(x => i.reply({ content: `Ses Kanalının Kilit Açma İşlemi Başarısız!`, ephemeral: true }))
          break;
        case "visible":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          await channel.permissionOverwrites.create(i.guild.roles.everyone, { 1024: true })
            .then(x => i.reply({ content: `Ses Kanalının Gizliliği Kaldırma İşlemi Başarılı!`, ephemeral: true }))
            .catch(x => i.reply({ content: `Ses Kanalının Gizliliği Kaldırma İşlemi Başarısız!`, ephemeral: true }))
          break;
        case "invisible":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          await channel.permissionOverwrites.create(i.guild.roles.everyone, { 1024: false })
            .then(x => i.reply({ content: `Ses Kanalının Gizleme İşlemi Başarılı!`, ephemeral: true }))
            .catch(x => i.reply({ content: `Ses Kanalının Gizleme İşlemi Başarısız!`, ephemeral: true }))
          break;
        case "add_user":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          i.reply({
            components: [
              new ActionRowBuilder()
                .addComponents(new UserSelectMenuBuilder().setCustomId('VoiceChannelPanelAddUSER').setPlaceholder('Kullanıcı ara.').setMinValues(1).setMaxValues(20))], ephemeral: true
          })
          break;
        case "remove_user":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          let menuOptions = channel.permissionOverwrites.cache.filter(x => i.guild.members.cache.get(x.id)).map(x => ({ label: i.guild.members.cache.get(x.id).user.username, description: undefined, value: x.id,  }))
          i.reply({
            components: [
              new ActionRowBuilder()
                .addComponents(new StringSelectMenuBuilder().setCustomId('VoiceChannelPanelRemoveUSER').setPlaceholder('Kullanıcı çıkarmak için tıkla.').setOptions(menuOptions.slice(0, 25)))], ephemeral: true
          })
          break;
        case "channel_delete":
          if (!ChannelData) return i.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
          var channel = i.guild.channels.cache.get(ChannelData.channelID)
          await i.deferUpdate();
          await SpecialRoom.findOneAndDelete({ guildID: i.guild.id, channelID: channel.id }, { upsert: true })
          channel.delete();
          break;
        case "created":
          if (ChannelData) return i.reply({ content: `Özel odan bulunuyor??`, ephemeral: true })
          i.guild.channels.create({
            name: i.member.user.username,
            type: 2,
            parent: "1251462583349940245",
            permissionOverwrites: [
              {
                id: i.guild.roles.everyone,
                allow: [PermissionsBitField.Flags.Speak],
                deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendVoiceMessages]
              },
              {
                id: i.member.user.id,
                allow: [PermissionsBitField.Flags.MuteMembers, PermissionsBitField.Flags.DeafenMembers, PermissionsBitField.Flags.Stream],
              },
              { id: roles.jailedRole, deny: [PermissionsBitField.Flags.ViewChannel] },
              { id: roles.unregisterRoles[0], deny: [PermissionsBitField.Flags.ViewChannel] },
              { id: roles.suspectRole, deny: [PermissionsBitField.Flags.ViewChannel] },
            ],
          }).then(async channel => {
            channel.send({
              content: `${i.member}`,
              embeds: [
                new GenerateEmbed()
                  .setAuthor({ name: i.member.user.username, iconURL: i.member.user.avatarURL() })
                  .setDescription(`${channel}, kanalının ayarlarını aşağıda ki butonlar ile değiştirebilirsiniz.`)
                  .setImage("https://cdn.discordapp.com/attachments/1089646025192517733/1117358565355692093/voicePanel.png")
              ],
              components: [
                new ActionRowBuilder()
                  .setComponents(
                    new ButtonBuilder().setCustomId("edit").setEmoji(message.guild.findReaction(Düzenle, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("lock").setEmoji(message.guild.findReaction(KilitKapalı, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("unlock").setEmoji(message.guild.findReaction(KilitAçık, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("invisible").setEmoji(message.guild.findReaction(Görünmez, "ID")).setStyle(ButtonStyle.Secondary),
                  ),
                new ActionRowBuilder()
                  .setComponents(
                    new ButtonBuilder().setCustomId("visible").setEmoji(message.guild.findReaction(Gorunur, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("add_user").setEmoji(message.guild.findReaction(Ekle, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("remove_user").setEmoji(message.guild.findReaction(Çıkar, "ID")).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("channel_delete").setEmoji(message.guild.findReaction(Cop, "ID")).setStyle(ButtonStyle.Secondary),
                  )
              ]
            }).then(async x => {
              i.reply({ content: `**${channel.name}** isimli kanalın oluşturuldu. sana özel panel için ${x.url}`, ephemeral: true })
              await SpecialRoom.findOneAndUpdate({ guildID: i.guild.id, userID: i.member.id }, { $set: { only: true, channelID: channel.id, date: Date.now() } }, { upsert: true })
            })
          })
          break;
        default:
          break;
      }
    })
    client.on(Events.InteractionCreate, async interaction => {
      if (interaction.customId === 'VoiceChannelPanelAddUSER') {
        await interaction.deferUpdate()
        let ChannelData = await SpecialRoom.findOne({ guildID: interaction.guild.id, userID: interaction.member.id })
        if (!ChannelData) return i.editReply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", components: [], ephemeral: true })
        let channel = interaction.guild.channels.cache.get(ChannelData.channelID)
        const selectedUsers = interaction.values;
        const selectedUserNames = selectedUsers.map(userId => {
          const user = interaction.guild.members.cache.get(userId)?.user;
          return user ? user.username : 'Bilinmeyen Kullanıcı';
        });
        selectedUsers.forEach(async x => {
          const user = interaction.guild.members.cache.get(x)?.user;
          await channel.permissionOverwrites.create(user, { 4194304: true, 8388608: true, 512: true })
        });
        const replyMessage = `Aşağıda ki kullanıcıların kanala girişlerine izin verildi!\n${selectedUserNames.join(', ')}`;
        interaction.editReply({ content: replyMessage, components: [], ephemeral: true });
      }
      if (interaction.customId === 'VoiceChannelPanelRemoveUSER') {
        await interaction.deferUpdate()
        let ChannelData = await SpecialRoom.findOne({ guildID: interaction.guild.id, userID: interaction.member.id })
        if (!ChannelData) return i.editReply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", components: [], ephemeral: true })
        let channel = interaction.guild.channels.cache.get(ChannelData.channelID)
        const selectedUsers = interaction.values;
        const selectedUserNames = selectedUsers.map(userId => {
          const user = interaction.guild.members.cache.get(userId)?.user;
          return user ? user.username : 'Bilinmeyen Kullanıcı';
        });
        selectedUsers.forEach(async x => {
          const user = interaction.guild.members.cache.get(x)?.user;
          await channel.permissionOverwrites.delete(user)
        });
        const replyMessage = `Aşağıda ki kullanıcının kanala giriş izni başarıyla kaldırıldı!\n${selectedUserNames.join(', ')}`;
        interaction.editReply({ content: replyMessage, components: [], ephemeral: true });
      }


    })
    client.on(Events.InteractionCreate, async m => {
      if (m.type !== 5) return;
      if (m.customId !== "voicePanelChannelEdit") return;
      let ChannelData = await SpecialRoom.findOne({ guildID: m.guild.id, userID: m.member.id })
      if (!ChannelData) return m.reply({ content: "Özel kanalınız bulunmadığı için bu özelliği kullanamazsınız.", ephemeral: true })
      let channel = m.guild.channels.cache.get(ChannelData.channelID)
      if (m.customId === 'voicePanelChannelEdit') {
        const channelName = m.fields.getTextInputValue('channelName');
        const channelLimit = m.fields.getTextInputValue('channelLimit');
        const channelBitrate = m.fields.getTextInputValue('channelBitrate');
        var data = {
          name: channelName,
          bitrate: (channelBitrate * 1000),
          userLimit: channelLimit
        }
        m.guild.channels.edit(channel.id, data).then(x => { m.reply({ content: `Kanal Ayarları Güncellendi!`, ephemeral: true }) })
          .catch(x => { console.log(x), m.reply({ content: `Kanal Ayarları Güncellenemedi!`, ephemeral: true }) })

      }
    })
  }

  async onRequest(client, message, args) {

    let specialRoomSystem = await specialRoomSystemdb.findOne({ guildID: message.guild.id })
    if (!specialRoomSystem) return message.reply({ content: "Özel oda sistemi kapalı!" })
    message.channel.send({
      embeds: [
        new GenerateEmbed()
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
          .setDescription(`**Aşağıda ki butonlar ile kendinize özel kanal açabilir ve kanal ayarlarını değiştirebilirsiniz.**`)
          .setImage("https://media.discordapp.net/attachments/1089646025192517733/1118239731315114004/voicePanell.png")
      ],
      components: [
        new ActionRowBuilder()
          .setComponents(
            new ButtonBuilder().setCustomId("created").setEmoji(message.guild.findReaction(Oluştur, "ID")).setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("edit").setEmoji(message.guild.findReaction(Düzenle, "ID")).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("channel_delete").setEmoji(message.guild.findReaction(Cop, "ID")).setStyle(ButtonStyle.Danger),
          ),

        new ActionRowBuilder()
          .setComponents(
            new ButtonBuilder().setCustomId("unlock").setEmoji(message.guild.findReaction(KilitAçık, "ID")).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("invisible").setEmoji(message.guild.findReaction(Görünmez, "ID")).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("visible").setEmoji(message.guild.findReaction(Gorunur, "ID")).setStyle(ButtonStyle.Secondary),
          ),
        new ActionRowBuilder()
          .setComponents(
            new ButtonBuilder().setCustomId("add_user").setEmoji(message.guild.findReaction(Ekle, "ID")).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("remove_user").setEmoji(message.guild.findReaction(Çıkar, "ID")).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("channel_delete").setEmoji(message.guild.findReaction(KilitKapalı, "ID")).setStyle(ButtonStyle.Secondary),
          )

      ]
    })


  }
}

module.exports = Special_Room_Penal
async function emojiFind(name) {
  const guild = await client.guilds.cache.get(Guild.ID);
  const emoji = await guild.emojis.cache.find(x => x.name === name);
  if (emoji) return emoji.id
  else console.log(name + "İsimli emoji Bulunamadı!")
}