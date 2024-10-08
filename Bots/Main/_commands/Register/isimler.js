
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class İsimler extends Command {
    constructor(client) {
        super(client, {
            name: "isimler",
            description: "Kişinin geçmiş isimlerini gösterir.",
            usage: ".İsimler @Approval/ID",
            category: "Register",
            aliases: ["names"],
            enabled: true,
        });
    }

    async onRequest(client, message, args, embed) {
        if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
            ||
            [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms].some(x => message.member.roles.cache.has(x))) {


            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            if (!member) return message.ReturnReply("member not specified")
            const data = await User.findOne({ userID: member.id }) || []
            let isimler = data.Names
            const response = await fetch(`https://api.vante.dev/users/${member.id}/names/luppuxsexpanel`);
            var responseData;
            if (!response.ok) {
                responseData = [];
            } else {
                responseData = await response.json();
            };
            if ((!isimler.length || !isimler || !data || !data.names) && responseData.length == 0) return message.ReturnReply("No name data")
            let otherservertext = `${codeBlock("ansi", `${`${`@${member.user.username}`}, diğer sunucularda aşağıda ki isimlere sahip.\n`.green.bold}\n\n${responseData.length == 0 ? "" : responseData.map((data, i) => `${`${i + 1}`.bgDarkBlue.cyan.bold}. ${`${data.serverName}`.blue.bold}\nİsim; ${`${data.name}`.white.bold}\nYaş; ${`${data.age}`.white.bold}\nCinsiyet; ${`${data.sex == "Male" ? "Erkek" : data.sex == "Female" ? "Kız" : "Unisex"}`.white.bold}\n`).join("\n")}`)} `
            let inServer;;
            let inDiscord;
            let buttons = new ActionRowBuilder()
                .setComponents(
                    inServer = new ButtonBuilder().setEmoji(message.guild.findReaction(Category, "ID")).setLabel(`In Server`).setCustomId("inserver").setStyle(ButtonStyle.Secondary).setDisabled(true),
                    inDiscord = new ButtonBuilder().setEmoji(message.guild.findReaction(Category, "ID")).setLabel(`In Discord`).setCustomId("indiscord").setStyle(ButtonStyle.Secondary).setDisabled(responseData.length > 0 ? false : true),

                )
            let msg = await message.channel.send({ components: [buttons], embeds: [new GenerateEmbed().setDescription(`${codeBlock("ansi", `${`${`@${member.user.username}`}, sunucu içerisinde daha önce aşağıda ki isimlere sahipti.\n\n`.green.bold + isimler.map((e, i) => `${`${i + 1}.`.bgDarkBlue.blue} ${`[${e.islem}]`.bgDarkBlue.green} ${`${e.Name}`.bgDarkBlue.yellow} ${e.rol ? `[${message.guild.findRole(e.rol).name}]`.bgDarkBlue.pink : ""} ${`(${message.guild.findMember(e.userID).user.username})`.bgDarkBlue.red}`).join("\n")}`)}`)] })
            var filter = async (button) => {
                await button.deferUpdate()
                return button.user.id === message.author.id
            };
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
            collector.on('collect', async (button, user) => {
                if (button.customId === "inserver") {
                    msg.edit({
                        embeds: [new GenerateEmbed().setDescription(`${codeBlock("ansi", `${`${`@${member.user.username}`}, sunucu içerisinde daha önce aşağıda ki isimlere sahipti.\n\n`.green.bold + isimler.map((e, i) => `${`${i + 1}.`.bgDarkBlue.blue} ${`[${e.islem}]`.bgDarkBlue.green} ${`${e.Name}`.bgDarkBlue.yellow} ${e.rol ? `[${message.guild.findRole(e.rol).name}]`.bgDarkBlue.pink : ""} ${`(${message.guild.findMember(e.userID).user.username})`.bgDarkBlue.red}`).join("\n")}`)}`)],
                        components: [
                            buttons = new ActionRowBuilder()
                                .setComponents(
                                    inServer.setDisabled(false),
                                    inDiscord.setDisabled(true),

                                )
                        ]
                    })
                }

                if (button.customId === "indiscord") {
                    msg.edit({
                        embeds: [new GenerateEmbed().setDescription(`${otherservertext}`)],
                        components: [
                            buttons = new ActionRowBuilder()
                                .setComponents(
                                    inServer.setDisabled(true),
                                    inDiscord.setDisabled(false),

                                )
                        ]
                    })
                }


            }
            );
        } else return message.ReturnReply("Cannot use command")
    }
}
module.exports = İsimler;