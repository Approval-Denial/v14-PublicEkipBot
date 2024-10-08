const { Client } = require('discord.js');
const { DiscordBanners } = require('discord-banners');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const discordBanners = new DiscordBanners(client);
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Cihaz extends Command {
    constructor(client) {
        super(client, {
            name: "Cihaz",
            description: "Discord'a bağlandığınız cihaz(lar)ı gösterir",
            usage: ".cihaz",
            category: "Global",
            aliases: ["cihazim","cihaz","cihazım"],
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) return message.ReturnReply("member not specified")
    if (member.presence == null) return message.reply({ embeds: [ new GenerateEmbed().setDescription(`Kullanıcı **Çevrimdışı** olduğu için cihazına bakamıyorum.`)] })
    let dev = Object.keys(member.presence.clientStatus)
    let tür = {desktop: "(💻) Bilgisayar / Uygulama",mobile: "(📱) Mobil / Uygulama",web: "(🌐) Web Tarayıcı / İnternet"}
    let tür2 = {online: "(🟢) Çevrimiçi",dnd: "(🔴) Rahatsız Etme",idle: "(🟡) Boşta",offline:"(⚪) Çevrimdışı"}
    message.reply({ embeds: [ new GenerateEmbed().setDescription(`${member} Kullanıcısının Aktif Cihazları!\nDurum; \`${tür2[member.presence.status]}\`\nCihazlar; ${dev.map(x => `\`${tür[x]}\``).join("\n")}`)] });
};
}

module.exports = Cihaz;
