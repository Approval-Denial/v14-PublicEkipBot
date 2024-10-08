
const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
let BOTS =  []
const { Bots, botStatus } = require("../../../../Global/Config/Guild").Guild
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class BotsEdit extends Command {
    constructor(client) {
        super(client, {
            name: "bot",
            description: "Botları istediğiniz gibi düzenlersiniz",
            usage: ".bot",
            category: "Approval",
            aliases: ["bot", "b"],
            enabled: true,

            cooldown: 3500,
            developer: true
        });
    }

    async onLoad(client) {
        let allTokens = [Bots.mainToken, Bots.statToken, Bots.ProsecutorToken, Bots.guardOne, Bots.guardTwo, Bots.guardThree, ...Bots.Dis]
        allTokens.forEach(async (token) => {
            let botClient;
            botClient = new Client({
                intents: [32767],
                presence: { activities: [{ name: botStatus }], status: "dnd" }
            });

            botClient.on("ready", async () => {
                BOTS.push(botClient)
            })
            await botClient.login(token).catch(err => {
            })
        })
    }

    async onRequest(client, message, args, embed) {
        let OWNBOTS = []
        BOTS.forEach(bot => {
            OWNBOTS.push({
                value: bot.user.id,
                label: `${bot.user.tag}`,
                description: `${bot.user.id}`
            })
        })
        let Row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("selectBot")
                .setPlaceholder("Güncellenmesini istediğiniz botu seçin.")
                .setOptions(
                    OWNBOTS
                )
        )

        let msg = await message.channel.send({ embeds: [
            new GenerateEmbed().setDescription(`Aşağıda sıralanmakta olan botların ismini, profil fotoğrafını, durumunu ve hakkındasını değişmesini istediğiniz bir botu seçiniz.`)], components: [Row] })
        const filter = i => i.user.id == message.member.id
        const collector = msg.createMessageComponentCollector({ filter: filter, errors: ["time"], time: 35000 })

        collector.on('collect', async (botSetupint) => {
            if (botSetupint.customId == "selectBot") {
                let type = botSetupint.values
                if (!type) return await botSetupint.reply({ content: "Bir bot veya işlem bulunamadı!", ephemeral: true })

                let botId = botSetupint.values
                let botClient = BOTS.find(bot => bot.user.id == type)
                if (!botClient) return await botSetupint.reply({ content: "Bir bot veya işlem bulunamadı!", ephemeral: true })
                let updateRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("selectAvatar")
                        .setEmoji("943286130357444608")
                        .setLabel("Profil Fotoğrafı Değişikliliği")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId("selectName")
                        .setEmoji("943290426562076762")
                        .setLabel("İsim Değişikliliği")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId("selectAbout")
                        .setEmoji("943290446329835570")
                        .setLabel("Hakkında Değişikliliği")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId("selectState")
                        .setEmoji("951514358377234432")
                        .setLabel("Durum Değişikliliği")
                        .setStyle(ButtonStyle.Secondary),
                )
                msg.delete().catch(err => { })
                await message.channel.send({
                    embeds: [new GenerateEmbed().setDescription(`${botClient.user} (**${botClient.user.tag}**) isimli bot üzerinde yapmak istediğiniz değişikliliği seçiniz?`)], components: [
                        updateRow
                    ]
                }).then(msg => {
                    const filter = i => i.user.id == message.member.id
                    const collector = msg.createMessageComponentCollector({ filter: filter, errors: ["time"], time: 35000 })
                    collector.on("collect", async (i) => {
                        let botClient = BOTS.find(bot => bot.user.id == botId)
                        if (!botClient) return await i.reply({ content: "Bir bot veya işlem bulunamadı!", ephemeral: true })
                        if (i.customId == "selectAbout" || i.customId == "selectState") {
                            await i.reply({ content: `Şuan yapım aşamasında.`, ephemeral: true })
                        }
                        if (i.customId == "selectAvatar") {

                            msg.edit({ embeds: [new GenerateEmbed().setDescription(` ${botClient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)], components: [] })
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({ filter: isimfilter, time: 60000, max: 1, errors: ["time"] })

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => { });
                                    message.replyReaction(message.guild.findReaction(Cross, "ID"));
                                    await i.reply({ content: ` Profil resmi değiştirme işlemi iptal edildi.`, ephemeral: true })
                                    return;
                                };
                                let eskinick = botClient.user.avatarURL({ dynamic: true })
                                let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                let isim = m.content || m.attachments.first().url
                                if (!isim) {
                                    message.replyReaction(message.guild.findReaction(Cross, "ID"));
                                    msg.delete().catch(err => { });
                                    await i.reply({ content: ` Profil resmi belirtilmediği için işlem iptal edildi.`, ephemeral: true })
                                    return;
                                }
                                botClient.user.setAvatar(isim).then(x => {
                                    bekle.delete().catch(err => { })
                                    msg.delete().catch(err => { })
                                    let logChannel = message.guild.kanalBul("guild-log")
                                    if (logChannel) logChannel.send({ embeds: [new GenerateEmbed().setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun profil resmi değiştirildi.`).setThumbnail(botClient.user.avatarURL())] })
                                    message.channel.send({ embeds: [new GenerateEmbed().setDescription(` Başarıyla! ${botClient.user} isimli botun profil resmi güncellendi!`).setThumbnail(botClient.user.avatarURL())] }).then(async x => {
                                        message.replyReaction(message.guild.findReaction(Tik, "ID"))
                                        setTimeout(() => {
                                            x.delete().catch(err => { })
                                        }, 30000);
                                    })
                                }).catch(err => {
                                    bekle.delete().catch(err => { })
                                    msg.delete().catch(err => { })
                                    message.channel.send(` **${botClient.user.tag}**, Başarısız! profil resmi güncelleyebilmem için biraz beklemem gerek!`).then(async x => {
                                        message.replyReaction(message.guild.findReaction(Cross, "ID"));
                                        setTimeout(() => {
                                            x.delete().catch(err => { })
                                        }, 7500);
                                    })
                                })
                            });

                            col.on('end', collected => {
                                msg.delete().catch(err => { });
                            });
                        }
                        if (i.customId == "selectName") {
                            msg.edit({ embeds: [new GenerateEmbed().setDescription(` ${botClient.user} isimli botun yeni ismini belirtin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)], components: [] })
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({ filter: isimfilter, time: 60000, max: 1, errors: ["time"] })

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => { });
                                    message.replyReaction(message.guild.findReaction(Cross, "ID"));
                                    await i.reply({ content: ` İsim değiştirme işlemi iptal edildi.`, ephemeral: true })
                                    return;
                                };
                                let eskinick = botClient.user.username
                                let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                let isim = m.content
                                botClient.user.setUsername(isim).then(x => {
                                    bekle.delete().catch(err => { })
                                    msg.delete().catch(err => { })
                                    let logChannel = message.guild.kanalBul("guild-log")
                                    if (logChannel) logChannel.send({ embeds: [new GenerateEmbed().setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun ismi değiştirildi.\n**${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak güncellendi.`)] })
                                    message.channel.send({ embeds: [new GenerateEmbed().setDescription(` Başarıyla! **${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak değiştirildi.`)] }).then(async x => {
                                        message.replyReaction(message.guild.findReaction(Tik, "ID"))
                                        setTimeout(() => {
                                            x.delete().catch(err => { })
                                        }, 30000);
                                    })
                                }).catch(err => {
                                    bekle.delete().catch(err => { })
                                    msg.delete().catch(err => { })
                                    message.channel.send(` **${botClient.user.tag}**, Başarısız! isim değiştirebilmem için biraz beklemem gerek!`).then(async x => {
                                        message.replyReaction(message.guild.findReaction(Cross, "ID"));
                                        setTimeout(() => {
                                            x.delete().catch(err => { })
                                        }, 7500);
                                    })
                                })
                            });

                            col.on('end', collected => {
                                msg.delete().catch(err => { });
                            });
                        }
                    })
                })

            }
        })

        collector.on("end", async () => {
            msg.delete().catch(err => { })
        })

    }
}

module.exports = BotsEdit
