const { codeBlock } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Ship} = require("canvafy");
const emojis = require('../../../../Global/Config/emojis');
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ship extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            description: "Ship",
            usage: ".ship",
            category: "Global",
            aliases: ["ship", "shipp", "SHİP", "Ship"],
            enabled: true,

            cooldown: 3500,

        });
    }

    async onRequest(client, message, args) {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        let erkekrol = roles.manRoles
        let karırol = roles.womanRoles
        let kayıtsızrolü = roles.unregisterRoles
        if (!member || message.author.id === member.id) {
            member = message.guild.members.cache.filter(m => !m.user.bot && m.user.avatar && m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x))).random();
            if (erkekrol.some(x => message.member.roles.cache.has(x))) member = message.guild.members.cache.filter(m =>!m.user.bot && m.user.avatar && m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x)) && karırol.some(x => m.roles.cache.get(x))).random();
            if (karırol.some(x => message.member.roles.cache.has(x))) member = message.guild.members.cache.filter(m =>!m.user.bot &&  m.user.avatar && m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x)) && erkekrol.some(x => m.roles.cache.get(x))).random();

        }
        if (!member) return message.ReturnReply("member not specified")
        message.replyReaction(message.guild.findReaction(emojis.general.Time,"ID"))
        const ship = await new Ship()
            .setAvatars(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }), member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
            //.setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
            .setBorder("#f0f0f0")
            .setOverlayOpacity(0.5)
            .build();
            message.reply({
                 files: [{ name: `ship-${member.id}.png`, attachment: ship }],
                  embeds: [
                    new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi",`${`${message.member.user.username} & ${member.user.username}`.red}`)}`)
                  .setImage(`attachment://ship-${member.id}.png`)
                ] 
            }).then(async x => {
                    message.removeToEmoji(message.guild.findReaction(emojis.general.Time,"ID"))
                })
    }
}
module.exports = ship