const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField, Events:{GuildRoleUpdate} } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const permissionStaff = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks];
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class roleCreate extends Event {
    constructor(client) {
        super(client, {
            name: GuildRoleUpdate,
            enabled: true,
        });    
    }    

 async  onLoad(oldRole, newRole) {
    if(oldRole.guild.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const rolesGuardonly = Guard ? Guard.rolesGuard : false;
    if(rolesGuardonly == true){
    let entry = await guild.fetchAuditLogs({type: 31}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;

    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    const log = guild.channels.cache.find(x => x.name == "role-guard")
    const embed = new EmbedBuilder({
        title:"Server Roles Protection - Security I",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor ||Date.now() - entry.createdTimestamp > 5000 ||  orusbuevladı.user.bot)return;
    if (await guvenli(orusbuevladı,"role") == true){
        if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldRole.name}** isimli rolü güncelledi`)]})
    }
    await ytkapa(Guild.ID)
    await ytçek(orusbuevladı)
    if (permissionStaff.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
        newRole.setPermissions(PermissionsBitField.Flags.SendMessages)
      };
      await newRole.edit({
        name: oldRole ? oldRole.name : oldRole.name,
        color: oldRole ? oldRole.hexColor : oldRole.hexColor,
        hoist: oldRole ? oldRole.hoist : oldRole.hoist,
        permissions: oldRole ? oldRole.permissions : oldRole.permissions,
        mentionable: oldRole ? oldRole.mentionable : oldRole.mentionable
      });
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${oldRole.name}** isimli güncellediği için rolleri alındı ve rol eski haline getirildi.`)]})
    }
 }
}

module.exports = roleCreate;