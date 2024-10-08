const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Pornofile extends Command {
  constructor(client) {
    super(client, {
      name: "Profile",
      description: "Profil",
      usage: ".me",
      category: "Global",
      aliases: ["me", "profile", "Me", "Profile"],

      enabled: true,

    });
  }
  async onRequest(client, message, args) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let member = message.guild.members.cache.get(user.id)
    let cezapuandata = await cezapuan.findOne({ guildID: message.guild.id, userID: member.id });
    let nickname = member.displayName == user.username ? "" + user.username + " [Yok] " : member.displayName
    let platform = { web: '`İnternet Tarayıcısı` `🌍`', desktop: '`PC (App)` `💻`', mobile: '`Mobil` `📱`' }
    let bilgi;
    let uyesesdurum = ""
    if (user.presence && user.presence.status !== 'offline') { bilgi = `\`•\` Bağlandığı Cihaz: ${platform[Object.keys(user.presence.clientStatus)[0]]}` } else { bilgi = '`•` Bağlandığı Cihaz: Çevrimdışı `🔴`' }
    const roles = user.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
    const rolleri = [];
    if (roles.length > 6) {
      const lent = roles.length - 6;
      let itemler = roles.slice(0, 6);
      itemler.map(x => rolleri.push(x));
      rolleri.push(`${lent}...`);
    } else {
      roles.map(x => rolleri.push(x));
    };
    const row = new ActionRowBuilder()
      .setComponents(
        new StringSelectMenuBuilder()
          .setCustomId("bıcıbıcı")
          .setOptions(
            [
              { label: `Avatar`, description: undefined, value: "av" },
              { label: `Banner`, description: undefined, value: "av2" },
            ]
          )
      )
    if (member.voice.channel) {
      uyesesdurum = `🔊 **Kullanıcı Ses Bilgisi**\n\`•\` Bulunduğu Kanal: ${user.voice.channel}`
      uyesesdurum += `\n\`•\` Mikrofon Durumu: \`${user.voice.selfMute ? '❌' : '✅'}\``
      uyesesdurum += `\n\`•\` Kulaklık Durumu: \`${user.voice.selfDeaf ? '❌' : '✅'}\``
      if (user.voice.selfVideo) uyesesdurum += `\n\`•\` Kamera Durumu: \`✅\``
      if (user.voice.streaming) uyesesdurum += `\n\`•\` Yayın Durumu: \`✅\``
    }

    let embed = new GenerateEmbed()
      .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true }) })
      .setColor("2F3136")
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setDescription(`
👤 **Kullanıcı Bilgisi**
\`•\` Profil: ${user}
\`•\` ID: \`${user.id}\`
${bilgi}
\`•\` Oluşturulma Tarihi: <t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:R> <t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:D>\n
📁 **Sunucu Bilgisi**
\`•\` Sunucu İsmi: \`${nickname}\`
\`•\` Ceza Puanı: \`${cezapuandata ? cezapuandata.cezapuan : 0}\`
\`•\` Katılma Tarihi: <t:${Number(String(Date.parse(user.joinedAt)).substring(0, 10))}:R>
\`•\` Katılım Sırası: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= user.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
\`•\` Rolleri (\`${rolleri.length}\`): ${rolleri.join(", ")}\n

${uyesesdurum}

    `)
    let x = await message.reply({ embeds: [embed], components: [row] })
    var filter = (i) => i.user.id == message.member.id
    let collector = x.createMessageComponentCollector({ filter: filter, max: 1, time: 60000 })
    collector.on('collect', async (i) => {
      if (i.values[0] == "av") {
        let link = new ActionRowBuilder({ components: [new ButtonBuilder({ label: "Tarayıcıda aç", style: ButtonStyle.Link, url: member.user.displayAvatarURL({ dynamic: true }) })] })
        await i.reply({
          content: `${member.user.displayAvatarURL({ dynamic: true, format: "png" })}`,
          components: [link], ephemeral: true
        })
      }
      if (i.values[0] == "av2") {
        const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
        if (banner) {
          let link = new ActionRowBuilder({ components: [new ButtonBuilder({ label: "Tarayıcıda aç", style: ButtonStyle.Link, url: banner })] })
          await i.reply({
            content: `${banner}`,
            components: [link], ephemeral: true
          })
        }
      }

    })
  }
}
module.exports = Pornofile;