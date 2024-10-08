const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const ms = require('ms');
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis");
const { taskProgress } = require('../../../../Global/Functions/taskProgress');
class MemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
        });
    }
    
 async onLoad(member) {
    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:member.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
    const invChannel = member.guild.channels.cache.get(channels.inviteLog);
    if(!invChannel) return console.log("İnv Log kanalı Bulunamadı!")
    let fakeControl = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7
    const cachedInvites = await guildInvites.get(member.guild.id) || await new Collection().clone();
    const invites = await member.guild.invites.fetch();
    const invite = invites.find(inv => cachedInvites.get(inv.code) < inv.uses) || member.guild.vanityURLCode;
    const codeUses = new Map();
    invites.forEach(inv => codeUses.set(inv.code, inv.uses));
    guildInvites.set(member.guild.id, codeUses);
    const sagOk = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_sagOk")
    const carpi = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi")
    const tik = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_tik")
    if(invite === member.guild.vanityURLCode) {
        

        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: member.guild.id } }, { upsert: true });
        if(invChannel) invChannel.send({ content: `${sagOk} **${member.user.tag}** <t:${Math.floor(Math.floor(Date.now() / 1000))}:R> sunucuya **ÖZEL URL** ile katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});
        

    } else if(invite) {
    
        const inviter = client.users.cache.get(invite?.inviter.id)

        if(!invite?.inviter) {
        
            if(fakeControl) {

            if(invChannel) invChannel.send({ content: `${member} <t:${Math.floor(Date.now() / 1000)}:R> sunucuya katıldı, davet eden kişi bulunamadı! ${carpi}`})
            return;
            
        }

            if(invChannel) invChannel.send({ content: `${member} <t:${Math.floor(Date.now() / 1000)}:R> sunucuya katıldı, davet eden kişi bulunamadı!`})

        }

    if(fakeControl) {

        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, fake: 1, dailyInvites: 1, weeklyInvites: 1 } }, { upsert: true });
        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: inviter.id } }, { upsert: true });

        const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });

        invChannel.send({ content: `${sagOk}  **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> **${inviter.tag}** (**${data.total+data.bonus}**) daveti ile sunucuya katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});    
        return;
    }

    if(invChannel) {

    await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: inviter.id } }, { upsert: true });
    await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, regular: 1, dailyInvites: 1, weeklyInvites: 1 } }, { upsert: true });

    let missionsystemdb = await missionsystem.findOne({guildID:member.guild.id});
    let mission_system = missionsystemdb ? missionsystemdb.only : false;
    var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:member.guild.id,userID:inviter.id})
    const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
    const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });

    invChannel.send({ content: `${sagOk}  **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> **${inviter.tag}** (**${data.total+data.bonus}**) daveti ile sunucuya katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});
    await taskProgress(member,"Invite",1);
    if(mission_system == true && authorityStatus == true){
        await missionsystem.findOneAndUpdate({guildID:member.guild.id,userID:inviter.id},{$inc:{InviteTask:1}},{upsert:true})
        await missionsControled(inviter.id,member.guild.id,"Davet")
        }
    }

    }
}
 }
}
module.exports = MemberAdd;