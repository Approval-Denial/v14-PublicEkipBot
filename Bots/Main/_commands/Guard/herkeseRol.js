
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class herkeseRol extends Command {
    constructor(client) {
        super(client, {
            name: "herkeseRol",
            description: "Bot ile mesaj göndermek için",
            usage: ".herkeserol @Rol/ID",
            category: "Guard",
            aliases: ["roldağıt","roldagit","herkeserol","hr"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
  async  onLoad(client) {
    await  startDistributors()
  }

 async onRequest (client, message, args,embed) {
const dagitilicakRol = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0]);
if(!dagitilicakRol) return message.ReturnReply("No role")
let length = (message.guild.members.cache.filter(member => member && !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(x=> x).length + 5);
const sayı = Math.floor(length / Distributors.length);
if(sayı < 1) sayı = 1;
for (let index = 0; index < Distributors.length; index++) {
  const bot = Distributors[index];
  if (dagitilicakRol.deleted) {
    message.ReturnReply("Role deleted")
    client.logger.log(`[${dagitilicakRol.id}] - ${bot.user.tag}`);
    break;
  }
  const members = bot.guilds.cache.get(message.guild.id).members.cache.filter(member => !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(member => member.id).slice((index * sayı), ((index + 1) * sayı));
  if (members.length <= 0) return message.ReturnReply("No one is there")
  message.channel.send({embeds:[new GenerateEmbed().setDescription(`Toplamda **${message.guild.members.cache.filter(member => member && !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(x=> x).length}** kişiye \`${dagitilicakRol.name}\` rolü dağıtılıyor.`)]})
  for (const member of members) {
   await bot.guilds.cache.get(message.guild.id).members.cache.get(member.id).roles.add(dagitilicakRol.id)
  }
}
}
}
module.exports = herkeseRol;