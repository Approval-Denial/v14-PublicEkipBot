
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const GUILD_ROLES = require("../../../../Global/Database/Backup/Guild.Roles");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class rolKur extends Command {
    constructor(client) {
        super(client, {
            name: "rolKur",
            description: "Silinen rolleri kurmak için.",
            usage: ".rolKur @Rol/ID",
            category: "Guard",
            aliases: ["rolkur","rk","rolKur"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
 async onRequest (client, message, args,embed) {
const dagitilicakRol = args[0]
if(!dagitilicakRol) return message.ReturnReply("No role id")
GUILD_ROLES.findOne({ roleID: dagitilicakRol }, async (err, data) => {
  if(!data || data == null) return message.ReturnReply("Data not found")
  const newRole = await message.guild.roles.create({
    name: data.name,
    color: data.color,
    hoist: data.hoist,
    permissions: data.permissions,
    position: data.position,
    mentionable: data.mentionable,
    reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
  });
  let length = (data.members.length + 5);
  var verildi = 0;
  const sayı = Math.floor(length / Distributors.length);
  if (sayı < 1) sayı = 1;
  const channelPerm = data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
  for await (const perm of channelPerm) {
    const bott = Distributors[1]
    const guild2 = bott.guilds.cache.get(Guild.ID)
    let kanal = guild2.channels.cache.get(perm.id);
    let newPerm = {};
    perm.allow.forEach(p => {
      newPerm[p] = true;
    });
    perm.deny.forEach(p => {
      newPerm[p] = false;
    });
    kanal.permissionOverwrites.create(newRole, newPerm).catch(error => console.log(error));
  }
 var members = data.members.filter(e => message.guild.members.cache.get(e) && !message.guild.members.cache.get(e).roles.cache.has(newRole))
  message.channel.send({content:`**${members.length}** kişiye "${newRole.name}" adlı rol dağıtılıyor.`})
  for (let index = 0; index < Distributors.length; index++) {
    members = data.members.filter(e => guild.members.cache.get(e) && !guild.members.cache.get(e).roles.cache.has(newRole)).slice((index * sayı), ((index + 1) * sayı));
    const bot = Distributors[index];
    const guild = bot.guilds.cache.get(message.guild.id)
    if (newRole.deleted) {
     message.reply({content:`[${dagitilicakRol}] - ${bot.user.tag} - Rol Silindi Dağıtım İptal`});
      break;
    }
    if (members.length <= 0) {
     message.reply({content:`[${dagitilicakRol}] Olayında kayıtlı üye olmadığından veya rol üyelerine dağıtıldığından dolayı rol dağıtımı gerçekleştirmedim.`});
      break;
    }
    if(verildi == members.length) return message.reply({content:`Herkese \`${newRole.name}\` rolü dağıtıldı`})
    for await (const user of members) {
      const member = guild.members.cache.get(user)
      member.roles.add(newRole.id).then(x=> verildi+1)
    }
  }
  const newData = new GUILD_ROLES({
    roleID: newRole.id,
    name: newRole.name,
    color: newRole.hexColor,
    hoist: newRole.hoist,
    position: newRole.position,
    permissions: newRole.permissions.bitfield,
    mentionable: newRole.mentionable,
    time: Date.now(),
    members: data.members.filter(e => newRole.guild.members.cache.get(e)),
    channelOverwrites: data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
  });
  newData.save();
  await dataCheck(dagitilicakRol,newRole.id,"role")

}).catch(err => { })
}
}
module.exports = rolKur;