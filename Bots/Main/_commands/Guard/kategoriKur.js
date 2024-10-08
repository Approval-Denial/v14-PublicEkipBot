
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,Permission } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const CategoryChannels = require("../../../../Global/Database/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../Global/Database/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../Global/Database/Backup/Guild.Voice.Channels");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class kategoriKur extends Command {
    constructor(client) {
        super(client, {
            name: "kategoriKur",
            description: "Silinen kategori kanallarını kurmak için.",
            usage: ".kategoriKur @Kanal/ID",
            category: "Guard",
            aliases: ["kategoriKur","kategorikur","kk"],
            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
  
 async onRequest (client, message, args,embed) {
  if (!args[0] || isNaN(args[0])) return message.ReturnReply("Category not found")
  CategoryChannels.findOne({ channelID: args[0] }, async (err, data) => {
    if (!data) return message.ReturnReply("Data not found")
    const newChannel = await message.guild.channels.create( {
      name:data.name,
      type: 4,
      position: data.position > 0 ? data.position : 0,
    });
   let comp = await message.channel.send({ embeds: [new GenerateEmbed().setDescription(`**${newChannel.name}** isimli kategori yedeği kuruluyor...`)]})
    const textChannels = await TextChannels.find({ parentID: args[0] });
    await TextChannels.updateMany({ parentID: args[0] }, { parentID: newChannel.id });
    textChannels.forEach(c => {
      const textChannel = message.guild.channels.cache.get(c.channelID);
      if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
    });
    const voiceChannels = await VoiceChannels.find({ parentID: args[0] });
    await VoiceChannels.updateMany({ parentID: args[0] }, { parentID: newChannel.id });
    voiceChannels.forEach(c => {
      const voiceChannel = message.guild.channels.cache.get(c.channelID);
      if (voiceChannel) voiceChannel.setParent(newChannel, { lockPermissions: false });
    });
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
    comp.edit({embeds:[new GenerateEmbed().setDescription(`*${newChannel.name}** Kategorisi kuruldu ve ayarları yapıldı!`)]})
  });
}
}
module.exports = kategoriKur;