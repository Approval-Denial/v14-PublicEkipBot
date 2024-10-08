const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class guildMemberRoleAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRoleAdd",
            enabled: true,
        });    
    }    

 async  onLoad(member,role) {
    if(role.guild.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const rolesGuardonly = Guard ? Guard.rolesGuard : false;
    if(rolesGuardonly == true){
    let entry = await guild.fetchAuditLogs({type: 25}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;
    if([PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,PermissionsBitField.Flags.ManageChannels,PermissionsBitField.Flags.ManageGuild,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.ManageWebhooks,PermissionsBitField.Flags.ManageEmojisAndStickers,PermissionsBitField.Flags.ManageThreads].some(x=> role.permissions.has(x))){
    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    const log = guild.channels.cache.find(x => x.name == "role-guard")
    const embed = new EmbedBuilder({
        title:"Server Roles Protection - Security I",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor ||Date.now() - entry.createdTimestamp > 5000 ||  orusbuevladı.user.bot)return;
    if (await guvenli(orusbuevladı,"role") == true){
        const state = await Object.keys(member.presence.clientStatus)
        const stateMap = state.map(x=> x);
        if(stateMap.some(x=> x == "web")){
            await member.roles.remove(role.id)
            if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${member}** kullanıcısına yetki rolü (${role}) rolü verdi, fakat kullancı web'te görüldüğü için rolü kendisinden aldım!`)]})
        } else {
            if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${member}** kullanıcısına yetki rolü (${role}) rolü verdi!`)]})
        }
    }
    await ytkapa(Guild.ID)
    await sik(guild,orusbuevladı.id,"am")
    await member.roles.remove(role.id)
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${member}** kullanıcısına yetki rolü (${role}) verdiği için kendisini sunucudan yasakladım ve rolü geri aldım!`)]})
    }
  }
 }
}

module.exports = guildMemberRoleAdd;