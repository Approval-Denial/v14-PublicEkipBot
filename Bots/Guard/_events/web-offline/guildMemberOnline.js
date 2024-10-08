const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const {PermissionsBitField} = require("discord.js")
const userRoles = require("../../../../Global/Database/web")
const guard = require("../../../../Global/Database/Guard")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberOnline extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberOnline",
            enabled: true,
        });    
    }    

 async   onLoad(member, oldStatus) {
if(member.user.bot) return;
var guardData = await guard.findOne({guildID:member.guild.id})
var webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
const state = await Object.keys(member.presence.clientStatus)
const stateMap = state.map(x=> x);
if(webandofflineOnly === true ){
if(await guvenli(member,"full") == true && !stateMap.some(x=> x == "web")) return;
const log = await member.guild.channels.cache.find(x=> x.name == "offline-control");
const veri = await userRoles.findOne({ guildID: member.guild.id, userID: member.id });
if (!veri) return;
if (veri.roles && veri.roles.length && veri.roles.length > 0) {
  await veri.roles.map(e => member.roles.add(e, "Web'ten çıkış yapıldı/tekrar aktif oldu. (Yetkili Rolleri Geri Verild.)").then(async () => {
    await userRoles.findOneAndDelete({ guildID: member.guild.id, userID: member.id });
    if(log) await log.send({content:`\`${member.user.tag}\` kullanıcısı Aktif olduğu için **${veri.roles.length}** yetki rolü geri verildi.
────────────────────────────────────────────────────────────────────────`})  }).catch(() => {}));
}

}

    }
}    

module.exports = guildMemberOnline;
