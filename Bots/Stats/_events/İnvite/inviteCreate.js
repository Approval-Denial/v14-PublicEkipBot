
const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const ms = require('ms');
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
    const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class inviteCreate extends Event {
    constructor(client) {
        super(client, {
            name: "inviteCreate",
            enabled: true,
        });
    }
    
 async onLoad(invites) {

    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:invites.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
    const invite = await invites.guild.invites.fetch();

    const codeUses = new Map();
    invite.each(inv => codeUses.set(inv.code, inv.uses));
    guildInvites.set(invites.guild.id, codeUses);
}
 }
}
module.exports = inviteCreate