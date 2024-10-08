
const { EmbedBuilder,PermissionsBitField,StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, codeBlock, ActionRow  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild");
const voiceGuild = require("../../../../Global/Database/Stats/Voice/voiceGuild");

const GuildStatSystem  = require("../../../../Global/Database/SystemDB/guild.stat.system")
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const coinSystemDB = require("../../../../Global/Database/SystemDB/guild.coin.system");

const voiceCameraUser = require("../../../../Global/Database/Stats/Camera/voiceCameraUser");
const voiceGuildCamera = require('../../../../Global/Database/Stats/Camera/voiceGuildCamera');

const voiceStreamerUser = require("../../../../Global/Database/Stats/Streamer/voiceStreamerUser");
const voiceGuildStream = require('../../../../Global/Database/Stats/Streamer/voiceGuildStream');

const inviter =  require("../../../../Global/Database/invite/inviteSchema")
const CoinDB = require("../../../../Global/Database/SystemDB/coin.js")

const moment = require("moment");
const Users = require("../../../../Global/Database/Users");
const GuildLevelSystem = require("../../../../Global/Database/SystemDB/GuildLevelSystem");
require("moment-duration-format");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis");
const { convertNumbers } = require("../../../../Global/Functions/convertNumbers.js");
class Top extends Command {
    constructor(client) {
        super(client, {
            name: "Top",
            description: "Sunucunun genel ses, mesaj, kamera, yayın, davet ve coin liderlik sıralamalarını gösterir.",
            usage: ".top",
            category: "Statistics",
            aliases: ["top"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
   const guildstatsystem = await GuildStatSystem.findOne({guildID:message.guild.id});
   let controlsystem = guildstatsystem ? guildstatsystem.statSystem : false;
   if(controlsystem == true) {
    if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));
    let kup = message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") : "❯"
    let saat = message.guild.emojis.cache.find(x=> x.name == "appEmoji_saat") ? `${message.guild.emojis.cache.find(x=> x.name == "appEmoji_saat")}`: `\` | \` `;
    var voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ totalStat: -1 });
    var voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat ).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
    let kategoriler = new ActionRowBuilder()
    .addComponents(
     new StringSelectMenuBuilder()
     .setCustomId("istatistik")
     .setPlaceholder("İstatistik Kategorileri")
     .setMaxValues(1)
     .setOptions(
       {label:"Ses", description:"Genel Ses İstatistik Verilerin İçin Tıkla!",value:"ses",emoji:{id:await emojiBul("appEmoji_ses")}},
       {label:"Mesaj", description:"Genel Mesaj İstatistik Verilerin İçin Tıkla!",value:"msg",emoji:{id:await emojiBul("appEmoji_metin")}},
       {label:"Kamera", description:"Genel Kamera İstatistik Verilerin İçin Tıkla!",value:"kamera",emoji:{id:await emojiBul("appEmoji_kamera")}},
       {label:"Yayın", description:"Genel Yayın Sunucu İstatistik Verilerin İçin Tıkla!",value:"yayin",emoji:{id:await emojiBul("appEmoji_yayin")}},
       {label:"Davet", description:"Genel Davet Sunucu İstatistik Verilerin İçin Tıkla!",value:"davet",emoji:{id:await emojiBul("appEmoji_davet")}},
       {label:"Coin", description:"Genel Coin Sunucu İstatistik Verilerin İçin Tıkla!",value:"coin",emoji:{id:await emojiBul("appEmoji_coin")}},

       )
    )
    let gunluk;
    let haftalık;
    let aylık;
    let genel;
    let butonlar = new ActionRowBuilder()
    .setComponents(
    gunluk  = new ButtonBuilder().setCustomId("gunluk").setEmoji(await emojiBul("appEmoji_saat")).setLabel("Günlük").setStyle(ButtonStyle.Secondary).setDisabled(false),
    haftalık= new ButtonBuilder().setCustomId("haftalık").setEmoji(await emojiBul("appEmoji_saat")).setLabel("Haftalık").setStyle(ButtonStyle.Secondary).setDisabled(false),
    aylık   = new ButtonBuilder().setCustomId("aylık").setEmoji(await emojiBul("appEmoji_saat")).setLabel("Aylık").setStyle(ButtonStyle.Secondary).setDisabled(false),
    genel   = new ButtonBuilder().setCustomId("genel").setEmoji(await emojiBul("appEmoji_saat")).setLabel("Genel").setStyle(ButtonStyle.Secondary).setDisabled(false),
    )
    await message.channel.send({components:[butonlar,kategoriler], embeds: [
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait genel istatistikler verilmiştir. İstatistikleri daha detaylı görmek için butonları kullanabilir veya istatistik kategorisini değiştirmek için menüyü kullanabilirsiniz.`).addFields(
        { name: `${kup} Top 10 Ses Sıralaması`, value: `${ses}`, inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
    ] })
        .then(async msg =>{
            var filter = (button) => button.user.id === message.author.id;
            var kategoriData = "Ses";
    const collector = msg.createMessageComponentCollector({ filter, time: 90000 });
    collector.on('collect', async (inter) => {
    await inter.deferUpdate();
    const menu = inter.values ? inter.values[0] : "Yok";
    const button = inter.customId;
    if(menu == "ses"){
    kategoriData = "Ses";
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const voiceGuildStat = voiceGuildData ? voiceGuildData.totalStat : 0;
    voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ totalStat: -1 });
    voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat ).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(voiceGuildStat).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 Ses Sıralaması`,value: `${ses}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(menu == "msg"){
    kategoriData = "Mesaj";
    var messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ totalStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const messageGuildState = messageGuildData ? messageGuildData.totalStat : 0;
    var messageUsers = messageUsersData.filter(x=> message.guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat ).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${Number(x.totalStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Mesaj__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${messageGuildState}\`**`)
        .addFields({name: `${kup} Top 10 __Mesaj__ Sıralaması`,value: `${mesaj}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(menu == "kamera"){
    kategoriData = "Kamera";
    const messageGuildCameraUsersData = await voiceCameraUser.find({guildID:message.guild.id});
    const messageGuildCameraData = await voiceGuildCamera.findOne({guildID:message.guild.id});
    const messageGuildCameraState = messageGuildCameraData ? messageGuildCameraData.totalStat : 0;
    const kameraSıralama = messageGuildCameraUsersData.length > 0 ? `${messageGuildCameraUsersData.filter(x=> message.guild.members.cache.get(x.userID)).sort((a,b)=> b.totalStat - a.totalStat ).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Kamera__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildCameraState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Kamera__ Sıralaması`,value: `${kameraSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(menu == "yayin"){
    kategoriData = "Yayın";
    const messageGuildStreamaUsersData = await voiceStreamerUser.find({guildID:message.guild.id});
    const messageGuildStreamaData = await voiceGuildStream.findOne({guildID:message.guild.id});
    const messageGuildStreamState = messageGuildStreamaData ? messageGuildStreamaData.totalStat : 0;
    const YayınSıralama = messageGuildStreamaUsersData.length > 0 ? `${messageGuildStreamaUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).sort((a,b)=> b.totalStat - a.totalStat ).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Yayın__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildStreamState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Yayın__ Sıralaması`,value: `${YayınSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(menu == "davet"){
    kategoriData = "Davet";
    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:message.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
    if(guildInviteSystemControl == true) {
        const messageGuildInviteData = await inviter.find({ guildID: message.guild.id });
        const davetSıralama = await messageGuildInviteData.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).length > 0 ? messageGuildInviteData.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).sort((a,b)=>b.total - a.total).map((x,Index)=>`${convertNumbers(Index + 1,message.guild)} <@${x.userID}>: \`${x.total}\`  ${x.userID == message.member.id ? "**(Siz)**":``}`).splice(0,25).join("\n"):`Veri Bulunamadı!`
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(true),haftalık.setDisabled(true),aylık.setDisabled(true),genel.setDisabled(true)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Davet__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${message.guild.memberCount}\`**`)
            .addFields({name: `${kup} Top 10 __Davet__ Sıralaması`,value: `${davetSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })

    } else {
    msg.reply({content:`**Davet Sistemi** Kapalı olduğundan bu işlem yapılamaz.`})
    }
    }
    if(menu == "coin"){
    kategoriData = "Coin";
    const coinsystemData = await coinSystemDB.findOne({guildID:message.guild.id});
    const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
    if(coinSystemOnly == true){
        const messageGuildCoineData = await CoinDB.find({ guildID: message.guild.id });
        const coinSıralama = await messageGuildCoineData.length > 0 ? messageGuildCoineData.filter(data=>message.guild.members.cache.get(data.userID)).sort((a,b)=>b.coin - a.coin).map((x,Index)=>`${convertNumbers(Index + 1,message.guild)} <@${x.userID}>: \`${x.coin}\`  ${x.userID == message.member.id ? "**(Siz)**":``}`).splice(0,25).join("\n"):`Veri Bulunamadı!`
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(true),haftalık.setDisabled(true),aylık.setDisabled(true),genel.setDisabled(true)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Coin__ kategorisine ait sıralama verilmiştir.\n **${saat} Toplam \`${message.guild.memberCount}\`**`)
            .addFields({name: `${kup} Top 10 __Coin__ Sıralaması`,value: `${coinSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })

    } else {
    msg.reply({content:`**Ekonomi Sistemi** Kapalı olduğundan bu işlem yapılamaz.`})
    }
    }
    if(button == "gunluk"){
    if(kategoriData == "Ses"){
        const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const voiceGuildStat = voiceGuildData ? voiceGuildData.dailyStat : 0;
    voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ dailyStat: -1 });
    voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).sort((a,b)=> b.dailyStat - a.dailyStat ).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.dailyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait **Günlük** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(voiceGuildStat).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 Ses Sıralaması`,value: `${ses}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Mesaj"){
    var messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ dailyStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const messageGuildState = messageGuildData ? messageGuildData.dailyStat : 0;
    var messageUsers = messageUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${Number(x.dailyStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Mesaj__  kategorisine ait **Günlük** sıralama verilmiştir.\n **${saat} Toplam \`${messageGuildState}\`**`)
        .addFields({name: `${kup} Top 10 __Mesaj__ Sıralaması`,value: `${mesaj}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Kamera"){
    const messageGuildCameraUsersData = await voiceCameraUser.find({guildID:message.guild.id});
    const messageGuildCameraData = await voiceGuildCamera.findOne({guildID:message.guild.id});
    const messageGuildCameraState = messageGuildCameraData ? messageGuildCameraData.dailyStat : 0;
    const kameraSıralama = messageGuildCameraUsersData.length > 0 ? `${messageGuildCameraUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.dailyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Kamera__ kategorisine ait **Günlük** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildCameraState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Kamera__ Sıralaması`,value: `${kameraSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })  
    }
    if(kategoriData == "Yayın"){
        const messageGuildStreamaUsersData = await voiceStreamerUser.find({guildID:message.guild.id});
        const messageGuildStreamaData = await voiceGuildStream.findOne({guildID:message.guild.id});
        const messageGuildStreamState = messageGuildStreamaData ? messageGuildStreamaData.dailyStat : 0;
        const YayınSıralama = messageGuildStreamaUsersData.length > 0 ? `${messageGuildStreamaUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.dailyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Yayın__ kategorisine ait **Günlük** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildStreamState).format("H [saat], m [dakika]")}\`**`)
            .addFields({name: `${kup} Top 10 __Yayın__ Sıralaması`,value: `${YayınSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })
    }
    }
    if(button == "haftalık"){
    if(kategoriData == "Ses"){
        const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const voiceGuildStat = voiceGuildData ? voiceGuildData.weeklyStat : 0;
    voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
    voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.weeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait **Haftalık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(voiceGuildStat).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 Ses Sıralaması`,value: `${ses}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Mesaj"){
    var messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const messageGuildState = messageGuildData ? messageGuildData.weeklyStat : 0;
    var messageUsers = messageUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${Number(x.weeklyStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Mesaj__  kategorisine ait **Haftalık** sıralama verilmiştir.\n **${saat} Toplam \`${messageGuildState}\`**`)
        .addFields({name: `${kup} Top 10 __Mesaj__ Sıralaması`,value: `${mesaj}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Kamera"){
    const messageGuildCameraUsersData = await voiceCameraUser.find({guildID:message.guild.id});
    const messageGuildCameraData = await voiceGuildCamera.findOne({guildID:message.guild.id});
    const messageGuildCameraState = messageGuildCameraData ? messageGuildCameraData.weeklyStat : 0;
    const kameraSıralama = messageGuildCameraUsersData.length > 0 ? `${messageGuildCameraUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.weeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Kamera__ kategorisine ait **Haftalık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildCameraState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Kamera__ Sıralaması`,value: `${kameraSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })  
    }
    if(kategoriData == "Yayın"){
        const messageGuildStreamaUsersData = await voiceStreamerUser.find({guildID:message.guild.id});
        const messageGuildStreamaData = await voiceGuildStream.findOne({guildID:message.guild.id});
        const messageGuildStreamState = messageGuildStreamaData ? messageGuildStreamaData.weeklyStat : 0;
        const YayınSıralama = messageGuildStreamaUsersData.length > 0 ? `${messageGuildStreamaUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.weeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Yayın__ kategorisine ait **Haftalık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildStreamState).format("H [saat], m [dakika]")}\`**`)
            .addFields({name: `${kup} Top 10 __Yayın__ Sıralaması`,value: `${YayınSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })
    }
    }
    if(button == "aylik"){
    if(kategoriData == "Ses"){
        const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const voiceGuildStat = voiceGuildData ? voiceGuildData.twoWeeklyStat : 0;
    voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ twoWeeklyStat: -1 });
    voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait **Aylık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(voiceGuildStat).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 Ses Sıralaması`,value: `${ses}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Mesaj"){
    var messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ twoWeeklyStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const messageGuildState = messageGuildData ? messageGuildData.twoWeeklyStat : 0;
    var messageUsers = messageUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Mesaj__  kategorisine ait **Aylık** sıralama verilmiştir.\n **${saat} Toplam \`${messageGuildState}\`**`)
        .addFields({name: `${kup} Top 10 __Mesaj__ Sıralaması`,value: `${mesaj}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Kamera"){
    const messageGuildCameraUsersData = await voiceCameraUser.find({guildID:message.guild.id});
    const messageGuildCameraData = await voiceGuildCamera.findOne({guildID:message.guild.id});
    const messageGuildCameraState = messageGuildCameraData ? messageGuildCameraData.twoWeeklyStat : 0;
    const kameraSıralama = messageGuildCameraUsersData.length > 0 ? `${messageGuildCameraUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Kamera__ kategorisine ait **Aylık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildCameraState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Kamera__ Sıralaması`,value: `${kameraSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })  
    }
    if(kategoriData == "Yayın"){
        const messageGuildStreamaUsersData = await voiceStreamerUser.find({guildID:message.guild.id});
        const messageGuildStreamaData = await voiceGuildStream.findOne({guildID:message.guild.id});
        const messageGuildStreamState = messageGuildStreamaData ? messageGuildStreamaData.twoWeeklyStat : 0;
        const YayınSıralama = messageGuildStreamaUsersData.length > 0 ? `${messageGuildStreamaUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Yayın__ kategorisine ait **Aylık** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildStreamState).format("H [saat], m [dakika]")}\`**`)
            .addFields({name: `${kup} Top 10 __Yayın__ Sıralaması`,value: `${YayınSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })
    }
    }
    if(button == "Genel"){
    if(kategoriData == "Ses"){
        const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const voiceGuildStat = voiceGuildData ? voiceGuildData.totalStat : 0;
    voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ totalStat: -1 });
    voiceUsers = voiceUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Ses__ kategorisine ait **Genel** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(voiceGuildStat).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 Ses Sıralaması`,value: `${ses}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Mesaj"){
    var messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ totalStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const messageGuildState = messageGuildData ? messageGuildData.totalStat : 0;
    var messageUsers = messageUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${Number(x.totalStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`);
    const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Mesaj__  kategorisine ait **Genel** sıralama verilmiştir.\n **${saat} Toplam \`${messageGuildState}\`**`)
        .addFields({name: `${kup} Top 10 __Mesaj__ Sıralaması`,value: `${mesaj}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })
    }
    if(kategoriData == "Kamera"){
    const messageGuildCameraUsersData = await voiceCameraUser.find({guildID:message.guild.id});
    const messageGuildCameraData = await voiceGuildCamera.findOne({guildID:message.guild.id});
    const messageGuildCameraState = messageGuildCameraData ? messageGuildCameraData.totalStat : 0;
    const kameraSıralama = messageGuildCameraUsersData.length > 0 ? `${messageGuildCameraUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
    await msg.edit({
        components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
        embeds:[
        new GenerateEmbed()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**${message.guild.name}**, Aşağıda __Kamera__ kategorisine ait **Genel** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildCameraState).format("H [saat], m [dakika]")}\`**`)
        .addFields({name: `${kup} Top 10 __Kamera__ Sıralaması`,value: `${kameraSıralama}`,inline: true })
        .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
        ]
    })  
    }
    if(kategoriData == "Yayın"){
        const messageGuildStreamaUsersData = await voiceStreamerUser.find({guildID:message.guild.id});
        const messageGuildStreamaData = await voiceGuildStream.findOne({guildID:message.guild.id});
        const messageGuildStreamState = messageGuildStreamaData ? messageGuildStreamaData.totalStat : 0;
        const YayınSıralama = messageGuildStreamaUsersData.length > 0 ? `${messageGuildStreamaUsersData.filter(x=> message.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `${convertNumbers(index + 1,message.guild)} <@${x.userID}>: \`${moment.duration(x.totalStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? "**(Siz)**":``}`).join(`\n`)}` :"Veri Bulunmuyor."
        await msg.edit({
            components:[new ActionRowBuilder({components:[gunluk.setDisabled(false),haftalık.setDisabled(false),aylık.setDisabled(false),genel.setDisabled(false)]}),kategoriler],
            embeds:[
            new GenerateEmbed()
            .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
            .setDescription(`**${message.guild.name}**, Aşağıda __Yayın__ kategorisine ait **Genel** sıralama verilmiştir.\n **${saat} Toplam \`${moment.duration(messageGuildStreamState).format("H [saat], m [dakika]")}\`**`)
            .addFields({name: `${kup} Top 10 __Yayın__ Sıralaması`,value: `${YayınSıralama}`,inline: true })
            .setThumbnail(message.guild.banner ? message.guild.bannerURL({size:2048}) : "https://cdn.discordapp.com/attachments/1066294822589182062/1077249409055731774/Luppux.png")
            ]
        })
    }
    }
    })
})
    } else  return message.ReturnReply("This system is closed");
}
}
module.exports = Top;