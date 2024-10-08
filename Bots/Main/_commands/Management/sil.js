
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class Sil extends Command {
  constructor(client) {
    super(client, {
      name: "Sil",
      description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
      usage: ".sil",
      category: "Management",
      aliases: ["temizle", "sil"],
      enabled: true,
    });
  }
  async onRequest(client, message, args) {
    if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
      ||
      [...roles.kurucuPerms, ...roles.üstYönetimPerms, roles.banStaffRole].some(x => message.member.roles.cache.has(x))) {
      let miktar = args[0];
      if (!miktar || !Number(miktar) || (miktar < 0 || miktar > 100)) return message.reply({ content: "Lütfen **1-100** arasında bir değer girerek tekrar deneyiniz" })
      const log = await message.guild.channels.cache.find(x => x.name == "audit-log");
      await message.channel.bulkDelete(miktar).then(async x => {
        message.channel.send({ content: `${message.channel} kanalından toplam ${miktar} adet mesaj silindi.` }).destroyMessage();
        if (log) await log.send({ embeds: [new GenerateEmbed().setDescription(`\`${message.member.user.tag}\` tarafından ${message.channel} kanalından <t:${(Date.now() / 1000).toFixed()}:R> **${miktar}** adet mesaj silindi!`)] })
      }).catch(err => { if (message) message.replyReaction(message.guild.findReaction(Cross, "ID")) })
    } else return message.ReturnReply("Cannot use command")
  }
}
module.exports = Sil;