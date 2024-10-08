const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis");

const { EmbedBuilder, codeBlock, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const CommandSettings = require("../../../../Global/Database/Bot/Command.Settings.");
const { editArray } = require("../../../../Global/Functions/editArray");

class Commands extends Command {
    constructor(client) {
        super(client, {
            name: "Commands",
            description: "Bot/kod yenileme işlemini yapar.",
            usage: ".Commands",
            category: "Approval",
            aliases: ["cmd", "command", "commands", "komut"],
            enabled: true,
            developer: true
        });
    }
    async onRequest(client, message, args) {
        let _find = args[0].toLocaleLowerCase()
        let command = client.commands.get(_find) || client.aliases.get(_find);
        if (!command) return message.reply({ embeds: [new GenerateEmbed().setDescription(`**${args[0]}** adında bir komut bulunamadı.`)] }).destroyMessage()
        const commandName = command.name.replace(/\.[^/.]+$/, "")
        message.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`**${commandName}** isimli komut için aşağıda ki butonları kullanarak bir işlem seçiniz.`)
            ],
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new ButtonBuilder().setCustomId("restart").setLabel("Restart").setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId("onlyRoles").setLabel("Rol Ekle").setStyle(ButtonStyle.Success).setDisabled(true),
                        new ButtonBuilder().setCustomId("onlyChannels").setLabel("Kanal Ekle").setStyle(ButtonStyle.Success).setDisabled(false),
                    )
            ]
        }).then(async msg => {
            var filter = i => i.user.id === message.member.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
            collector.on('collect', async (i) => {
                if (i.customId === "restart") {
                    try {
                        delete require.cache[require.resolve(`../${command.location}/${command.name}`)];
                        const cmd = new (require(`../${command.location}/${command.name}`))(client);
                        cmd.location = command.location;
                        if (cmd) cmd.on()
                        await message.replyReaction(message.guild.findReaction(Tik, "ID"))
                        i.reply({
                            embeds: [new GenerateEmbed().setDescription(`\`${commandName}\` adlı komut yeniden başlatıldı!`)],
                            ephemeral: true
                        })
                        msg.delete()
                    } catch (error) {
                        await message.replyReaction(message.guild.findReaction(Cross, "ID"))
                        i.reply({
                            embeds: [
                                new GenerateEmbed()
                                    .setDescription(`\`${commandName}\` adlı komut yeniden başlatılamadı!`)
                                    .setFields({ name: "Hata", value: `${codeBlock("md", error)}` })
                            ],
                            ephemeral: true
                        })
                    }
                }
                if (i.customId === "onlyChannels") {
                    i.deferUpdate();
                    var commandData = await CommandSettings.findOne({ commandName: commandName });
                    var onlyChannels = commandData ? commandData.onlyChannels : []
                    i.channel.send({
                        embeds: [
                            new GenerateEmbed()
                                .setDescription(`\`${commandName}\` isimli komutu kullanıma açık olacağı kanalları aşağıdan seçiniz.`)
                                .setFooter({ text: "Eklenmiş kanalı seçerseniz, kanal kaldırılır." })
                                .addFields(
                                    { name: `Geçerli Kanallar (${onlyChannels.length})`, value: `${onlyChannels.length > 0 ? onlyChannels.map(x => `<#${x}>`).join(", ") : "Ayarlanmamış"}` }
                                )
                        ],
                        components: [
                            new ActionRowBuilder()
                                .setComponents(
                                    new ChannelSelectMenuBuilder()
                                        .setChannelTypes(ChannelType.GuildText)
                                        .setCustomId("commandchannels")
                                        .setMinValues(1)
                                        .setMaxValues(10)
                                )
                        ]
                    }).then(async imsg => {
                        const collectorimsg = imsg.createMessageComponentCollector({ filter, time: 30000 });
                        collectorimsg.on('collect', async (im) => {
                            await im.deferUpdate();
                            im.values.forEach(async xm => {
                                if (!onlyChannels.some(xmi => xmi == xm)) onlyChannels.push(xm)
                                else onlyChannels = editArray(onlyChannels,xm)
                            })
                            await CommandSettings.findOneAndUpdate({ commandName: commandName }, { $set: { onlyChannels: onlyChannels } }, { upsert: true })
                            commandData = await CommandSettings.findOne({ commandName: commandName });
                            onlyChannels = commandData ? commandData.onlyChannels : []
                            imsg.edit({
                                embeds: [
                                    new GenerateEmbed()
                                        .setDescription(`\`${commandName}\` isimli komutu kullanıma açık olacağı kanalları aşağıdan seçiniz.`)
                                        .setFooter({ text: "Eklenmiş kanalı seçerseniz, kanal kaldırılır." })
                                        .addFields(
                                            { name: `Geçerli Kanallar (${onlyChannels.length})`, value: `${onlyChannels.length > 0 ? onlyChannels.map(x => `<#${x}>`).join(", ") : "Ayarlanmamış"}` }
                                        )
                                ],
                                components: [ ]
                            })
                        })
                    })
                }
            })
        })
    }
}
module.exports = Commands
