
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const Users = require("../../../../Global/Database/Users");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class İsim extends Command {
    constructor(client) {
        super(client, {
            name: "isim",
            description: "Kullanıcının ismini değiştirmek için kullanılır",
            usage: ".isim @Approval/ID",
            category: "Register",
            aliases: ["i", "name"],
            enabled: true,
        });
    }
    async onRequest(client, message, args, embed) {
        if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
            ||
            [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms].some(x => message.member.roles.cache.has(x))) {


            const data = await tagsistem.findOne({ guildID: message.guild.id });
            const a = data.only
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            args = args.filter(a => a !== "" && a !== " ").splice(1);
            let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
            let yas = args.filter(arg => !isNaN(arg))[0] || undefined

            if (!member) return message.ReturnReply("member not specified")
            if (!member.manageable) return message.ReturnReply("insufficient authorization")
            if (!isim) return message.ReturnReply("name not specified")
            const tag = `${a == true ? `${data.Type == "Public" ? `${member.roles.cache.has(data.tagRol) ? `${data.Tag}` : `${data.unTag}`}` : `${data.nameTags.some(x => member.displayName.includes(x) || member.user.discriminator == data.NumberTag) ? `${data.Tag}` : `${data.unTag}`}`}` : ""}`
            let setName = `${tag} ${isim} ${yas == undefined ? "" : `| ${yas}`}`;

            let msg = await message.channel.send({
                embeds: [
                    new GenerateEmbed()
                        .setDescription(`${member} isimi kullanıcının ismini \`${setName}\` olarak değiştirmek istediğine emin misin ?`)
                ],
                components: [
                    new ActionRowBuilder()
                        .setComponents(
                            new ButtonBuilder().setLabel("Evet").setCustomId("evet").setStyle(ButtonStyle.Success),
                            new ButtonBuilder().setLabel("Hayır").setCustomId("hayır").setStyle(ButtonStyle.Danger),
                        )
                ]
            })
            var filter = i => i.user.id === message.member.id;
            const collector = msg.createMessageComponentCollector({filter, time: 30000 });
            collector.on('collect', async (i) => {
              await i.deferUpdate()
                if (i.customId == "evet") {
                    if (member.manageable) await member.setNickname(`${setName}`, { reason: `İsim Değiştirme, Yetkili: ${message.author.id}` })
                    msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member}, adı \`${setName}\` olarak başarıyla değiştirildi.`)], components: [new ActionRowBuilder().setComponents(new ButtonBuilder().setLabel("İşlem Tamamlandı!").setCustomId("kayıtokey").setDisabled(true).setStyle(ButtonStyle.Success))] })
                    const log = message.guild.channels.cache.find(x => x.name == "displayname_log")
                    if (log) await log.send({ embeds: [new GenerateEmbed().setDescription(`${member} adı ${message.member} tarafından __${new Date(Date.now()).toTurkishFormatDate()}__ tarihinde \`${setName}\` olarak değiştirildi.`)] })
                    await User.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `${setName}`, islem: "İsim Değiştirme" } } }, { upsert: true });
                }
                if (i.customId == "hayır") {
                    if (message) message.delete()
                    if (msg) msg.delete()
                }

            })
            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    msg.edit({ embeds: [new GenerateEmbed().setDescription(`İşlem zaman aşımına uğradı. Lütfen daha sonra tekrar deneyiniz.`)], components: [] })
                }
            });
        } else return message.ReturnReply("Cannot use command")


    }
}

module.exports = İsim;

