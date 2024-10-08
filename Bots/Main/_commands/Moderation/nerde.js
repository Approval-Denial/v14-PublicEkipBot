const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const moment = require("moment");
const voiceJoinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt");
require("moment-duration-format")
moment.locale("tr")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Nerde extends Command {
    constructor(client) {
        super(client, {
            name: "Nerde",
            description: "Bot ile mesaj göndermek için",
            usage: ".nerde",
            category: "Moderation",
            aliases: ["n","ses"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.botCommandsRole].some(x=> message.member.roles.cache.has(x))){
    if (!message.guild) return;

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!user) return message.reply("Ses bilgisine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene!")
    if (!user.voice.channel) return message.reply("<@" + user.id + "> bir ses kanalına bağlı değil.")
    let joinedAtData = await voiceJoinedAt.findOne({ userID: user.id });
    let mic = user.voice.selfMute == true ? "Kapalı ❌" : "Açık ✅"
    let limit = user.voice.channel.userLimit || "-";
    let hop = user.voice.selfDeaf == true ? "Kapalı ❌" : "Açık ✅"
    let video = user.voice.selfVideo ? `Açık ✅` : `Kapalı ❌`;
    let stream = user.voice.streaming ? `Açık ✅` : `Kapalı ❌`
    let embed = new GenerateEmbed()
.setColor("2F3136")
.setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
.setDescription(`${user} adlı kullanıcı, <#${user.voice.channel.id}> adlı ses kanalında bulunuyor.

- Mikrofon Durumu: \`${mic}\`
- Kulaklık Durumu: \`${hop}\`
- Kamera Durumu: \`${video}\`
- Yayın Durumu: \`${stream}\`
- Kanaldaki Kişi Sayısı: \`${user.voice.channel.members.size}/${limit}\`
- Kanalda Bulunma Süresi: \`${joinedAtData ? moment.duration(Date.now() - joinedAtData.date).format("H [saat], m [dakika], s [saniye]") : "Süre bulunamadı"}\`
`)
    await message.reply({embeds:[embed]});


}
}
}
module.exports = Nerde;
