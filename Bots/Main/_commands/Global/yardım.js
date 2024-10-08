
const { codeBlock, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require('../../../../Global/Structures/Default.Embeds');
const { firstLetterReduce } = require("../../../../Global/Functions/firstLetterReduce")
const { firstLetterEnlargement } = require("../../../../Global/Functions/firstLetterEnlargement")
var CommandCategory = [];
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class Help extends Command {
    constructor(client) {
        super(client, {
            name: "yardım",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".yardım",
            category: "Global",
            aliases: ["help", "yardım"],
            enabled: true,

            cooldown: 3500,

        });
    }
    async onLoad(client) {
        client.commands.forEach(async x => {
            if (!CommandCategory.some(y => y.label === x.category)) await CommandCategory.push({ label: x.category, description: undefined, value: `${firstLetterReduce(x.category)}` })
        })
    }

    async onRequest(client, message, args, embed) {
        let member = message.member
        message.reply({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`**${client.users.cache.get(client.owners[0]).tag}** tarafından \`${message.guild.name}\` sunucusuna yapılmış botun komutların kategorileri aşağıda ki menüde verilmiştir.`)
            ],
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("commandCategory")
                            .setPlaceholder(` ${CommandCategory.length} Kategori, ${client.commandLength} Komut.`)
                            .setOptions(
                                CommandCategory
                            )
                    )
            ]
        }).then(async msg => {
            const filter = async (i) => {
                await i.deferUpdate()
                return i.user.id === message.member.id;
            }
            const collectorMain = msg.createMessageComponentCollector({ filter: filter, errors: ["time"], time: 30000 * 10 })
            collectorMain.on('collect', async (interaction) => {
                for (let index = 0; index < CommandCategory.length; index++) {
                    const Category = CommandCategory[index];
                    if (interaction.values[0] === firstLetterReduce(Category.value)) {
                        const commandList = client.commands.filter(x => x.category === firstLetterEnlargement(interaction.values[0])).map(x => `- **Komut:** ${firstLetterEnlargement(x.name)}\n  - **Açıklama:** ${x.description}\n  - **Alternetif:** ${x.aliases.join(", ")}`)
                        msg.edit({
                            embeds: [new GenerateEmbed()
                                .setDescription(`**${client.users.cache.get(client.owners[0])}** tarafından \`${message.guild.name}\` sunucusuna yapılmış botun komutların kategorileri aşağıda ki menüde verilmiştir.`)
                                .setFields({ name: `${firstLetterEnlargement(Category.value)}`, value: `${commandList.join("\n")}`, inline: true })]
                        })
                    }
                }
            })
            collectorMain.on('end', (collected, reason) => {
                if (reason === 'time') {
                    msg.edit({ embeds: [new GenerateEmbed().setDescription(`İşlem zaman aşımına uğradı. Lütfen daha sonra tekrar deneyiniz.`)], components: [] })
                }
            });

        })

    }
}

module.exports = Help

