
const { EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle,StringSelectMenuBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const children = require("child_process");
const GuildRoles = require("../../../../Global/Database/Backup/Guild.Roles");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class takeback extends Command {
    constructor(client) {
        super(client, {
            name: "takeback",
            description: "sunucu içerisinde silinen rol ve kanalları geri getirir.",
            usage: ".takeback",
            category: "Guard",
            aliases: ["tb","takeback","gerial"],
            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    


   async onRequest (client, message, args,embed) {
    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder().setCustomId("role").setLabel("Rol").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("channel").setLabel("Kanal").setStyle(ButtonStyle.Secondary),
    )
    message.channel.send({components:[row],embeds:[new GenerateEmbed().setDescription(`Aşağıda ki butonları kullanarak geri getirmek istediğiniz rol veya kanalları seçebilirsiniz.`)]})
    .then(async msg =>{
    const filter = (i) => i.user.id == message.member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
    collector.on('collect', async (i) => {
    await i.deferUpdate();
    if(i.customId == "role"){
    var roles = [];
    const audit = await message.guild.fetchAuditLogs({ type: 32 }).then(a => a.entries)
     const denetim = audit.filter(e => !e.executor.bot && Date.now() - e.createdTimestamp < 1000 * 60 * 60*24)
     .forEach(e => roles.push({id:e.target.id,name:e.changes.filter(e=> e.key == "name").map(e=> e.old), executor:e.executor.tag}))
     var menu = [];
     for (let index = 0; index < roles.length; index++) {
        const role = roles[index];
        const roleData = await GuildRoles.findOne({roleID:role.id});
        if(!roleData) {menu.push({label:`${role.name}`,description:`${role.id} - Veri Bulunamadı.`,value:`${role.id}`});
        }else{ menu.push({label:`${role.name} - ${roleData.position}`,description:`ID: ${role.id} - Üyeler: ${roleData.members.length}`,value:`${role.id}`});
}     }
     const rowMenu = new ActionRowBuilder()
     .setComponents(
        new StringSelectMenuBuilder()
        .setCustomId("roletakeback")
        .setOptions(menu)
     )
     i.channel.send({components:[rowMenu],embeds:[new GenerateEmbed().setDescription(` \`${menu.length}\` adet rol bulundu. menüden "Veri bulunamadı." açıklaması  bulunan roller haricinide istediğiniz rolleri geri getirebilirsiniz. `)]})
        .then(async tbMSG =>{
        const tbCollector = tbMSG.createMessageComponentCollector({filter:filter});
        tbCollector.on("collect",async(tbI)=>{
        for (let size = 0; size < menu.length; size++) {
            const x = menu[size];
            if(x.value == tbI.values[0]){
            if(x.description.includes("Veri Bulunamadı.")) return tbI.reply({content:`**Seçtiğiniz rolün yedeği bulunmuyor.**`,ephemeral:true});
            let indexSize = x.label.indexOf(" -")
            let rolename = x.label.slice(0,indexSize);
            if(message.guild.roles.cache.find(x=> x.name == rolename)) return tbI.reply({content:`**Bu rolün isminde bir rol bulunduğu için işlem yapılamaz.**`,ephemeral:true})
            await tbI.deferUpdate();
            const roleData = await GuildRoles.findOne({roleID:x.value});
            let name = roleData ? roleData.name : "Yok";
            let color = roleData ? roleData.color : "fff";
            let position = roleData ? roleData.position : 0;
            let permissions = roleData ? roleData.permissions : 0;
            let Date = roleData ? roleData.date : "Yok";
            let members = roleData ? roleData.members : [];
            const tbRow = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("kur").setLabel("Rolü kur").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("iptal").setLabel("iptal").setStyle(ButtonStyle.Secondary),
            )
            tbI.channel.send({components:[tbRow],embeds:[new GenerateEmbed().setDescription(`<t:${(Date/1000).toFixed()}> Tarihinde detaylı verisi kaydedilmiş olan ve aşağıda bilgileri verilmiş olan rolü kurmak için "Rolü Kur" butonuna tıklamanız yeterli olucaktır.`)
        .addFields(
            {name:`Adı: \`${name}\``,value:`\u200B`,inline:true},
            {name:`Renk: \`#${color}\``,value:`\u200B`,inline:true},
            {name:`Sıra: \`${position}\``,value:`\u200B`,inline:true},
            {name:`Yetki: \`${permissions}\``,value:`\u200B`,inline:true},
            {name:`Kullanıcı sayısı: \`${members.length}\``,value:`\u200B`,inline:true},
        )]}).then(async smsg =>{
            const tbCollector = smsg.createMessageComponentCollector({filter:filter});
            tbCollector.on("collect",async(si)=>{
            if(si.customId == "kur"){
             const roleData = await GuildRoles.findOne({ roleID: x.value })
    const newRole = await si.guild.roles.create({
      name:  roleData.name,
      color:  roleData.color,
      hoist: roleData.hoist,
      position:  roleData.position,
      permissions: roleData.permissions,
      mentionable:  roleData.mentionable,

      reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
    });
    await rolKur(x.value, newRole)
    si.reply({content:`Rol Kuruluyor...`,ephemeral:true})
    if(smsg) smsg.delete();
            }

            })
        })
            }
        }
        })
        })
    }
    })
    })
    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}
module.exports = takeback
