const { Client, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, Discord } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Çek extends Command {
    constructor(client) {
        super(client, {
            name: "Çek",
            description: "Aptal Banner Arayanlara banner istedigi kullanicinin bannerin verir :)",
            usage: ".çek @Approval/ID",
            category: "Global",
            aliases: ["çağır","cagir","cek","çek"],
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.ReturnReply("member not specified")
  if (!message.member.voice.channel) return message.ReturnReply("You're not in the audio channel");
  if (!member || !member.voice.channel) return message.ReturnReply("Not in audio channel");
  if ( member.id === message.author.id) return message.ReturnReply("its a own");
  if (member.voice.channel.id == message.member.voice.channel.id) return message.ReturnReply("You are on the same channel");
    
    const row = new ActionRowBuilder()
    .addComponents(
     new ButtonBuilder().setCustomId("evet").setLabel("Kabul et").setStyle(ButtonStyle.Success),
     new ButtonBuilder().setCustomId("hayir").setLabel("Reddet").setStyle(ButtonStyle.Danger),
    )

  message.channel.send({
  content:`**[${member}]**`,
  embeds:[new GenerateEmbed().setDescription(`**${message.author} \`${member.voice.channel.name}\` Adlı Kanala Sizi Çekmek İstiyor, Kabul Ediyor Musun?**`)],
  components:[row]
  }).then(async msg =>{
  var filter = (button) => button.user.id === member.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
  collector.on('collect', async (button, user) => {
  if(message) await message.replyReaction(message.guild.findReaction(Tik,"ID"))
  if(button.customId == "evet"){
 if(!message.member.voice || !message.member.voice.channel) return  message.reply({embeds:[new GenerateEmbed().setDescription(`${message.member} seste bulunmadığın için işlem yapılamaz!`)]}) 
  await member.voice.setChannel(message.member.voice.channel);
  await button.reply({embeds:[new GenerateEmbed().setDescription(`${message.member} bulunduğunuz ses kanalına (${message.member.voice.channel}) taşındı!`)],ephemeral:true})
  if(msg && msg.deletable) await msg.delete();
  } 
  if (button.customId == "hayir"){
if(message) await message.replyReaction(message.guild.findReaction(Cross,"ID"))
  await message.channel.send({content:`**[${message.member}]**`,embeds:[new GenerateEmbed().setDescription(`${member}, bulunduğun ses kanalına (${message.member.voice.channel}) çağırma isteğinizi reddetti!`)]})
  if(msg && msg.deletable) await msg.delete();
 
              } 
          })
      })
  
}
}
  module.exports = Çek;