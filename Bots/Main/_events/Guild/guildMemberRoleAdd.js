const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle,Events } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const {Guild} = require("../../../../Global/Config/Guild")
const bannedTagSystem = require("../../../../Global/Database/SystemDB/guildBannedTag");
const roleLog = require("../../../../Global/Database/roleLog");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberRoleAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRoleAdd",
            enabled: true,
        });
    }
    
 async onLoad(member,role) {
    const Log = await member.guild.fetchAuditLogs({ type: 25 }).then(audit => audit.entries.first());
    if (!Log || !Log.executor || Log.executor.bot || Log.createdTimestamp < (Date.now() - 5000)) return;  
    await roleLog.updateOne({_id: member.id},  { $push: { "Roles": { rol: role.id, mod: Log.executor.id, tarih: Date.now(), state: "Ekleme" } } }, { upsert: true }).exec()
    let logChannel = member.guild.channels.cache.find(x=> x.name == "roleadd_log")
    if(logChannel) logChannel.send({embeds: [new GenerateEmbed().setDescription(`${member} isimli üyeye ${new Date(Date.now()).toTurkishFormatDate()} ${Log.executor} tarafından ${role} adlı rol verildi.`)]})  

  }
}

module.exports = guildMemberRoleAdd
