const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const {PermissionsBitField,Events:{PresenceUpdate}} = require("discord.js")
const userRoles = require("../../../../Global/Database/web")
const guard = require("../../../../Global/Database/Guard")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberJoinedWeb extends Event {
    constructor(client) {
        super(client, {
            name: PresenceUpdate,
            enabled: true,
        });    
    }    

 async   onLoad(eski, yeni) {
if(yeni?.member.user.bot || eski?.member.user.bot) return;
const guild = await client.guilds.cache.get(Guild.ID)
var guardData = await guard.findOne({guildID:guild.id})
const state = await Object.keys(yeni.member.presence.clientStatus)
const stateMap = state.map(x=> x);
var webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
if(webandofflineOnly === true){
if(stateMap.some(x=> x === "web")){
    const log = await guild.channels.cache.find(x=> x.name == "web-guard");
    if(await guvenli(yeni.member,"full") == true) return;
     const roller = yeni.member.roles.cache.filter((e) => e.editable &&e.name !== "@everyone" &&[PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,PermissionsBitField.Flags.ManageChannels,PermissionsBitField.Flags.ManageGuild,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.ManageWebhooks,PermissionsBitField.Flags.ManageEmojisAndStickers,PermissionsBitField.Flags.ManageThreads].some((a) => e.permissions.has(a)));
     if(roller.map(x=> x.id).length == 0) return;
     await userRoles.findOneAndUpdate({ guildID: guild.id, userID: yeni.member.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
     await yeni.member.roles.remove(roller.map((e) => e.id), "Web tarayıcısından girdiği tespit edildiği için yetkileri çekildi!")  
     if(log) await log.send({content:`\`${yeni.member.user.tag}\` kullanıcısı Web tarayıcısından girdiği için üzerinide bulunan **${roller.map(x=> x.id).length}** yetki rolü alındı.
────────────────────────────────────────────────────────────────────────`})
} else {
const veri = await userRoles.findOne({ guildID: guild.id, userID: yeni.member.id });
if (!veri) return;
if (veri.roles || veri.roles.length || veri.roles.length > 0) {
  await veri.roles.map(e => yeni.member.roles.add(e, "Web tarayıcısından çıkış yaptığı için yetkileri verildi!").then(async () => {
    await userRoles.findOneAndDelete({ guildID: guild.id, userID: yeni.member.id });
    if(log) await log.send({content:`\`${yeni.member.user.tag}\` kullanıcısı Web tarayıcısından çıkış yaptığı için **${veri.roles.length}** yetki rolü geri verildi.
────────────────────────────────────────────────────────────────────────`})  }).catch(() => {}));
}
}
}


    }
}    

module.exports = guildMemberJoinedWeb;
