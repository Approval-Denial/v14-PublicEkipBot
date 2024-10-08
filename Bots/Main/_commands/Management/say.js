
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Say extends Command {
    constructor(client) {
        super(client, {
            name: "Say",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".say",
            category: "Approval",
            aliases: ["s","say"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
        
    const data = await tagsistem.findOne({guildID:message.guild.id});
    const a = data.only 
let üyeSayısı =await message.guild.memberCount;
let sestekiÜyeSayısı =await message.guild.members.cache.filter(x=> x.voice.channel).size;
let taglı = a == true ? `${data.Type == "Public" ? message.guild.members.cache.filter(x=> x.user.displayName.includes(data.Tag)).size : `${data.Type == "Ekip" ? `${message.guild.members.cache.filter(member => data.nameTags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == data.NumberTag).size}` : false}`}` : false
message.reply({embeds:[
    new GenerateEmbed()
    .setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
    .setColor("Random")
    .setDescription(`
\`❯\` Sunucuda toplam **${sestekiÜyeSayısı}** kullanıcı ses kanallarında bulunuyor.
\`❯\` Sunucumuz da **${message.guild.memberCount}** üye bulunmakta. (**${message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size}** Aktif)
\`❯\` Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! (**${message.guild.premiumTier}** Seviye).
${taglı == false ? "" : `\`❯\` Sunucuda toplam **${taglı}** taglı kullanıcı bulunuyor.`}`)
]})
    } else return message.ReturnReply("Cannot use command")
}
}
module.exports = Say;