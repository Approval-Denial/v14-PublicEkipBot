
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class kayıtSıralama extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtsıralama",
            description: "Kayıt sıralamasını gösterir",
            usage: ".kayıtsıralama",
            category: "Register",
            aliases: ["regleaderboard", "topteyit", "kayıtsıralama"],

            enabled: true,
        });
    }


    onLoad(client) {

    }

    async onRequest(client, message, args, embed) {
        if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
            ||
            [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms].some(x => message.member.roles.cache.has(x))) {
            const data = await User.find() || [];
            let teyitList = data.filter((x) => message.guild.members.cache.has(x.userID) && x.TeyitNo > 0).sort((a,b)=> b.b.Teyitler.filter(v => v.Gender === "Erkek").length + b.Teyitler.filter(v => v.Gender === "Kadın").length - a.Teyitler.filter(v => v.Gender === "Erkek").length + a.Teyitler.filter(v => v.Gender === "Kadın").length).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value.userID)} \`${value.Teyitler.filter(v => v.Gender === "Erkek").length + value.Teyitler.filter(v => v.Gender === "Kadın").length} Kayıt\``).slice(0, 20)
            await message.channel.send({ embeds: [new GenerateEmbed().addFields({ name: "Kayıtlar", value: `${teyitList.join("\n") || "Kayıt verisi bulunamadı!"}`, inline: true })] });
        } else return message.ReturnReply("Cannot use command")

    }
}
module.exports = kayıtSıralama;