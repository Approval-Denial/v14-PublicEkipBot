const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const snipe = require("../../../../Global/Database/snipe")
const { Events: { MessageDelete } } = require("discord.js")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class snipeEvent extends Event {
    constructor(client) {
        super(client, {
            name: MessageDelete,
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
let args = message.content.substring(client.prefix.some(x => x.length)).split(" ");
let _find = args[0].toLocaleLowerCase()
let command = client.commands.get(_find) || client.aliases.get(_find);
if(command) return;
await snipe.findOneAndUpdate({guildID:message.guild.id},{$set:{userID:message.author.id,deletedMessage:message.content,deletedMessageDate:Date.now(),deletedMessageAttachement:null}},{upsert:true})
    }
}

module.exports = snipeEvent
