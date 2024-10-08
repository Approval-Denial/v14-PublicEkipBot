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
  ChannelType,
  PermissionFlagsBits,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {
  GenerateEmbed,
} = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild, emojiler, loglar } = require("../../../../Global/Config/Guild");
const guildConfig = require("../../../../Global/Database/Guild.Config");
const guildRoleConfig = require("../../../../Global/Database/Guild.Roles.Config");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/GuildLevelSystem");
const guildChannelConfig = require("../../../../Global/Database/Guild.Channels.Config");
let BOTS = (global.allBots = client.allBots = []);
const { Bots, botStatus } = require("../../../../Global/Config/Guild").Guild;
const { Client, GatewayIntentBits, Intents, Partials } = require("discord.js");

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
class Setup extends Command {
  constructor(client) {
    super(client, {
      name: "setup",
      description: "Sunucu Kurulumları içindir.",
      usage: ".setup",
      category: "Approval",
      aliases: ["kurulum"],

      enabled: true,
      guildOwner: true,
     
    });
  }

  async onRequest(client, message, args, embed) {
    if (args[0] == "durum") {
      let guildroleconf = await guildRoleConfig.findOne({
        guildID: message.guild.id,
      });
      let guildchannelconf = await guildChannelConfig.findOne({
        guildID: message.guild.id,
      });
      let roller = `- \`Kurucu Rolleri:\` ${
        guildroleconf
          ? guildroleconf.kurucuPerms.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Üst Yönetim:\` ${
        guildroleconf
          ? guildroleconf.üstYönetimPerms.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Orta Yönetim:\` ${
        guildroleconf
          ? guildroleconf.ortaYönetimPerms.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Alt Yönetim:\` ${
        guildroleconf
          ? guildroleconf.altYönetimPerms.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Kayıtsız Rolleri:\` ${
        guildroleconf
          ? guildroleconf.unregisterRoles.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Erkek Rolleri:\` ${
        guildroleconf
          ? guildroleconf.manRoles.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Kadın Rolleri:\` ${
        guildroleconf
          ? guildroleconf.womanRoles.map((x) => `<@&${x}>`).join(", ")
          : "**AYARLANMADI**"
}\n- \`Booster Rolü:\`${
        guildroleconf.boosterRole != undefined
          ? `<@&${guildroleconf.boosterRole}>`
          : "**AYARLANMADI**"
}\n- \`Bot Commands:\` ${
        guildroleconf.botCommandsRole != undefined
          ? `<@&${guildroleconf.botCommandsRole}>`
          : "**AYARLANMADI**"
}\n- \`Register Staff:\` ${
        guildroleconf.registerStaffRole != undefined
          ? `${guildroleconf.registerStaffRole.map((x) => `<@&${x}>`)}`
          : "**AYARLANMADI**"
}\n- \`Ban Staff:\` ${
        guildroleconf.banStaffRole != undefined
          ? `<@&${guildroleconf.banStaffRole}>`
          : "**AYARLANMADI**"
}\n- \`Jail Staff:\` ${
        guildroleconf.jailedStaffRole != undefined
          ? `<@&${guildroleconf.jailedStaffRole}>`
          : "**AYARLANMADI**"
}\n- \`C-Mute Staff:\` ${
        guildroleconf.chatMuteStaffRole != undefined
          ? `${guildroleconf.chatMuteStaffRole.map((x) => `<@&${x}>`)}`
          : "**AYARLANMADI**"
}\n- \`V-Mute Staff:\` ${
        guildroleconf.voiceMuteStaffRole != undefined
          ? `${guildroleconf.voiceMuteStaffRole.map((x) => `<@&${x}>`)}`
          : "**AYARLANMADI**"
}\n- \`Şüpheli:\` ${
        guildroleconf.suspectRole != undefined
          ? `<@&${guildroleconf.suspectRole}>`
          : "**AYARLANMADI**"
}\n- \`Yasaklı Tag:\` ${
        guildroleconf.bannedTagRole != undefined
          ? `<@&${guildroleconf.bannedTagRole}>`
          : "**AYARLANMADI**"
}\n- \`Cezalı (Jailed):\` ${
        guildroleconf.jailedRole != undefined
          ? `<@&${guildroleconf.jailedRole}>`
          : "**AYARLANMADI**"
}\n- \`Bot Rolü:\` ${
        guildroleconf.botRole != undefined
          ? `<@&${guildroleconf.botRole}>`
          : "**AYARLANMADI**"
}\n- \`C-Muted:\` ${
        guildroleconf.chatMutedRole != undefined
          ? `<@&${guildroleconf.chatMutedRole}>`
          : "**AYARLANMADI**"
}\n- \`V-Muted:\` ${
        guildroleconf.voiceMutedRole != undefined
          ? `<@&${guildroleconf.voiceMutedRole}>`
          : "**AYARLANMADI**"
      }`;
      let kanallar = `- \`Hoşgeldin Kanalı:\`${
        guildchannelconf.welcomeChannel != undefined
          ? `<#${guildchannelconf.welcomeChannel}>`
          : "**AYARLANMADI**"
}\n- \`Şüpheli Hesap Log:\`${
        guildchannelconf.suspectLog != undefined
          ? `<#${guildchannelconf.suspectLog}>`
          : "**AYARLANMADI**"
}\n- \`Ban Log:\`${
        guildchannelconf.bannedLog != undefined
          ? `<#${guildchannelconf.bannedLog}>`
          : "**AYARLANMADI**"
}\n- \`Jailed Log:\`${
        guildchannelconf.jailedLog != undefined
          ? `<#${guildchannelconf.jailedLog}>`
          : "**AYARLANMADI**"
}\n- \`C-Muted Log:\`${
        guildchannelconf.cMutedLog != undefined
          ? `<#${guildchannelconf.cMutedLog}>`
          : "**AYARLANMADI**"
}\n- \`V-Muted Log:\`${
        guildchannelconf.vMutedLog != undefined
          ? `<#${guildchannelconf.vMutedLog}>`
          : "**AYARLANMADI**"
}\n- \`Davet Log:\`${
        guildchannelconf.inviteLog != undefined
          ? `<#${guildchannelconf.inviteLog}>`
          : "**AYARLANMADI**"
}\n- \`Ceza Puan:\`${
        guildchannelconf.penaltyPointsLog != undefined
          ? `<#${guildchannelconf.penaltyPointsLog}>`
          : "**AYARLANMADI**"
}\n- \`Chat (Genel Sohbet):\`${
        guildchannelconf.chatChannel != undefined
          ? `<#${guildchannelconf.chatChannel}>`
          : "**AYARLANMADI**"
      }`;

      let msg = await message.channel.send({
        embeds: [
          new GenerateEmbed().setDescription(
            "Aşağıda butonlardan birine tıklayınız."
          ),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("rol")
              .setLabel("Roller")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId("kanal")
              .setLabel("Kanallar")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId("log")
              .setLabel("Loglar")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId("emoji")
              .setLabel("Emojiler")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });
      const filter = (d) => d.user.id == message.member.id;
      const collector = msg.createMessageComponentCollector({
        filter: filter,
        errors: ["time"],
        time: 30000 * 10,
      });
      collector.on("collect", async (d) => {
        await d.deferUpdate();
        if (d.customId == "rol") {
          await msg.edit({
            embeds: [
              new GenerateEmbed()
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL(),
                })
                .setDescription(roller),
            ],
          });
        }
        if (d.customId == "kanal") {
          await msg.edit({
            embeds: [
              new GenerateEmbed()
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL(),
                })
                .setDescription(kanallar),
            ],
          });
        }
        if (d.customId == "emoji") {
          let bulunuyor, bulunmuyor;
          for (let i = 0; i < emojiler.length; i++) {
            const emojix = emojiler[i];
            const e = message.guild.emojis.cache.find(
              (x) => x.name == emojix.name
            );
            if (e) {
              bulunuyor += `  - ${e}:\\${e}\n`;
            } else {
              bulunmuyor += `${emojix.name}:${emojix.link}\n`;
            }
          }
          msg.edit({
            embeds: [
              new GenerateEmbed()
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL(),
                })
                .setDescription(
                  `- Yüklenmiş Emojiler; \n${bulunuyor}\n- Yüklenmemiş Emojiler;\n ${bulunmuyor}`
                ),
            ],
          });
        }
        if (d.customId == "log") {
          let bulunuyor = "** **";
          let bulunmuyor = [];

          for (let i = 0; i < loglar.length; i++) {
            const log = loglar[i];
            const e = message.guild.channels.cache.find((x) => x.name === log);
            if (e) {
              bulunuyor += `  - ${e}\n`;
            } else {
              bulunmuyor.push(log);
            }
          }

          await msg.edit({
            embeds: [
              new GenerateEmbed()
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL(),
                })
                .setDescription(
                  `- Kurulmuş Log Kanalları; \n${bulunuyor}\n- Kurulmamış Log Kanalları;\n ${bulunmuyor.join(
                    "\n"
                  )}`
                ),
            ],
          });
        }
      });
    }
    if (!args[0]) {
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder("Bir işlem seçiniz!")
          .setCustomId("kurulum")
          .setOptions([
            {
              value: "rol",
              description: "Rol ayarlarını buradan yapabilirsin",
              label: "Rol Ayaları",
              emoji: { name: "⚙" },
            },
            {
              value: "kanal",
              description: "Kanal ayarlarını buradan yapabilirsiniz.",
              label: "Kanal Ayarları",
              emoji: { name: "⚙" },
            },
            {
              value: "emoji",
              description: undefined,
              label: "Bot Emojileri",
              emoji: { name: "😀" },
            },
            {
              value: "log",
              description: undefined,
              label: "Bot Log Kanalları",
              emoji: { name: "⚙" },
            },
          ])
      );
      let x = await message.channel.send({
        embeds: [
          new GenerateEmbed()
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `${message.member} Sunucu kurulumuna hoşgeldin, Aşağıda bulunan butonlardan yapmak istediğin ayarın panelini açabilirsin.`
            )
            .setFooter({
              text: `Developed By Luppux`,
              iconURL:
                "https://cdn.discordapp.com/avatars/852800814808694814/ebbfb60a934c72b3c730a6ab695f28e7.webp",
            }),
        ],
        components: [row],
      });
      const filter = (i) => i.user.id == message.member.id;
      const collector = x.createMessageComponentCollector({
        filter: filter,
        errors: ["time"],
        time: 30000 * 10,
      });
      collector.on("collect", async (i) => {
        const roleSelectMenuOptions = [
          {
            label: "Kayıtsız",
            description: "Kayıtsız Rollerini ayarlamak için tıklayın",
            value: "unregister",
            multi: true,
            db_value: "unregisterRoles",
          },
          {
            label: "Erkek Rolleri",
            description: "Erkek Rollerini ayarlamak için tıklayın",
            value: "erkek",
            multi: true,
            db_value: "manRoles",
          },
          {
            label: "Kadın Rolleri",
            description: "Kadın Rollerini ayarlamak için tıklayın",
            value: "kadin",
            multi: true,
            db_value: "womanRoles",
          },
          {
            label: "Booster Rolü",
            description: "Booster rolünü ayarlamak için tıklayın",
            value: "booster",
            single: true,
            db_value: "boosterRole",
          },
          {
            label: "Kayıt Görevlisi",
            description: "Kayıt Görevlisi rolünü ayarlamak için tıklayın",
            value: "register",
            multi: true,
            db_value: "registerStaffRole",
          },
          {
            label: "C-Mute Görevlisi",
            description: "C-Mute Görevlisi rolünü ayarlamak için tıklayın",
            value: "cmute",
            multi: true,
            db_value: "chatMuteStaffRole",
          },
          {
            label: "V-Mute Görevlisi",
            description: "V-Mute Görevlisi rolünü ayarlamak için tıklayın",
            value: "vmute",
            multi: true,
            db_value: "voiceMuteStaffRole",
          },
          {
            label: "Ban Görevlisi",
            description: "Ban Görevlisi rolünü ayarlamak için tıklayın",
            value: "ban",
            multi: true,
            db_value: "banStaffRole",
          },
          {
            label: "Jail Görevlisi",
            description: "Jail Görevlisi rolünü ayarlamak için tıklayın",
            value: "jail",
            multi: true,
            db_value: "jailedStaffRole",
          },
          {
            label: "Bot Command Görevlisi",
            description: "Bot Commands Rolünü ayarlamak için tıklayın",
            value: "botcommand",
            single: true,
            db_value: "botCommandsRole",
          },
          {
            label: "Şüpheli Kullanıcı Rolü",
            description: "Şüpheli Kullanıcı Rolünü ayarlamak için tıklayın",
            value: "supheli",
            single: true,
            db_value: "suspectRole",
          },
          {
            label: "Cezalı Rolü",
            description: "Cezalı Rolünü ayarlamak için tıklayın",
            value: "cezali",
            single: true,
            db_value: "jailedRole",
          },
          {
            label: "Yasaklı Tag Rolü",
            description: "Yasaklı Tag Rolünü ayarlamak için tıklayın",
            value: "yasaktag",
            single: true,
            db_value: "bannedTagRole",
          },
          {
            label: "Bot Rolü",
            description: "Bot Rolü ayarlamak için tıklayın",
            value: "botrol",
            single: true,
            db_value: "botRole",
          },
          {
            label: "C-Muted Rolü",
            description: "C-Muted Rolünü ayarlamak için tıklayın",
            value: "cmuted",
            single: true,
            db_value: "chatMutedRole",
          },
          {
            label: "V-Muted Rolü",
            description: "V-Muted Rolünü ayarlamak için tıklayın",
            value: "vmuted",
            single: true,
            db_value: "voiceMutedRole",
          },
          {
            label: "Kurucu Rolleri",
            description: "Kurucu Rollerini ayarlamak için tıklayın",
            value: "kurucurolleri",
            multi: true,
            db_value: "kurucuPerms",
          },
          {
            label: "Üst Yönetim Rolleri",
            description: "ÜSt Yönetim Rollerini ayarlamak için tıklayın",
            value: "ustyonetim",
            multi: true,
            db_value: "üstYönetimPerms",
          },
          {
            label: "Orta Yönetim Rolleri",
            description: "Orta Yönetim Rollerini ayarlamak için tıklayın",
            value: "ortayonetim",
            multi: true,
            db_value: "ortaYönetimPerms",
          },
          {
            label: "Alt Yönetim Rolleri",
            description: "Alt Yönetim Rollerini ayarlamak için tıklayın",
            value: "altyonetim",
            multi: true,
            db_value: "altYönetimPerms",
          },
        ];
        await i.deferUpdate();
        if (i.values[0] === "rol") {
          const menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("roleconfig")
              .setPlaceholder("Ayarlamak istediğiniz rolü menüden seçin")
              .setOptions(roleSelectMenuOptions)
              .setMaxValues(1)
              .setMinValues(1)
          );
          i.channel
            .send({
              components: [menu],
              embeds: [
                new GenerateEmbed()
                  .setAuthor({
                    name: i.guild.name,
                    iconURL: i.guild.iconURL({ dynamic: true }),
                  })
                  .setDescription(
                    "Ayarlamak istediğiniz rol(leri) aşağıdaki menüden seçin."
                  ),
              ],
            })
            .then(async (rolsetupMsg) => {
              const filter = (c) => c.user.id == message.member.id;
              const collector = rolsetupMsg.createMessageComponentCollector({
                filter: filter,
                errors: ["time"],
                time: 30000 * 10,
              });
              collector.on("collect", async (r) => {
                await r.deferUpdate();
                roles = global.roles = await guildRoleConfig.findOne({
                  guildID: message.guild.id,
                });
                for (
                  let index = 0;
                  index < roleSelectMenuOptions.length;
                  index++
                ) {
                  const approval = roleSelectMenuOptions[index];
                  if (r.values[0] === approval.value) {
                    if (approval?.single === true) {
                      r.channel
                        .send({
                          components: [
                            new ActionRowBuilder().addComponents(
                              new RoleSelectMenuBuilder().setCustomId(
                                "roleSelectMenu_Setup"
                              )
                            ),
                          ],
                          content:
                            'Aşağıda bulunan menüden "' +
                            approval.label +
                            '" seçeneği için ayarlamak istediğiniz rolleri seçiniz.',
                        })
                        .then(async (registersetup) => {
                          const filter = (rs) =>
                            rs.user.id == message.member.id;
                          const collector =
                            registersetup.createMessageComponentCollector({
                              filter: filter,
                              errors: ["time"],
                              time: 30000 * 10,
                            });
                          collector.on("collect", async (rs) => {
                            var role = rs.values[0];
                            console.log(rs.values);
                            await guildRoleConfig.findOneAndUpdate(
                              { guildID: rs.guild.id },
                              { $set: { [approval.db_value]: role } },
                              { upsert: true }
                            );
                            rs.reply({
                              content: `<@&${role}> Rolü **Register Staff** olarak ayarlandı.`,
                              ephemeral: true,
                            });
                            if (registersetup) registersetup.delete();
                          });
                        });
                    }
                    if (approval?.multi === true) {
                      r.channel
                        .send({
                          components: [
                            new ActionRowBuilder().addComponents(
                              new RoleSelectMenuBuilder()
                                .setCustomId("roleSelectMenu_Setup")
                                .setMaxValues(25)
                            ),
                          ],
                          content:
                            'Aşağıda bulunan menüden "' +
                            approval.label +
                            '" seçeneği için ayarlamak istediğiniz rolleri seçiniz.',
                        })
                        .then(async (registersetup) => {
                          const filter = (rs) =>
                            rs.user.id == message.member.id;
                          const collector =
                            registersetup.createMessageComponentCollector({
                              filter: filter,
                              errors: ["time"],
                              time: 30000 * 10,
                            });
                          collector.on("collect", async (rs) => {
                            await guildRoleConfig.findOneAndUpdate(
                              { guildID: rs.guild.id },
                              { $set: { [approval.db_value]: rs.values } },
                              { upsert: true }
                            );
                            rs.reply({
                              content: `${rs.values
                                .map((role) => `<@&${role}>`)
                                .join(
                                  ", "
                                )} rolleri **Register Staff** olarak ayarlandı.`,
                              ephemeral: true,
                            });
                            if (registersetup) registersetup.delete();
                          });
                        });
                    }
                  }
                }
              });
            });
        }
        if (i.values[0] === "kanal") {
          const channelsSelectMenuOptions = [
            {
              value: "welcome",
              label: "Hoşgeldin kanalı",
              description: undefined,
              db_value: "welcomeChannel",
            },
            {
              value: "suspect",
              label: "Şüpheli hesap log",
              description: undefined,
              db_value: "suspectLog",
            },
            {
              value: "chat",
              label: "Chat (Sohbet)",
              description: undefined,
              db_value: "chatChannel",
            },
            {
              value: "jailedlog",
              label: "Jail (Cezalı) Log",
              description: undefined,
              db_value: "jailedLog",
            },
            {
              value: "banlog",
              label: "Ban Log",
              description: undefined,
              db_value: "bannedLog",
            },
            {
              value: "cmuted",
              label: "C-Muted Log",
              description: undefined,
              db_value: "cMutedLog",
            },
            {
              value: "vmuted",
              label: "V-Muted Log",
              description: undefined,
              db_value: "vMutedLog",
            },
            {
              value: "invitelog",
              label: "İnvite Log",
              description: undefined,
              db_value: "inviteLog",
            },
            {
              value: "cezapuanlog",
              label: "Ceza Puan Log",
              description: undefined,
              db_value: "penaltyPointsLog",
            },
          ];
          const menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("roleconfig")
              .setPlaceholder("Ayarlamak istediğiniz rolü menüden seçin")
              .setOptions(channelsSelectMenuOptions)
          );
          await message.channel
            .send({
              embeds: [
                new GenerateEmbed().setDescription(
                  "Ayarlamak istediğiniz kanal logunu menüden seçiniz"
                ),
              ],
              components: [menu],
            })
            .then(async (kanallogsetupmsg) => {
              const filter = (c) => c.user.id == message.member.id;
              const collector =
                kanallogsetupmsg.createMessageComponentCollector({
                  filter: filter,
                  errors: ["time"],
                  time: 30000 * 10,
                });
              collector.on("collect", async (k) => {
                await k.deferUpdate();
                channels = global.channels = await guildChannelConfig.findOne({
                  guildID: message.guild.id,
                });

                for (
                  let index = 0;
                  index < channelsSelectMenuOptions.length;
                  index++
                ) {
                  const approval = channelsSelectMenuOptions[index];
                  if (k.values[0] == approval.value) {
                    k.channel
                      .send({
                        components: [
                          new ActionRowBuilder().addComponents(
                            new ChannelSelectMenuBuilder()
                              .setChannelTypes(ChannelType.GuildText)
                              .setCustomId("channelSelectMenu_Setup")
                          ),
                        ],
                        content:
                          "Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz.",
                      })
                      .then(async (registersetup) => {
                        const filter = (rs) => rs.user.id == message.member.id;
                        const collector =
                          registersetup.createMessageComponentCollector({
                            filter: filter,
                            errors: ["time"],
                            time: 30000 * 10,
                          });
                        collector.on("collect", async (rs) => {
                          var role = rs.values[0];
                          await guildChannelConfig.findOneAndUpdate(
                            { guildID: rs.guild.id },
                            { $set: { [approval.db_value]: role } },
                            { upsert: true }
                          );
                          rs.reply({
                            content: `<#${role}> Kanalı **${approval.label}** olarak ayarlandı.`,
                            ephemeral: true,
                          });
                          if (registersetup) registersetup.delete();
                        });
                      });
                  }
                }
              });
            });
        }
        if (i.values[0] === "emoji") {
          const menu = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("kur")
              .setLabel("Emojileri Kur.")
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId("sil")
              .setLabel("Emojileri Kaldır.")
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId("kontrol")
              .setLabel("Emojileri Kontrol Et.")
              .setStyle(ButtonStyle.Primary)
          );
          i.channel
            .send({
              components: [menu],
              embeds: [
                new GenerateEmbed()
                  .setAuthor({
                    name: i.guild.name,
                    iconURL: i.guild.iconURL({ dynamic: true }),
                  })
                  .setDescription(
                    "Ayarlamak istediğiniz rol(leri) aşağıdaki menüden seçin."
                  ),
              ],
            })
            .then(async (emojiSetupMsg) => {
              const filter = (c) => c.user.id == message.member.id;
              const collector = emojiSetupMsg.createMessageComponentCollector({
                filter: filter,
                errors: ["time"],
                time: 30000 * 10,
              });
              collector.on("collect", async (e) => {
                if (e.customId === "kur") {
                  for (let i = 0; i < emojiler.length; i++) {
                    const emojix = emojiler[i];
                    const e = emojiSetupMsg.guild.emojis.cache.find(
                      (x) => x.name == emojix.name
                    );
                    if (e) {
                      emojiSetupMsg.channel.send({
                        embeds: [
                          new GenerateEmbed().setDescription(
                            `${emojix.name} emoji sunucuda bulunduğu için tekrar oluşturulmadı!`
                          ),
                        ],
                      });
                    } else {
                      await emojiSetupMsg.guild.emojis
                        .create({ attachment: emojix.link, name: emojix.name })
                        .then((emoji) =>
                          emojiSetupMsg.channel.send({
                            embeds: [
                              new GenerateEmbed().setDescription(
                                `${emoji.name} adında bir emoji başarıyla oluşturuldu. Emoji: ${emoji}`
                              ),
                            ],
                          })
                        )
                        .catch((emoji) => {
                          emojiSetupMsg.channel.send({
                            embeds: [
                              new GenerateEmbed().setDescription(
                                `"${emojix.name}" emojisi oluşturulamadı!`
                              ),
                            ],
                          });
                        });
                    }
                  }
                }
                if (e.customId === "sil") {
                  for (let i = 0; i < emojiler.length; i++) {
                    const emojix = emojiler[i];
                    const e = emojiSetupMsg.guild.emojis.cache.find(
                      (x) => x.name == emojix.name
                    );
                    if (e) {
                      e.delete().then((x) =>
                        emojiSetupMsg.channel.send({
                          embeds: [
                            new GenerateEmbed().setDescription(
                              `"${emojix.name}" isimli emoji sunucudan silindi!`
                            ),
                          ],
                        })
                      );
                    }
                  }
                }
                if (e.customId === "kontrol") {
                  let bulunuyor, bulunmuyor;
                  for (let i = 0; i < emojiler.length; i++) {
                    const emojix = emojiler[i];
                    const e = emojiSetupMsg.guild.emojis.cache.find(
                      (x) => x.name == emojix.name
                    );
                    if (e) {
                      bulunuyor += `  -${e}:\\${e}\n`;
                    } else {
                      bulunmuyor += `${emojix.name}:${emojix.link}\n`;
                    }
                  }
                  emojiSetupMsg.channel.send({
                    embeds: [
                      new GenerateEmbed()
                        .setAuthor({
                          name: emojiSetupMsg.guild.name,
                          iconURL: emojiSetupMsg.guild.iconURL(),
                        })
                        .setDescription(
                          `- Yüklenmiş Emojiler; \n ${bulunuyor}\n- Yüklenmemiş Emojiler;\n ${bulunmuyor}`
                        ),
                    ],
                  });
                }
              });
            });
        }
        if (i.values[0] === "log") {
          const menu = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("kur")
              .setLabel("Logları Kur.")
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId("sil")
              .setLabel("Logları Kaldır.")
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId("kontrol")
              .setLabel("Logları Kontrol Et.")
              .setStyle(ButtonStyle.Primary)
          );
          i.channel
            .send({
              components: [menu],
              embeds: [
                new GenerateEmbed()
                  .setAuthor({
                    name: i.guild.name,
                    iconURL: i.guild.iconURL({ dynamic: true }),
                  })
                  .setDescription(
                    "Ayarlamak istediğiniz rol(leri) aşağıdaki menüden seçin."
                  ),
              ],
            })
            .then(async (emojiSetupMsg) => {
              const filter = (c) => c.user.id == message.member.id;
              const collector = emojiSetupMsg.createMessageComponentCollector({
                filter: filter,
                errors: ["time"],
                time: 30000 * 10,
              });
              collector.on("collect", async (e) => {
                if (e.customId === "kur") {
                  let kat;
                  if (
                    !message.guild.channels.cache.find(
                      (x) => x.name == "Luppux-Log"
                    )
                  )
                    kat = await message.guild.channels.create({
                      name: "Luppux-Log",
                      type: ChannelType.GuildCategory,
                      permissionOverwrites: [
                        {
                          id: message.guild.id,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                      ],
                    });
                  if (
                    message.guild.channels.cache.find(
                      (x) => x.name == "Luppux-Log"
                    )
                  )
                    kat = await message.guild.channels.cache.find(
                      (x) => x.name == "Luppux-Log"
                    );
                  loglar.forEach(async (kanal) => {
                    if (
                      !message.guild.channels.cache.find((x) => x.name == kanal)
                    ) {
                      await message.guild.channels
                        .create({
                          name: kanal,
                          type: ChannelType.GuildText,
                          permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: [PermissionFlagsBits.ViewChannel],
                            },
                          ],
                        })
                        .then(
                          async (channel) =>
                            await channel.setParent(kat, {
                              lockPermissions: true,
                            })
                        );
                    }
                  });
                  await e.reply({
                    content: "Log kanallarının kurulumu tamamlandı!",
                  });
                }
                if (e.customId === "sil") {
                  loglar.forEach(async (kanal) => {
                    if (
                      message.guild.channels.cache.find((x) => x.name == kanal)
                    ) {
                      await message.guild.channels.cache
                        .find((x) => x.name == kanal)
                        .delete();
                    }
                  });
                  if (
                    message.guild.channels.cache.find(
                      (x) => x.name == "Luppux-Log"
                    )
                  )
                    message.guild.channels.cache
                      .find((x) => x.name == "Luppux-Log")
                      .delete();
                  await e.reply({
                    content: "**Sunucuda bulunan log kanalları silindi.**",
                  });
                }
                if (e.customId === "kontrol") {
                  let bulunuyor = "** **";
                  let bulunmuyor = [];

                  for (let i = 0; i < loglar.length; i++) {
                    const log = loglar[i];
                    const e = message.guild.channels.cache.find(
                      (x) => x.name === log
                    );
                    if (e) {
                      bulunuyor += `  - ${e}\n`;
                    } else {
                      bulunmuyor.push(log);
                    }
                  }

                  emojiSetupMsg.channel.send({
                    embeds: [
                      new GenerateEmbed()
                        .setAuthor({
                          name: emojiSetupMsg.guild.name,
                          iconURL: emojiSetupMsg.guild.iconURL(),
                        })
                        .setDescription(
                          `- Kurulmuş Log Kanalları; \n ${bulunuyor}\n- Kurulmamış Log Kanalları;\n ${bulunmuyor.join(
                            "\n"
                          )}`
                        ),
                    ],
                  });
                }
              });
            });
        }
      });
    }
  }
}
module.exports = Setup;
