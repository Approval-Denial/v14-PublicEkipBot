
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const CoinDB = require("../../../../Global/Database/SystemDB/coin.js")
const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");

const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class dailyCoin extends Command {
    constructor(client) {
        super(client, {
            name: "gunluk",
            description: "hm",
            usage: ".daily",
            category: "Economy",
            aliases: ["günlük", "gunluk", "daily"],
            enabled: true,
        });
    }
    async onRequest(client, message, args, embed) {
        const coinsystemData = await coinSystem.findOne({ guildID: message.guild.id });
        const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
        if (coinSystemOnly == true) {
            const member = message.member
            const data = await CoinDB.findOne({ guildID: message.guild.id, userID: member.id })
            if (!data) return message.reply({ embeds: [new GenerateEmbed().setDescription(`${message.member}, **Coin** Profiliniz bulunmamaktadır. \`.coin\` yazarak profilinizi oluşturabilirsiniz.`)] })
            if (Date.now() >= (data.dailyCoinDate + 86400000)) {
                const sayi = await Math.floor(Math.random() * 3);
                message.channel.send({
                    files: [new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1075535580517113986/1078028663355879444/dhd.png")],
                    components: [
                        new ActionRowBuilder()
                            .setComponents(
                                new ButtonBuilder().setCustomId("1").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId("2").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId("3").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
                            )
                    ]
                }).then(async msg => {
                    const collector = msg.createMessageComponentCollector({ time: 10000 });
                    collector.on('collect', async (i) => {
                        if (i.customId == sayi) {
                            if (message) message.replyReaction(message.guild.findReaction(Tik, "ID"));
                            const coin = await Math.floor(Math.random() * 500);
                            i.reply({ content: `**Tebrikler, __${coin}__ Adet Coin ${message.guild.findReaction(Coin)} Kazandın!**`, ephemeral: true })
                            await CoinDB.findOneAndUpdate({ guildID: message.guild.id, userID: i.user.id }, { $inc: { coin: coin } }, { upsert: true })
                            await CoinDB.findOneAndUpdate({ guildID: message.guild.id, userID: i.user.id }, { $set: { dailyCoinDate: Date.now() } }, { upsert: true })
                            if (msg) await msg.delete()
                        }
                        else {
                            if (message) message.replyReaction(message.guild.findReaction(Cross, "ID"));
                            i.reply({ content: `**Kutun Boş Çıktı.**`, ephemeral: true })
                            if (msg) await msg.delete()
                        }
                    })
                })
            } else {
                if (message) message.replyReaction(message.guild.findReaction(Cross, "ID"));
                message.reply({ content: `**Günlük Coin Alamazsın! \n <t:${((data.dailyCoinDate + 86400000) / 1000).toFixed()}:R> günlük coin alabilirsin.**` })

            }

        } else return message.ReturnReply("This system is closed");
    }
}
module.exports = dailyCoin;