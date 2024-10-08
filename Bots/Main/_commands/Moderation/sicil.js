
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,codeBlock, StringSelectMenuBuilder} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class sicil extends Command {
    constructor(client) {
        super(client, {
            name: "Sicil",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".sicil CezaID",
            category: "Moderation",
            aliases: ["sicil","cezagecmis"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms].some(x=> message.member.roles.cache.has(x))){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.ReturnReply("member not specified")
        var data = await penalty.find({guildID:message.guild.id,userID:member.id});
        if(!data)return message.reply({content:`**${member.user.tag}** adlı kullanıcıya ait veri bulunamadı`})
        let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
        const cp = cezapuandata ? cezapuandata.cezapuan: 0;
        var ban = 0;
        var cmute = 0;
        var vmute =0;
        var jail = 0;
        var menuOptions = [];
        for (let i = 0; i < data.length; i++) {
            const cezalar = data[i];
            await menuOptions.push({
                label:`${(cezalar.penaltys[0].type).replace("UNJAIL","Uzaklaştırması Kaldırıldı").replace("VOICE-UNMUTE","Sesli Susturması Kaldırıldı").replace("CHAT-UNMUTE","Yazılı Susturması Kaldırıldı").replace("CHAT-MUTE","Yazılı Susturma").replace("VOICE-MUTE","Sesli Susturma").replace("JAIL","Uzaklaştırma").replace("UNBAN","Yasak Kaldırıldı").replace("BAN","Sunucu Yasağı")} - ${moment(cezalar.penaltys[0].SentencingDate).format("YYYY-MM-DD")}`,
                description:`${cezalar.penaltys[0].Reason === undefined ? "Sebep Girilmemiş.":cezalar.penaltys[0].Reason}`,
                emoji:{id : (cezalar.penaltys[0].Finished === true ? await emojiBul("appEmoji_tik") : await emojiBul("appEmoji_carpi"))},
                value:`${cezalar.cezaId}`
            })
            if(cezalar.penaltys[0].type == "CHAT-MUTE"){cmute++}
            if(cezalar.penaltys[0].type == "VOICE-MUTE"){vmute++}
            if(cezalar.penaltys[0].type == "JAIL"){jail++}
            if(cezalar.penaltys[0].type == "BAN"){ban++}
        }
        const row = new ActionRowBuilder()
        .setComponents(
            new StringSelectMenuBuilder()
            .setCustomId("sicil")
            .addOptions(menuOptions.slice(0,25))
            .setPlaceholder(`${menuOptions.length> 25 ? "Son 25":menuOptions.length} adet cezan sıralanmıştır.`)
        )
        var embedMSG;
        message.channel.send({embeds:[new GenerateEmbed().setDescription(`${member}, aldığın cezalar menüde listelenmiştir.
### İhlaller
- Ban
  - ${ban} adet.
- Chat Mute
  - ${cmute} adet.
- Voice Mute
  - ${vmute} adet.
- Jail
  - ${jail} adet.
${codeBlock("md",`Mevcut ceza puanın ${cp}.`)}
        `)],components:[row]}).then(async msg => {
          message.replyReaction(message.guild.findReaction(Tik,"ID"));
          var filter =async (button) =>{
            await button.deferUpdate();
            return button.user.id === message.author.id};
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
            collector.on('collect', async (menu) => {
  for (let i = 0; i < menuOptions.length; i++) {
      const menuOption = menuOptions[i];
    if(menuOption.value === menu.values[0]){
    let cezaverisi = await penalty.findOne({guildID:message.guild.id,userID:member.id,cezaId:menuOption.value})
    let staff = message.guild.members.cache.get(cezaverisi.penaltys[0].Staff) ? message.guild.members.cache.get(cezaverisi.penaltys[0].Staff) : `ID:-${cezaverisi.penaltys[0].Staff}`
    if(embedMSG === undefined){ embedMSG = await menu.channel.send({embeds:[ new GenerateEmbed()
      .setTitle("Ceza Bilgisi")
      .setAuthor({name:member.user.username,iconURL:member.user.avatarURL({dynamic:true})})
      .setFooter({text:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
      .setFields(
        {name:"Ceza ID",value:`#${cezaverisi.cezaId}`,inline:false},
        {name:`Yetkili`,value:`${staff}`,inline:false},
        {name:"Tarih",value:`<t:${(cezaverisi.penaltys[0].SentencingDate/1000).toFixed()}>`,inline:false},
        {name:`Ceza Tipi`,value:`${(cezaverisi.penaltys[0].type).replace("UNJAIL","Uzaklaştırması Kaldırıldı").replace("VOICE-UNMUTE","Sesli Susturması Kaldırıldı").replace("CHAT-UNMUTE","Yazılı Susturması Kaldırıldı").replace("CHAT-MUTE","Yazılı Susturma").replace("VOICE-MUTE","Sesli Susturma").replace("JAIL","Uzaklaştırma").replace("UNBAN","Yasak Kaldırıldı").replace("BAN","Sunucu Yasağı")}`,inline:false},
        {name:`Suç`,value:`${codeBlock("md",cezaverisi.penaltys[0].Reason === undefined ? "Sebep Girilmemiş.":cezaverisi.penaltys[0].Reason)}`,inline:false},
      )
    ]})
  }else {
    embedMSG.edit({embeds:[ new GenerateEmbed()
      .setTitle("Ceza Bilgisi")
      .setAuthor({name:member.user.username,iconURL:member.user.avatarURL({dynamic:true})})
      .setFooter({text:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
      .setFields(
        {name:"Ceza ID",value:`#${cezaverisi.cezaId}`,inline:false},
        {name:`Yetkili`,value:`${staff}`,inline:false},
        {name:"Tarih",value:`<t:${(cezaverisi.penaltys[0].SentencingDate/1000).toFixed()}>`,inline:false},
        {name:`Ceza Tipi`,value:`${(cezaverisi.penaltys[0].type).replace("UNJAIL","Uzaklaştırması Kaldırıldı").replace("VOICE-UNMUTE","Sesli Susturması Kaldırıldı").replace("CHAT-UNMUTE","Yazılı Susturması Kaldırıldı").replace("CHAT-MUTE","Yazılı Susturma").replace("VOICE-MUTE","Sesli Susturma").replace("JAIL","Uzaklaştırma").replace("UNBAN","Yasak Kaldırıldı").replace("BAN","Sunucu Yasağı")}`,inline:false},
        {name:`Suç`,value:`${codeBlock("md",cezaverisi.penaltys[0].Reason === undefined ? "Sebep Girilmemiş.":cezaverisi.penaltys[0].Reason)}`,inline:false},
      )
    ]})
  }
    }
  }
            })
            collector.on("end", async (collected, reason) => {
              if (reason === "time") {
                if(embedMSG !== undefined) await embedMSG.delete();
                if(msg) await msg.delete();
              }
            });
                })
        /*
[
  {
    label: 'UNSunucu Yasağı - 2023-06-01',
    description: '2023-06-01 10:21 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-24'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 12:49 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-28'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 12:52 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-32'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 21:57 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-33'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 21:57 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-34'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:00 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-35'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:00 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-36'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:09 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-37'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:09 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-38'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:11 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-39'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:15 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-40'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:15 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-41'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:17 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-42'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:17 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-43'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:17 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-44'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:18 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-45'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:23 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-46'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:23 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-47'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:26 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-48'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:26 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-49'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:28 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-50'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:28 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-51'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:30 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-52'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:30 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-53'
  },
  {
    label: 'Sesli Susturma - 2023-06-05',
    description: '2023-06-05 22:31 | undefined',
    emoji: { id: '1077256967187349635' },
    value: 'ID-54'
  },
  {
    label: 'VOICE-UNMUTE - 2023-06-05',
    description: '2023-06-05 22:31 | Sebep Girilmedi.',
    emoji: { id: '1077256979887706183' },
    value: 'ID-55'
  }
]

{
  Staff: '341592492224806914',
  Punished: '852856384386236436',
  SentencingDate: 1682763867232,
  PenaltyEndTime: null,
  Finished: true,
  type: 'JAIL',
  Reason: 'Reklam'
}
*/





































    //     var sicil = [];
    //     for (let index = 0; index < data.length; index++) {
    //         sayi++
    //         const cezalar = data[index];
    //         sicil.push({UserID: cezalar.userID, cezaID:cezalar.cezaId, Staff:cezalar.penaltys[0].Staff,cezaTarih:cezalar.penaltys[0].SentencingDate, type:cezalar.penaltys[0].type,sebep:cezalar.penaltys[0].Reason})
    //     }
    //     let pages = sicil.chunk(10)
    //     if (!pages.length || !pages[currentPage - 1].length) return message.reply({content:`**${member.user.tag}** adlı kullanıcıya ait veri bulunamadı`})
    //     let geri = new ButtonBuilder().setCustomId('geri').setLabel("◀").setStyle(ButtonStyle.Secondary);
    //     let ileri = new ButtonBuilder().setCustomId('ileri').setLabel("▶").setStyle(ButtonStyle.Secondary)
    //     if(sayi < 5){
    // geri.setDisabled(true);
    // ileri.setDisabled(true);
    // }
    // let msg = await  message.channel.send({ components: [new ActionRowBuilder()
    //     .addComponents(
    //         geri,
    //       new ButtonBuilder()
    //         .setCustomId('cancel')
    //         .setEmoji(`✖`)
    //         .setStyle(ButtonStyle.Secondary),
    //         ileri
    
    //     )], embeds: [new GenerateEmbed().setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
    //     var filter = (button) => button.user.id === message.author.id;
    //     const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
    //     collector.on('collect', async (button, user) => {
    //         await button.deferUpdate();
    //             if (button.customId === "ileri") {
    //                 if (currentPage == pages.length) return;
    //                 currentPage++;
    //                 if (msg) msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
    //                 await button.editReply({ content: `**Sayfa: ${currentPage}**`})
    //             }
    //              if (button.customId === "cancel") {
        
    //                 if (msg) msg.delete().catch(err => { });
    //                 if (message) return message.delete().catch(err => { });
    //                 await button.editReply({ content: `**Ceza Geçmişi Silindi!**`})

    //             }
    //              if (button.customId === "geri") {
        
    //                 if (currentPage == 1) return;
    //                 currentPage--;
    //                 if (msg) msg.edit({ embeds: [new GenerateEmbed().setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
    //                 await button.editReply({ content: `**Sayfa: ${currentPage}**`})

    //             }
    //         }
    //      );
    //      collector.on("end", async (collected, reason) => {
    //         if (reason === "time") {
    //           if (msg)  msg.delete()
    //         }
    //       });
} else return message.ReturnReply("Cannot use command")
}
}
module.exports = sicil;