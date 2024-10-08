const { Client, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, Discord } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Aptal Avatar Arayanlara avatar istediği kullanıcının avatarını verir :)",
            usage: ".avatar",
            category: "Global",
            aliases: ["avatar","av","lulux"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args) {
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: member.user.displayAvatarURL({dynamic:true})})]})
  await message.reply({
    content: `${member.user.displayAvatarURL({dynamic:true, format:"png"})}`,
    components:[link]
  })
  if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

            
        }
    }

    module.exports = Avatar;