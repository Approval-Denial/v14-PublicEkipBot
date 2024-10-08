const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const {PermissionsBitField} = require("discord.js")
const userRoles = require("../../../../Global/Database/web")
const guard = require("../../../../Global/Database/Guard")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberOffline extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberOffline",
            enabled: true,
        });    
    }    

 async   onLoad(member, oldStatus) {
if(member.user.bot) return;
var guardData = await guard.findOne({guildID:member.guild.id})
var webandofflineOnly = guardData ? guardData.webAndofflineGuard :false

if(webandofflineOnly === true){
if(await guvenli(member,"full") == true) return;
const log = await member.guild.channels.cache.find(x=> x.name == "offline-control");
const roller = member.roles.cache.filter((e) => e.editable &&e.name !== "@everyone" &&[PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,PermissionsBitField.Flags.ManageChannels,PermissionsBitField.Flags.ManageGuild,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.ManageWebhooks,PermissionsBitField.Flags.ManageEmojisAndStickers,PermissionsBitField.Flags.ManageThreads].some((a) => e.permissions.has(a)));
if(roller.map(x=> x.id).length > 0){
await userRoles.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
await member.roles.remove(roller.map((e) => e.id), "Çevrımdışı olduğu için yetkileri çekildi!")  
if(log) await log.send({content:`\`${member.user.tag}\` kullanıcısı çevrimdışı olduğu için üzerinide bulunan **${roller.map(x=> x.id).length}** yetki rolü alındı. Tekrar aktif olunca geri verilicektir.
────────────────────────────────────────────────────────────────────────`})}
}

    }
}    

module.exports = guildMemberOffline;
