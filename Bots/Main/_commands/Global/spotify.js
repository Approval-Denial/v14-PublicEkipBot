
const { EmbedBuilder, ActivityType } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const afksystem = require("../../../../Global/Database/SystemDB/afk")
const { Spotify } = require('canvafy');
const { getRandomElementFromArray } = require("../../../../Global/Functions/getRandomElementFromArray");
const appropriateWords = [
  "Harika şarkı seçimi!",
  "Keyifli dinlemeler!",
  "Ruhunuza iyi gelecek bir şarkı gibi görünüyor.",
  "O şarkı bana da gelse!",
  "Bu şarkıyı çok seviyorum.",
  "Müzikle aranız mı iyi yoksa bu şarkılar mı sana iyi geliyor?",
  "İyi bir seçim yapmışsın!",
  "Bu şarkıyı rüyalarımda duydum gibi hissettim.",
  "Müziğin ritmi başkasına da geçer umarım.",
  "Bu şarkı tam da bu an için mükemmel.",
  "Bu parçayı çalmaya devam et!",
  "Şarkı seçimlerin her zaman beni şaşırtıyor.",
  "Ruhunun derinliklerinden gelen bir seçim gibi.",
  "Bu müziğin tadını çıkar ve rahatla!",
]
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class Spo extends Command {
  constructor(client) {
    super(client, {
      name: "spotify",
      description: "Otomatik Yetki atlama sistemini kurar",
      usage: ".afk",
      category: "Global",
      aliases: ["spotify", "spo"],

      enabled: true,

    });
  }
  async onRequest(client, message, args, embed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) return message.ReturnReply("member not specified")
    if (member && member.presence && member.presence.activities && member.presence.activities.some(luppux => luppux.name == "Spotify" && luppux.type == ActivityType.Listening)) {
      message.replyReaction(message.guild.findReaction(Time))
      let durum = await member.presence.activities.find(luppux => luppux.type == ActivityType.Listening);
      const spotify = await new Spotify()
        .setAuthor(durum.state)
        .setAlbum(durum.assets.largeText)
        .setTimestamp(new Date(Date.now()).getTime() - new Date(durum.timestamps.start).getTime(), new Date(durum.timestamps.end).getTime() - new Date(durum.timestamps.start).getTime())
        .setImage(`https://i.scdn.co/image/${durum.assets.largeImage.slice(8)}`)
        .setTitle(durum.details)
        .setBlur(5)
        .setOverlayOpacity(0.7)
        .build();
      message.reply({
        files: [{ name: `spotify-${member.id}.png`, attachment: spotify }],
        embeds: [new GenerateEmbed().setFooter({ text: getRandomElementFromArray(appropriateWords) }).setImage(`attachment://spotify-${member.id}.png`)]
      }).then(async x => {
        message.removeToEmoji(message.guild.findReaction(Time))
      })
    }
    else { return message.ReturnReply("Not listening to songs") }

  }
}
module.exports = Spo;

