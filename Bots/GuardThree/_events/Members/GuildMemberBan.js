const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField, Events: { GuildBanAdd } } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const guardPenaltyDB = require("../../../../Global/Database/guardPenalty")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class GuildMemberBanAdd extends Event {
    constructor(client) {
        super(client, {
            name: GuildBanAdd,
            enabled: true,
        });
    }

    async onLoad(ban) {
        if (ban.guild.id != Guild.ID) return;

        const guild = client.guilds.cache.get(Guild.ID)
        const Guard = await GuardData.findOne({ guildID: guild.id })
        const banKickGuardonly = Guard ? Guard.banKickGuard : false;
        if (banKickGuardonly == true) {
            let entry = await ban.guild.fetchAuditLogs({ type: 22 }).then(audit => audit.entries.first());
            if (entry.executor.id == guild.ownerId) return;
            const orusbuevladı = await guild.members.cache.get(entry.executor.id);
            const log = guild.channels.cache.find(x => x.name == "bankick-guard")
            const embed = new EmbedBuilder({
                title: "Server Ban Protection - Security II",
                footer: { text: `Server Security`, iconURL: client.user.avatarURL() }
            })
            if (!entry || !entry.executor || Date.now() - entry.createdTimestamp > 5000 || orusbuevladı.user.bot) return;
            if (await guvenli(orusbuevladı, "bankick") == true) {
                await guardPenaltyDB.findOneAndUpdate({ guildID: guild.id, OrusbuEvladı: orusbuevladı.id }, { $push: { işlemler: { Güvenilir: true, işlem: `Yasaklama! (${ban.user.tag})`, Tarih: Date.now() } } }, { upsert: true })
                if (log) return log.send({ embeds: [new GenerateEmbed().setAuthor({ name: `Trustworthy ✅`, iconURL: guild.iconURL() }).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${ban.user.tag}** kullanıcısını "Sağ-Tık" kullanarak sunucudan yasakladı.`)] })
            }
            await ytkapa(Guild.ID)
            await sik(guild, orusbuevladı.id, "am")
            await guild.members.unban(ban.user.id)
            if (log) return log.send({ embeds: [new GenerateEmbed().setAuthor({ name: `Trustworthy ✅`, iconURL: guild.iconURL() }).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${ban.user.tag}** kullanıcısını "Sağ-Tık" kullanarak sunucudan yasakladığı için kendisini yasakladım, sunucuda ki üst düzey yetkileri kapattım ve yasakladığı kişinin yasağını kaldırdım.`)] })
        }
    }
}
module.exports = GuildMemberBanAdd;