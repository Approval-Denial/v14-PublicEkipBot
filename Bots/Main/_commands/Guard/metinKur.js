
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,Permissions } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const TextChannels = require("../../../../Global/Database/Backup/Guild.Text.Channels");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class metinKur extends Command {
    constructor(client) {
        super(client, {
            name: "metinKur",
            description: "Silinen metin kanallarını kurmak için.",
            usage: ".metinkur @Kanal/ID",
            category: "Guard",
            aliases: ["metinkur","mk"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
 async onRequest (client, message, args,embed) {
  if (!args[0] || isNaN(args[0])) return message.ReturnReply("No channel id")
  TextChannels.findOne({ channelID: args[0] }, async (err, data) => {
    if (!data)  return message.ReturnReply("Data not found")
    const newChannel = await message.guild.channels.create({
      name:data.name,
      type: data.type,
      nsfw: data.nsfw,
      position: data.position + 1,
      rateLimit: data.rateLimit,
    })
   await newChannel.setParent(data.parentID).catch(x=> undefined)
  let comp = await message.channel.send({ embeds: [new GenerateEmbed().setDescription(`**${newChannel.name}** isimli kanal yedeği kuruluyor...`)] })
    const newOverwrite = [];
    for (let index = 0; index < data.overwrites.length; index++) {
      const veri = data.overwrites[index];
      newOverwrite.push({
        id: veri.id,
        allow: new PermissionsBitField(veri.allow).toArray(),
        deny: new PermissionsBitField(veri.deny).toArray()
      });
    }
    await newChannel.permissionOverwrites.set(newOverwrite);
    data.channelID = newChannel.id
    data.save()
    await dataCheck(args[0],newChannel.id,"channel")
    comp.edit({embeds:[new GenerateEmbed().setDescription(`**${newChannel.name}** Kanal kuruldu ve ayarları yapıldı!`)]})

  });
}
}
module.exports = metinKur;