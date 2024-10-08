
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, StringSelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const vmute = require("../../../../Global/Database/penaltyDB/vmute")


const ms = require("ms");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class VoiceMute extends Command {
    constructor(client) {
        super(client, {
            name: "V-mute",
            description: "ID'si girilen kullanıcıyı süreli bir şekilde sunucunun ses kanallarında susturur",
            usage: ".vmute @Approval/ID",
            category: "Moderation",
            aliases: ["vmute","smute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.voiceMuteStaffRole].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  message.ReturnReply("member not specified")
    if (member.user.bot) return message.ReturnReply("its a bot")
    if (!member.manageable) return message.ReturnReply("insufficient authorization")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return message.ReturnReply("insufficient authorization")
    const data = await penalty.find();
    let cezakontrol = data.filter(x=> x.penaltys.some(x=> x.type == "VOICE-MUTE" && x.Punished === member.id && x.Finished == false)).length > 0 ? true : false
    if(((roles && roles.voiceMutedRole) && member.roles.cache.has(roles.voiceMutedRole)) || (cezakontrol === true)) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunduğu için susturma işlemi yapılamaz.`})
    var cezalar = [
        { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "15 Dakika", emoji: {id:await emojiBul("appEmoji_ceza")} , value: "8",sure:15*60000},
        { label: "Abartı, Küfür ve Taciz Kullanımı", description: "15 Dakika", emoji: {id:await emojiBul("appEmoji_ceza")} ,value: "9",sure:15*60000},
        { label: "Ses Kanallarını Amacı Dışında Kullanmak", description: "15 Dakika", emoji: {id:await emojiBul("appEmoji_ceza")} ,value: "10",sure:15*60000},
        { label: "Özel Odalara İzinsiz Giriş ve Trol", description: "30 Dakika", emoji: {id:await emojiBul("appEmoji_ceza")} ,value: "11",sure:30*60000},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "15 Dakika", emoji: {id: await emojiBul("appEmoji_ceza")} ,value: "12",sure:15*60000},
        { label: "Soundpad, Efekt ve Ses Programları Kullanımı", description: "1 Saat", emoji: {id:await emojiBul("appEmoji_ceza")} ,value: "13",sure:60*60000},
        { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "7 Gün", emoji:{ id:await emojiBul("appEmoji_ceza")} ,value: "14",sure:7*24*60*60000},
        { label: "Sunucu Kötüleme ve Kişisel Hakaret", description: "1 Saat", emoji: {id:await emojiBul("appEmoji_ceza")} ,value: "15",sure:60*60000} 

    ]
    const cezamenu = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("vcezalar")
        .setPlaceholder("Ses kanalları cezaları")
        .setOptions(cezalar)
    )
    message.channel.send({components:[cezamenu],embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`Aşağıda bulunan menüden metin kanallarından susturmak istediğiniz ${member} için uygun olan ceza sebebini ve süresini seçiniz!`)
    ]}).then(async msg => {
        var filter =async (button) =>{
            await button.deferUpdate()
            return button.user.id === message.author.id};
          const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
          collector.on('collect', async (menu) => {
for (let i = 0; i < cezalar.length; i++) {
    const ceza = cezalar[i];
if(ceza.value === menu.values[0]) {
await infraction(message.member,member,"VOICE-MUTE",ceza.label,ceza.sure,message, msg.edit({embeds:[new GenerateEmbed().setAuthor({
    name: message.guild.name,
    iconURL: message.guild.iconURL({ dynamic: true }),
  }).setDescription(
    `${member} Kullanıcısı **${ceza.label}** sebebi nedeni ile \`${sureCevir(ceza.sure)}\` SesMute atıldı`
  ),],components:[]}))
}
}          })
        
    })

} else return message.ReturnReply("Cannot use command")
}
}
module.exports = VoiceMute;