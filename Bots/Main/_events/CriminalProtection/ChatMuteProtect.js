const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ChatMuteProtect extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRoleRemove",
            enabled: true,
        });
    }
    
 async onLoad(member, role) {
if(member.bot) return;
const Log = await member.guild.fetchAuditLogs({ type: 25 }).then(audit => audit.entries.first());
if (!Log || !Log.executor ||  Log.createdTimestamp < (Date.now() - 5000)) return; 
if(role.id == roles.chatMutedRole) {
const data = await penalty.find();
let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0
if(cezakontrol) await member.roles.add(roles.chatMutedRole)
}
 }
}
module.exports = ChatMuteProtect
