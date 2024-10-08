const { Collection, EmbedBuilder, PermissionsBitField,codeBlock } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const snipe = require("../../../../Global/Database/snipe")
const { Events: { MessageDelete } } = require("discord.js")


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class messageDelete extends Event {
    constructor(client) {
        super(client, {
            name: MessageDelete,
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
const log = await message.guild.channels.cache.find(x=> x.name == "message_log")
if(log) await log.send({embeds:[new GenerateEmbed().setAuthor({name:message.member.user.tag,iconURL:message.member.user.avatarURL({dynamic:true})}).setDescription(`${message.member} tarafından <t:${(Date.now()/1000).toFixed()}:R> ${message.channel} kanalından bir mesaj silindi!`).addFields({name:"Mesaj İçeriği:",value:`${codeBlock("fix",message)}`})]})
    }
}

module.exports = messageDelete
