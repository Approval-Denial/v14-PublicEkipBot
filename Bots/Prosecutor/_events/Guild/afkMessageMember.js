const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const afkdb = require("../../../../Global/Database/SystemDB/afk")
const { Events: { MessageCreate } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class afkMessageMember extends Event {
    constructor(client) {
        super(client, {
            name: MessageCreate,
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
const member = message.mentions.members.first()
if(!member) return;
const afksystem = await afkdb.findOne({guildID:message.guild.id,userID:member.id});
const only = afksystem ? afksystem.only : false
if(only == true){
message.reply({embeds:[new GenerateEmbed().setDescription(`${member}, <t:${(afksystem.date/1000).toFixed()}:R> "__${afksystem.reason}__" sebebiyle **AFK** moduna girmişti!`)]}).then(async msg => {setTimeout(async() => {if(msg) await msg.delete();},10000);})
}
    }
}

module.exports = afkMessageMember
