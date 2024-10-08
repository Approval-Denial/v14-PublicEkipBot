const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, Events:{GuildRoleDelete} } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const roleBackup = require("../../../../Global/Database/Backup/Guild.Roles");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class roleDeleted extends Event {
    constructor(client) {
        super(client, {
            name: GuildRoleDelete,
            enabled: true,
        });    
    }    

 async  onLoad(role) {
    if(role.guild.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const rolesGuardonly = Guard ? Guard.rolesGuard : false;
    if(rolesGuardonly == true){
    let entry = await guild.fetchAuditLogs({type: 32}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;

    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    const log = guild.channels.cache.find(x => x.name == "role-guard")
    const embed = new EmbedBuilder({
        title:"Server Roles Protection - Datebase",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor || orusbuevladı.user.bot)return;
    if ( Date.now() - entry.createdTimestamp > 5000|| await guvenli(orusbuevladı,"full") == true){
        return
    }
    const roleData = await roleBackup.findOne({ roleID: role.id })
    const newRole = await role.guild.roles.create({

      name: roleData ? roleData.name : role.name,
      color: roleData ? roleData.color : role.color,
      hoist: roleData ? roleData.hoist : role.hoist,
      position: roleData ? roleData.position : role.rawPosition,
      permissions: roleData ? roleData.permissions : role.permissions,
      mentionable: roleData ? roleData.mentionable : role.mentionable,

      reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
    });
    await rolKur(role.id, newRole)
    if(log) return log.send({embeds:[new GenerateEmbed().setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **${role.name}** isimli rolü sildi. Rol tekrar oluşturuldu ve işlemler başlatıldı.`)]})
    }
 }
}

module.exports = roleDeleted;