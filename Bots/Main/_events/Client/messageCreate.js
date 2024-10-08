const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag");
const { checkBannedUser } = require('../../../../Global/Functions/checkBannedUser');


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }

    async onLoad(message) {
        const tagmsg = message.content.toLocaleLowerCase();
        if((tagmsg === "tag" || tagmsg === ".tag" ||tagmsg === "!tag") && !message.author.bot){
            const data = await tagsistem.findOne({guildID:message.guild.id});
            const tagsystemonly = data ? data.only : false
            if(tagsystemonly === true){
                if(data.Type === "Public"){
                    await message.reply({content:`${data.Tag}`});
                } else if (data.Type === "Ekip") {
                    await message.reply({content:`**${data.nameTags.join(", ")} | #${data.NumberTag}**`})
                }
            }
        }
        if (message.author.bot || !client.prefix.some(x => message.content.startsWith(x)) || (!client.owners.includes(message.author.id) && roles && [...roles.unregisterRoles, roles.bannedTagRole, roles.jailedRole, roles.suspectRole].some(rol => message.member.roles.cache.has(rol))) || !message.channel || message.channel.type != 0) return;
        
        let args = message.content.substring(client.prefix.some(x => x.length)).split(" ");
        let _find = args[0].toLocaleLowerCase()
        args = args.splice(1);
        let command = client.commands.get(_find) || client.aliases.get(_find);
        if (command) {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            if (member) {
                let checkBanned = await checkBannedUser(message, member.id)
                if (checkBanned === true) return;
                if(![message.guild.ownerId, ...client.owners].some(x => x === message.author.id) && member.user.bot) return message.ReturnReply("its a bot")
                if(![message.guild.ownerId, ...client.owners].some(x => x === message.author.id) && client.owners.some(x => x === member.id)) return message.ReturnReply("its a developer")
            }
            if ((!["Say", "Sil", "Afk"].some(x => command.name === x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && (channels && channels.chatChannel && (message.channel.id === channels.chatChannel))) return message.reply({ content: `Bot komutlarını sadece <#1209603475587989524> kanalında kullanabilirsiniz.` }).destroyMessage();
            if (((command.developer && command.developer === true) && !client.owners.includes(message.author.id))) return message.reply({ embeds: [new GenerateEmbed().setDescription(`Bu komutu sadece ${client.owners.map(x => `<@${x}>`).join(", ")} kullanabilir.`)] }).destroyMessage();
            if (((command.guildOwner && command.guildOwner === true) && ![message.guild.ownerId, ...client.owners].some(x => x === message.author.id))) return message.reply({ embeds: [new GenerateEmbed().setDescription(`Bu komutu sadece sunucu sahibi kullanabilir.`)] }).destroyMessage();
            if (command.permissions && command.permissions.length > 0) {
                if ((!command.permissions.some(perm => message.member.permissions.has(perm) || message.member.roles.cache.has(perm) || message.author.id === perm))) return message.reply({ embeds: [new GenerateEmbed().setDescription(`Bu komutu kullanabilmek için ${command.permissions.filter(x => message.guild.roles.cache.get(x)).length > 0 ? command.permissions.filter(x => message.guild.roles.cache.get(x)).map(x => message.guild.roles.cache.get(x).name).splice(0, 3).join(", ") + " rollerine" : " uygun rollere"}  ihtiyacın var.`)] }).destroyMessage();
            }

            if (command.cooldown && cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ embeds: [new GenerateEmbed().setDescription(`Bu komutu <t:${String(cooldown.get(`${command.name}${message.author.id}`)).slice(0, 10)}:R> kullanabilirsiniz.`)] }).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(err => { })
                }, 5000)
            });

            command.onRequest(client, message, args)
            if (message.guild.ownerId != message.author.id && !client.owners.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown);
            }
        }

    }
}

module.exports = messageCreate
