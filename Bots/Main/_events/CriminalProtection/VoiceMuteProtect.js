const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, AuditLogEvent } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const penalty =require("../../../../Global/Database/penaltyDB/penaltys");
const Guild = require('../../../../Global/Config/Guild');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class VoiceMuteProtect extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelUnmute",
            enabled: true,
        });
    }
    
 async onLoad(member, oldMuteType) {
    const Log = await member.guild.fetchAuditLogs({ type: 24 }).then(audit => audit.entries.first());
    if (!Log || !Log.executor || Log.executor.bot || Log.createdTimestamp < (Date.now() - 5000)) return; 
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "VOICE-MUTE" && x.Punished === member.id && x.Finished === false)).length > 0 ? true : false
    if(cezakontrol === true){
        if((roles && roles.voiceMutedRole) && !member.roles.cache.has(roles.voiceMutedRole)) member.roles.add(roles.voiceMutedRole)               
        if(member && member.voice.mute == false) await member.voice.setMute(true);
    }

    
 }
}
module.exports = VoiceMuteProtect
