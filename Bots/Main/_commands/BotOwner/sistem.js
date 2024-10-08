const {
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  TextInputBuilder,
  codeBlock,
  InteractionType,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {
  GenerateEmbed,
} = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const guildConfig = require("../../../../Global/Database/Guild.Config");
const guildRoleConfig = require("../../../../Global/Database/Guild.Roles.Config");
const guildChannelConfig = require("../../../../Global/Database/Guild.Channels.Config");
/* System */
const GuildLevelSystem = require("../../../../Global/Database/SystemDB/GuildLevelSystem");
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system");
const guildTag = require("../../../../Global/Database/SystemDB/guildTag");
const guildBannedTag = require("../../../../Global/Database/SystemDB/guildBannedTag");
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system");
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system");
const guildCoinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag");
const SpecialRoom = require("../../../../Global/Database/SystemDB/Special.Room");
const SpecialRoomUser = require("../../../../Global/Database/Special.Room");
const { emojiSpecalRoomEmojis } = require("../../../../Global/Config/Guild");

const {
  general: {
    Tik,
    Cross,
    Time,
    Elmas,
    Yayın,
    Kamera,
    Ses,
    Metin,
    Sagok,
    Solok,
    Cop,
    Category,
    Warning,
    Woman,
    Man,
    Kup,
    Bir,
    İki,
    Uc,
    Dört,
    Beş,
    Alti,
    Yedi,
    Sekiz,
    Dokuz,
    Sıfır,
    Bot,
    Oynat,
    Davet,
    Coin,
    Kalp,
    Kiraz,
    Patlican,
    Web,
    Bilgisayar,
    Telefon,
    Slot,
    Level,
    Guard,
    OrtaBosBarGri,
    OrtaDoluBarYeşil,
    BaslangicBosBarGri,
    BaslangicDoluBarYeşil,
    SonBosBarGri,
    SonDoluBarYeşil,
    Oluştur,
    Düzenle,
    Ekle,
    Çıkar,
    Görünmez,
    Gorunur,
    KilitAçık,
    KilitKapalı,
  },
} = require("../../../../Global/Config/emojis");
class Sistem extends Command {
  constructor(client) {
    super(client, {
      name: "sistem",
      description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
      usage: ".sistem",
      category: "Approval",
      aliases: ["system"],
      enabled: true,
      developer: true,
      guildOwner: true,
    });
  }

  async onLoad(client) {
    client.on("interactionCreate", async (interaction) => {
      if (interaction.type != InteractionType.ModalSubmit) return;
      if (interaction.customId === "publicTag") {
        const tur = "Public";
        const tag = await interaction.fields.getTextInputValue("tag");
        if (!tag)
          return interaction.reply({
            content: "Sunucu Tagını Düzgün Bir Şekilde Giriniz.",
            ephemeral: true,
          });
        const tagsiztag = await interaction.fields.getTextInputValue("tagsiz");
        if (!tagsiztag)
          return interaction.reply({
            content:
              "Sunucuda tagsızlara verilen tagı Düzgün Bir Şekilde Giriniz.",
            ephemeral: true,
          });
        const tagrol = await interaction.fields.getTextInputValue("tagrol");
        if (!tagrol || !interaction.guild.roles.cache.get(tagrol))
          return interaction.reply({
            content: "Tag Rolünün ID'sini düzgün gir şekilde girin.",
            ephemeral: true,
          });
        const taglog = await interaction.fields.getTextInputValue("taglog");
        if (!taglog || !interaction.guild.channels.cache.get(taglog))
          return interaction.reply({
            content: "Tag Log Kanalının ID'sini düzgün bir şekilde girin.",
            ephemeral: true,
          });
        await tagsistem.findOneAndUpdate(
          { guildID: interaction.guild.id },
          {
            $set: {
              only: true,
              Type: tur,
              Tag: tag,
              unTag: tagsiztag,
              tagRol: tagrol,
              tagLog: taglog,
            },
          },
          { upsert: true }
        );
        const data = await tagsistem.findOne({ guildID: interaction.guild.id });
        await interaction.reply({
          content: `**Tag Modu** ayarları aşağıdaki gibi yapılmıştır.\n\n• Sunucu: **${
            data.Type
          }**\n• Tag: **${data.Tag}**\n• Tagsız: **${
            data.unTag
          }**\n• Tag Rol: **${
            interaction.guild.roles.cache.get(data.tagRol).name
          }**\n• Tag Log: **<#${data.tagLog}>**`,
          ephemeral: true,
        });
      }
      if (interaction.customId == "ekipTag") {
        const tur = "Ekip";
        const tag = await interaction.fields.getTextInputValue("taglar");
        let tags = tag.split(",");
        if (!tag || !tags)
          return interaction.reply({
            content: "Ekip taglarınızı düzgün bir şekilde giriniz.",
            ephemeral: true,
          });
        const isimbaşıtaglar = await await interaction.fields.getTextInputValue(
          "taglitagsiz"
        );
        let isimbaşıtaglars = isimbaşıtaglar.split(", ");
        const etikettag = await interaction.fields.getTextInputValue("etag");
        if (!etikettag)
          return interaction.reply({
            content: "Sunucu Etiket Tagını Düzgün Bir Şekilde Giriniz.",
            ephemeral: true,
          });
        const tagrol = await interaction.fields.getTextInputValue("tagrol");
        if (!tagrol || !interaction.guild.roles.cache.get(tagrol))
          return interaction.reply({
            content: "Tag Rolünün ID'sini düzgün gir şekilde girin.",
            ephemeral: true,
          });
        const taglog = await interaction.fields.getTextInputValue("taglog");
        if (!taglog || !interaction.guild.channels.cache.get(taglog))
          return interaction.reply({
            content: "Tag Log Kanalının ID'sini düzgün bir şekilde girin.",
            ephemeral: true,
          });
        await tagsistem.findOneAndUpdate(
          { guildID: interaction.guild.id },
          {
            $set: {
              only: true,
              Type: tur,
              Tag: isimbaşıtaglars[0],
              unTag: isimbaşıtaglars[1],
              nameTags: tags,
              NumberTag: etikettag,
              tagRol: tagrol,
              tagLog: taglog,
            },
          },
          { upsert: true }
        );
        const data = await tagsistem.findOne({ guildID: interaction.guild.id });
        interaction.reply({
          content: `**Tag Modu** ayarları aşağıdaki gibi yapılmıştır. \n\n• İsim Tagları: **${data.nameTags.join(
            ", "
          )}**\n• Etiket Tagı: **#${data.NumberTag}**\n• Taglı Simge: **${
            data.Tag
          }**\n• Tagsız Simge: **${data.unTag}**\n• Tag Rolü: **${
            interaction.guild.roles.cache.get(data.tagRol).name
          }**\n• Tag Log: **<#${data.tagLog}>**`,
          ephemeral: true,
        });
      }
    });
  }
  async onRequest(client, message, args, embed) {
    if (args[0] == "durum") {
      let levelsistem = await GuildLevelSystem.findOne({
        guildID: message.guild.id,
      });
      let level = levelsistem ? levelsistem.levelSystem : false;
      let statsistem = await statSystemDB.findOne({
        guildID: message.guild.id,
      });
      let stat = statsistem ? statsistem.statSystem : false;
      let tagsistem = await guildTag.findOne({ guildID: message.guild.id });
      let tag = tagsistem
        ? tagsistem.only == true
          ? `Açık: ${tagsistem.Type}`
          : "Kapalı"
        : "Kapalı";
      let yasaklıtagsistem = guildBannedTag.findOne({
        guildID: message.guild.id,
      });
      let yasaklıtag = yasaklıtagsistem ? yasaklıtagsistem.only : false;
      let invitesistem = await guildInviteSystemDB.findOne({
        guildID: message.guild.id,
      });
      let invite = invitesistem ? invitesistem.InviteSystem : false;
      let coinsystemdb = await guildCoinSystem.findOne({
        guildID: message.guild.id,
      });
      let Coin_system = coinsystemdb ? coinsystemdb.coinSystem : false;
      let missionsystemdb = await missionsystem.findOne({
        guildID: message.guild.id,
      });
      let mission_system = missionsystemdb ? missionsystemdb.only : false;
      let sistemEmoji = "•";
      let tik = message.guild.emojis.cache.find((x) => x.name == "appEmoji_tik")
        ? message.guild.emojis.cache.find((x) => x.name == "appEmoji_tik")
        : "✅";
      let carpi = message.guild.emojis.cache.find(
        (x) => x.name == "appEmoji_carpi"
      )
        ? message.guild.emojis.cache.find((x) => x.name == "appEmoji_carpi")
        : "❎";
      return message.reply({
        embeds: [
          new GenerateEmbed().setDescription(`${codeBlock(
            "md",
            `# Sistemlerin durumu aşağıda sıralanmıştır.`
          )}
**
${sistemEmoji} ${
            stat == true
              ? `İstatistik Sistemi: ${tik}`
              : `İstatistik Sistemi: ${carpi}`
          }
${sistemEmoji} ${tag == true ? `Tag Sistemi: ${tik}` : `Tag Sistemi: ${carpi}`}
${sistemEmoji} ${
            yasaklıtag == true
              ? `Yasaklı Tag Sistemi: ${tik}`
              : `Yasaklı Tag Sistemi: ${carpi}`
          }
${sistemEmoji} ${
            Coin_system == true
              ? `Ekonomi Sistemi: ${tik}`
              : `Ekonomi Sistemi: ${carpi}`
          }
${sistemEmoji} ${
            invite == true
              ? `İnvite Sistemi: ${tik}`
              : `İnvite Sistemi: ${carpi}`
          }
${sistemEmoji} ${
            mission_system == true
              ? `Görev Sistemi: ${tik}`
              : `Görev Sistemi: ${carpi}`
          }
**`),
        ],
      });
    }
    let menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("sistem")
        .setPlaceholder("Menüden uygun sistemi seçiniz.")
        .addOptions([
          {
            label: "Multi Level Sistemi",
            description: undefined,
            value: "level",
          },
          { label: "Ekonomi Sistemi", description: undefined, value: "coin" },
          { label: "Yetki Sistemi", description: undefined, value: "yetki" },
          {
            label: "Yasaklı Tag Sistemi",
            description: undefined,
            value: "yasaktag",
          },
          { label: "Tag Modu", description: undefined, value: "tag" },
          {
            label: "İnvite Sistemi",
            description: undefined,
            value: "invitesystem",
          },
          {
            label: "İstatistik Sistemi",
            description: undefined,
            value: "stat",
          },
          {
            label: "Özel Oda",
            description: undefined,
            value: "special-room-system",
          },
        ])
    );
    let msg = await message.channel.send({
      components: [menu],
      embeds: [
        new GenerateEmbed().setDescription(
          `Aşağıda gördüğünüz menüden sunucunuza uygun olucak sistemleri aktif edebilir ve gerekli ayarlarını yapabilirsiniz.`
        ),
      ],
    });
    const filter = (d) => d.user.id == message.member.id;
    const collector = msg.createMessageComponentCollector({
      filter: filter,
      errors: ["time"],
      time: 30000,
    });
    collector.on("collect", async (s) => {
      if (s.values[0] == "level") {
        const guildLevel = await GuildLevelSystem.findOne({
          guildID: s.guild.id,
        });
        let control = guildLevel ? guildLevel.levelSystem : false;
        if (!guildLevel || control == false) {
          await GuildLevelSystem.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { levelSystem: true } },
            { upsert: true }
          );
          s.reply({
            content:
              "**Level Sistemi** Aktif Edildi!\nAçılan Komutlar:`.level/toplevel`",
            ephemeral: true,
          });
        } else {
          await GuildLevelSystem.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { levelSystem: false } },
            { upsert: true }
          );
          s.reply({
            content:
              "**Level Sistemi** Kapatıldı!\nKapatılan Komutlar:`.level/toplevel`",
            ephemeral: true,
          });
        }
      }
      if (s.values[0] == "stat") {
        const guildStat = await statSystemDB.findOne({ guildID: s.guild.id });
        let control = guildStat ? guildStat.statSystem : false;
        if (!guildStat || control == false) {
          await statSystemDB.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { statSystem: true } },
            { upsert: true }
          );
          s.reply({
            content:
              "**İstatistik Sistemi** Aktif Edildi!\nAçılan Komutlar:`.me/stat @uye\n.topstat`",
            ephemeral: true,
          });
        } else {
          await statSystemDB.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { statSystem: false } },
            { upsert: true }
          );
          s.reply({
            content:
              "**İstatistik Sistemi** Kapatıldı!\nKapatılan Komutlar:`.me/stat @uye\n.top`",
            ephemeral: true,
          });
        }
      }

      if (s.values[0] == "coin") {
        let coinsystemdb = await guildCoinSystem.findOne({
          guildID: message.guild.id,
        });
        let Coin_system = coinsystemdb ? coinsystemdb.coinSystem : false;
        if (!coinsystemdb || Coin_system == false) {
          await guildCoinSystem.findOneAndUpdate(
            { guildID: message.guild.id },
            { coinSystem: true },
            { upsert: true }
          );
          s.reply({
            content: "**Ekonomi Sistemi** Aktif edildi",
            ephemeral: true,
          });
        } else {
          await guildCoinSystem.findOneAndUpdate(
            { guildID: message.guild.id },
            { coinSystem: true },
            { upsert: true }
          );
          s.reply({
            content: "**Ekonomi Sistemi** Kapatıldı!",
            ephemeral: true,
          });
        }
      }
      if (s.values[0] == "yetki") {
        let missionsystemdb = await missionsystem.findOne({
          guildID: message.guild.id,
        });
        let mission_system = missionsystemdb ? missionsystemdb.only : false;
        if (!missionsystemdb || mission_system == false) {
          await missionsystem.findOneAndUpdate(
            { guildID: message.guild.id },
            { only: true },
            { upsert: true }
          );
          s.reply({
            content:
              "**Yetki Sistemi** Aktif edildi\nAçılan komutlar:`.yetkiliyap,.tagaldir,.yetkililerim,.taglılarım,.yetkim`",
            ephemeral: true,
          });
        } else {
          await missionsystem.findOneAndUpdate(
            { guildID: message.guild.id },
            { only: true },
            { upsert: true }
          );
          s.reply({
            content:
              "**Yetki Sistemi** Kapatıldı! \n kapatılan komutlar:`.yetkiliyap,.tagaldir,.yetkililerim,.taglılarım,.yetkim`",
            ephemeral: true,
          });
        }
      }
      if (s.values[0] == "yasaktag") {
        s.reply({
          content:
            "**Yasaklı Modu** \n\nYasaklı taglarınızı belirlemek ve onları sunucunuzdan uzak tutmak için aşağıda ki örnekte verildiği gibi komutları kullanabilirsiniz. ```\n .yasaklıtag ekle isim/etiket \n.yasakıtag liste \n.yasaklıtag çıkar\n```",
          ephemerl: true,
        });
      }
      if (s.values[0] == "ekip") {
      }
      if (s.values[0] == "tag") {
        await s.deferUpdate();

        s.channel
          .send({
            embeds: [
              new GenerateEmbed()
                .setDescription(
                  `**Tag Modu**nu aktif etmek için aşağıda gösterildiği gibi işlemleri yapınız.`
                )
                .addFields(
                  {
                    name: "Public:",
                    value: `Public Taglarını Ayarlamak İçin "**Public**" Butonuna Tıklayınız.\n\`Tıklamadan Önce Tagınızı, Tagsiz Tagını, Taglı Rolünü ve Taglı Log kanalının ID'sini "Kopyalamayı Unutmayın"\``,
                    inline: true,
                  },
                  {
                    name: "Ekip:",
                    value: `Ekip Taglarını Ayarlamak İçin "**Ekip**" Butonuna Tıklayınız. \n\`Tıklamadan Önce Okuyunuz: Çoklu tag girerken taglar arasında , (virgül) bırakınız aksi takdirte tekrar ayarlamanız gerekebilir. Ve Taglarınızı, Etiket Tagınızı, Taglı Rolünüzü, Taglı Log Kanalının ID'sini kopyalamayı unutmayınız.\``,
                  }
                ),
            ],
            components: [
              new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                  .setCustomId("public")
                  .setLabel("Public")
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId("ekip")
                  .setLabel("ekip")
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId("cop")
                  .setEmoji(message.guild.findReaction(Cop, "ID"))
                  .setStyle(ButtonStyle.Danger),
              ]),
            ],
          })
          .then(async (x) => {
            const filter = (d) => d.user.id == message.member.id;
            const collector = x.createMessageComponentCollector({
              filter: filter,
              errors: ["time"],
              time: 30000,
            });
            collector.on("collect", async (c) => {
              if (c.customId == "public") {
                const modal = new ModalBuilder()
                  .setCustomId("publicTag")
                  .setTitle("Public Tag Sistemi")
                  .setComponents(
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("tag")
                        .setLabel("Sunucu Tagınız.")
                        .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("tagsiz")
                        .setLabel(
                          "Tagsızların İsimlerinin Başına Gelicek Simge"
                        )
                        .setStyle(TextInputStyle.Short)
                        .setMaxLength(1)
                        .setValue("•")
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("tagrol")
                        .setLabel("Taglı Rolü ID")
                        .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("taglog")
                        .setLabel("Tag Log Kanal İD")
                        .setStyle(TextInputStyle.Short)
                    )
                  );
                return await c.showModal(modal, {
                  client: client,
                  interaction: c,
                });
              }
              if (c.customId == "ekip") {
                const modal = new ModalBuilder()
                  .setCustomId("ekipTag")
                  .setTitle("Public Tag Sistemi")
                  .setComponents(
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("taglar")
                        .setLabel("Sunucunuzun Tagları (Taglar arası , koyun)")
                        .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("etag")
                        .setLabel("etiket tagını girin (0001)")
                        .setStyle(TextInputStyle.Short)
                        .setMaxLength(4)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("taglitagsiz")
                        .setLabel("Taglı/Tagsız İsimlerine Gelicek Simge")
                        .setStyle(TextInputStyle.Short)
                        .setValue("•, •")
                        .setMaxLength(4)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("tagrol")
                        .setLabel("Taglılara verilicek rol ID")
                        .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId("taglog")
                        .setLabel("Tag log kanal ID")
                        .setStyle(TextInputStyle.Short)
                    )
                  );
                return await c.showModal(modal, {
                  client: client,
                  interaction: c,
                });
              }
              if (c.customId == "cop") {
                await tagsistem.findOneAndDelete(
                  { guildID: message.guild.id },
                  { upsert: true }
                );
                c.reply({ content: `Tag Modu kapatıldı!`, ephemeral: true });
              }
            });
          });
      }
      if (s.values[0] == "web") {
      }
      if (s.values[0] == "invitesystem") {
        const guildInvite = await guildInviteSystemDB.findOne({
          guildID: message.guild.id,
        });
        const guildInviteControl = guildInvite
          ? guildInvite.InviteSystem
          : false;
        if (!guildInvite || guildInviteControl == false) {
          await guildInviteSystemDB.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { InviteSystem: true } },
            { upsert: true }
          );
          s.reply({
            content:
              "**Invite Sistemi** Aktif Edildi!\nAçılan Komutlar:`.davetim, .topdavet, .invite ekle/çıkar/bonus`",
            ephemeral: true,
          });
        } else {
          await guildInviteSystemDB.findOneAndUpdate(
            { guildID: s.guild.id },
            { $set: { InviteSystem: false } },
            { upsert: true }
          );
          s.reply({
            content:
              "**İstatistik Sistemi** Kapatıldı!\nKapatılan Komutlar:`.davetim, .topdavet, .invite ekle/çıkar/bonus`",
            ephemeral: true,
          });
        }
      }
      if (s.values[0] === "special-room-system") {
        let specialRoomData = await SpecialRoom.findOne({
          guildID: message.guild.id,
        });
        if (specialRoomData) {
          let specialRoomUserData = await SpecialRoomUser.find();
          specialRoomUserData.forEach(async (x) => {
            if (message.guild.channels.cache.get(x.channelID)) {
              message.guild.channels.cache.get(x.channelID).delete();
              await SpecialRoomUser.findOneAndDelete(
                { channelID: x.channelID },
                { upsert: true }
              );
            }
          });
          for (let i = 0; i < emojiSpecalRoomEmojis.length; i++) {
            const emojix = emojiSpecalRoomEmojis[i];
            const e = s.guild.emojis.cache.find((x) => x.name == emojix.name);
            if (e) {
              e.delete().then((x) =>
                s.channel.send({
                  embeds: [
                    new GenerateEmbed().setDescription(
                      `"${emojix.name}" isimli emoji sunucudan silindi!`
                    ),
                  ],
                })
              );
            }
          }
          await SpecialRoom.findOneAndDelete(
            { guildID: message.guild.id },
            { upsert: true }
          );
          s.reply({
            content:
              "Özel Oda Sistemi Kapatıldı!\n- Tüm Özel odalar ve Kategori silindi!",
          });
        } else {
          const category = await message.guild.channels.create({
            name: "Özel Oda",
            type: 4,
            permissionOverwrites: [
              {
                id: roles.jailedRole,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: roles.unregisterRoles[0],
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: roles.suspectRole,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
          const channel = await message.guild.channels.create({
            name: "Oda Oluştur",
            type: 2,
            parent: category.id,
            permissionOverwrites: [
              {
                id: roles.jailedRole,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: roles.unregisterRoles[0],
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: roles.suspectRole,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
          await SpecialRoom.findOneAndUpdate(
            { guildID: message.guild.id },
            {
              $set: {
                only: true,
                date: Date.now(),
                categoryID: category.id,
                channelID: channel.id,
              },
            },
            { upsert: true }
          );
          for (let i = 0; i < emojiSpecalRoomEmojis.length; i++) {
            const emojix = emojiSpecalRoomEmojis[i];
            const e = s.guild.emojis.cache.find((x) => x.name == emojix.name);
            if (e) {
              s.channel.send({
                embeds: [
                  new GenerateEmbed().setDescription(
                    `${emojix.name} emoji sunucuda bulunduğu için tekrar oluşturulmadı!`
                  ),
                ],
              });
            } else {
              await s.guild.emojis
                .create({ attachment: emojix.link, name: emojix.name })
                .then((emoji) =>
                  s.channel.send({
                    embeds: [
                      new GenerateEmbed().setDescription(
                        `${emoji.name} adında bir emoji başarıyla oluşturuldu. Emoji: ${emoji}`
                      ),
                    ],
                  })
                )
                .catch((emoji) => {
                  s.channel.send({
                    embeds: [
                      new GenerateEmbed().setDescription(
                        `"${emojix.name}" emojisi oluşturulamadı!`
                      ),
                    ],
                  });
                });
            }
          }
          s.reply({ content: "Özel Oda Sistemi Kuruldu!" });
        }
      }
    });
  }
}
module.exports = Sistem;
