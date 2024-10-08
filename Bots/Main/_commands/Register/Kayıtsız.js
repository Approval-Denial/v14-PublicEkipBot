
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const Users = require("../../../../Global/Database/Users")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Kayıtsız extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtsız",
            description: "Kayıtlı üyeleri kayıtsıza atmak için kullanılır.",
            usage: ".kayıtsız @Approval/ID",
            category: "Register",
            aliases: ["unreg", "unregister", "kayitsiz"],

            enabled: true,
        });
    }


    onLoad(client) {

    }

    async onRequest(client, message, args, embed) {
        if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers].some(x => message.member.permissions.has(x))
            ||
            [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms].some(x => message.member.roles.cache.has(x))) {
            const data = await tagsistem.findOne({ guildID: message.guild.id });
            const a = data.only
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!member) return message.ReturnReply("member not specified");
            if (roles.unregisterRoles.some(x => member.roles.cache.has(x))) return message.ReturnReply("indifferent")
            if (member.user.bot) return message.ReturnReply("its a bot")
            if (!member.manageable) return message.ReturnReply("insufficient authorization")
            if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization")
            const tag = `${a == true ? `${data.Type == "Public" ? `${member.roles.cache.has(data.tagRol) ? `${data.Tag}` : `${data.unTag}`}` : `${data.nameTags.some(x => member.displayName.includes(x) || member.user.discriminator == data.NumberTag) ? `${data.Tag}` : `${data.unTag}`}`}` : ""}`
            let msg = await message.channel.send({
                embeds: [
                    new GenerateEmbed()
                        .setDescription(`${member} isimi kullanıcıyı kayıtsıza atmak istediğinize emin misiniz ?`)
                ],
                components: [
                    new ActionRowBuilder()
                        .setComponents(
                            new ButtonBuilder().setLabel("Evet").setCustomId("evet").setStyle(ButtonStyle.Success),
                            new ButtonBuilder().setLabel("Hayır").setCustomId("hayır").setStyle(ButtonStyle.Danger),
                        )
                ]
            })
            const filter = async (i) => {
                await i.deferUpdate()
                return i.user.id === message.member.id;
            }
            const collectorMain = msg.createMessageComponentCollector({ filter: filter, errors: ["time"], time: 30000 * 10 })
            collectorMain.on('collect', async (inter) => {
                if (inter.customId == "evet") {
                    var setName = `${tag} İsim`;
                    await member.setNickname(setName, `${message.member.user.tag} tarafından kayıtsıza atıldı.`);
                    let roller = member.roles.cache.filter(x => x.id != roles.boosterRole && x.id != message.guild.id).map(x => x.id)
                    await member.roles.remove(roller)
                    setTimeout(async () => {
                        await member.roles.add(roles.unregisterRoles)
                    }, 1000);
                    msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member} üzerinde bulunan roller başarıyla alınıp **Kayıtsız**'a atıldı!`)], components: [] }).then(async msg => {
                        setTimeout(async () => {
                            if (msg && msg.deletable) await msg.delete();
                            if (message && message.deletable) await message.delete();
                        }, 10000);
                    })
                    await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
                    await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: setName, islem: "Kayıtsıza Atma", rol: roles.unregisterRoles[0] } } }, { upsert: true });
                    const log = message.guild.channels.cache.find(x => x.name == "kayıtsız_log")
                    if (log) await log.send({ content: `**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now() / 1000).toFixed()}:> (<t:${(Date.now() / 1000).toFixed()}:R>) Kayıtsıza atıldı!` })
                }
                if (inter.customId == "hayır") {
                    if (message) message.delete()
                    if (msg) message.delete()
                }

            })
            collectorMain.on('end', (collected, reason) => {
                if (reason === 'time') {
                    msg.edit({ embeds: [new GenerateEmbed().setDescription(`İşlem zaman aşımına uğradı. Lütfen daha sonra tekrar deneyiniz.`)], components: [] })
                }
            });
        } else return message.ReturnReply("Cannot use command")

    }
}
module.exports = Kayıtsız;