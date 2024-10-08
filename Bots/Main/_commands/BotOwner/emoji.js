
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Emoji extends Command {
    constructor(client) {
        super(client, {
            name: "emoji",
            description: "manuel kod denemeleri için",
            usage: ".emojiekle",
            category: "Approval",
            aliases: ["emekle","emoji","emojiekle"],

            enabled: true,

            
        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, msg, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){

     const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    const isim = `luppux_${Math.round((Math.random()*9999))}`
    const message = msg.content.match(hasEmoteRegex)
    var emoji;
      if (emoji = emoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1", isim, msg)
      else 
      if (emoji = animatedEmoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1", isim, msg)
      else {
        let [link, ad] = args.slice(0).join(" ").split(" ");
        if (!link) return msg.channel.send(`Lütfen bir bağlantı belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        if (!ad) return msg.channel.send(`Lütfen bir emoji ismi belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        EmojiYükle(link, ad, msg)
      
 }
} else return message.ReturnReply("Cannot use command")
    }
}
function EmojiYükle(link, ad, message) {
  message.guild.emojis.create({attachment:link,name: ad})
  .then(emoji => message.channel.send({embeds: [new GenerateEmbed().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}).then(x => {
    message.react("✔")  
    setTimeout(() => {
          x.delete()

      }, 7500);
  }))
}
module.exports = Emoji;
