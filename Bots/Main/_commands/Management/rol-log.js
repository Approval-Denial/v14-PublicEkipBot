const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const rolelog = require("../../../../Global/Database/roleLog");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class rollog extends Command {
    constructor(client) {
        super(client, {
            name: "rol-log",
            description: "Rol geçmişi",
            usage: ".rollog",
            category: "Management",
            aliases: ["rollog","rol-log"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if(!uye)return message.ReturnReply("member not specified")
    const button1 = new ButtonBuilder()
                .setCustomId('geri')
                .setLabel('◀')
                .setStyle(ButtonStyle.Secondary);
    const buttonkapat = new ButtonBuilder()
                .setCustomId('kapat')
                .setLabel('❌')
                .setStyle(ButtonStyle.Secondary);
    const button2 = new ButtonBuilder()
                .setCustomId('ileri')
                .setLabel('▶')
                .setStyle(ButtonStyle.Secondary);
    rolelog.findOne({_id: uye.id }, async (err, res) => {
      if (!res) return message.channel.send({embeds: [new GenerateEmbed().setDescription(`${uye} isimli üyenin rol bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete()}, 7500))
      if(!res.Roles) return message.channel.send({embeds: [new GenerateEmbed().setDescription(`${uye} isimli üyenin rol bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete()}, 7500))
      let pages = res.Roles.sort((a, b) => b.tarih - a.tarih).chunk(10);
      var currentPage = 1
      if (!pages && !pages.length || !pages[currentPage - 1]) return message.reply({embeds: [new GenerateEmbed().setDescription(`${uye} isimli üyenin rol bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete()}, 7500))
    embed = new GenerateEmbed().setFooter({text:`${message.guild.name} • ${currentPage} / ${pages.length}`,iconURL: message.guild.iconURL({dynamic: true})})
      if(pages.length == 1){
        await button1.setDisabled(true)
        await button2.setDisabled(true)
      }
      const row = new ActionRowBuilder().addComponents([button1, buttonkapat, button2]);
      if (message.deferred == false){
        await message.deferReply()
      };
      const curPage = await message.channel.send({
        embeds: [new GenerateEmbed().setDescription(`${uye}, üyesinin rol bilgisi yükleniyor... Lütfen bekleyin...`)],
        components: [row], fetchReply: true,
      }).catch(err => {});
    
      await curPage.edit({embeds: [new GenerateEmbed().setDescription(`${pages[currentPage - 1].map((x, index) => `${Array.isArray(x.rol) ? x.rol.map(x => message.guild.roles.cache.get(x)).join(", ") : message.guild.roles.cache.get(x.rol)} (<t:${(x.tarih/1000).toFixed()}>) ${x.state == "Ekleme" ? "[**EKLEME**]" : "[**KALDIRMA**]"} (<@${x.mod ? x.mod : "Bilinmeyen Yetkili"}>)`).join("\n")}`)]}).catch(err => {})

      const filter = (i) => i.user.id == message.member.id

      const collector = await curPage.createMessageComponentCollector({
        filter,
        time: 30000,
      });

      collector.on("collect", async (i) => {
        switch (i.customId) {
          case "ileri":
            if (currentPage == pages.length) break;
            currentPage++;
            break;
          case "geri":
            if (currentPage == 1) break;
            currentPage--;
            break;
          default:
            break;
          case "kapat": 
            i.deferUpdate().catch(err => {});
            curPage.delete().catch(err => {})
            message.delete().catch(err => {})
        }
        await i.deferUpdate();
        await curPage.edit({
          embeds: [new GenerateEmbed().setFooter(`${message.guild.name} • ${currentPage} / ${pages.length} `, message.guild.iconURL({dynamic: true})).setDescription(`${pages[currentPage - 1].map((x, index) => `\`${x.state == "Ekleme" ? "✅" : "❌"}\` ${Array.isArray(x.rol) ? x.rol.map(x => message.guild.roles.cache.get(x)).join(", ") : message.guild.roles.cache.get(x.rol)} (<t:${(x.tarih/1000).toFixed()}>) (<@${x.mod ? x.mod : "Bilinmeyen Yetkili"}>)`).join("\n")}`)]
        }).catch(err => {});
        collector.resetTimer();
      });
      collector.on("end", () => {
        if(curPage) curPage.edit({
          embeds: [new GenerateEmbed().setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true})).setDescription(`${uye} isimli üyenin toplamda \`${res.Roles.length || 0}\` adet rol bilgisi mevcut.`)],
          components: [],
        }).catch(err => {});
      })
    })
}
}
module.exports = rollog;

