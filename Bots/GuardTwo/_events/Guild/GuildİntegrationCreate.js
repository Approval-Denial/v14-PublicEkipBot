const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField,Events:{create} } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const guardPenaltyDB = require("../../../../Global/Database/guardPenalty")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class     integrationCreates extends Event {
    constructor(client) {
        super(client, {
            name: "guildIntegrationsCreate",
            enabled: true,
        });    
    }    

 async   onLoad(guildx) {
    if(guildx.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const serverGuardonly = Guard ? Guard.serverGuard : false;
    if(serverGuardonly == true){
    let entry = await guild.fetchAuditLogs({type: 80}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;

    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    const log = guild.channels.cache.find(x => x.name == "server-guard")
    const embed = new EmbedBuilder({
        title:"Server İntegration Protection - Security II",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor ||Date.now() - entry.createdTimestamp > 5000 || orusbuevladı.user.bot)return;
    if (await guvenli(orusbuevladı,"server") == true){
        await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Entagrasyon Oluşturdu.`,Tarih:Date.now()}}},{upsert:true})
        if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde entegrasyon oluşturdu.`)]})
    }
    await sik(guild,orusbuevladı.id,"am")

    await ytçek(orusbuevladı)
    await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:`Entagrasyon Oluşturdu.`,Tarih:Date.now()}}},{upsert:true})
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde entegrasyon oluşturduğu için rolleri alındı.`)]})
    }
 }
}
module.exports = integrationCreates;