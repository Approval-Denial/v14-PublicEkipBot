
const { EmbedBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const children = require("child_process");

const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class Reboot extends Command {
    constructor(client) {
        super(client, {
            name: "reboot",
            description: "Bot yenileme işlemini yapar.",
            usage: ".reboot",
            category: "Approval",
            aliases: ["yenile", "reload", "r"],
            enabled: true,
            developer: true
        });
    }
    async onRequest(client, message, args) {
        if (!args[0]) {
            message.replyReaction(message.guild.findReaction(Tik, "ID"))
            console.log("[BOT] Bot yeniden başlatıldı.");
            process.exit(0);
        }
        if (args[0] == "all") {
            const ls = children.exec(`pm2 restart all`);
            return ls.stdout.on('data', async function (data) {
                await message.replyReaction(message.guild.findReaction(Tik, "ID"))
            });
        }
    }
}
module.exports = Reboot
