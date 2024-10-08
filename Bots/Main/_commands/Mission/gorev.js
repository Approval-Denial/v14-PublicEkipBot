
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,StringSelectMenuBuilder} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const mission = require("../../../../Global/Database/mission/mission");
const aktiveTask = require("../../../../Global/Database/mission/aktiveTask");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");

const tasks = [
    {Name:`Sosyal Kelebek`,Category:"Message",Point:100,Time:60000*60*3, Reward:150,ChannelID:"1114271737710923816",value:"Message-I"},
    {Name:`Klavye Kahramanı`,Category:"Message",Point:200,Time:60000*60*5, Reward:300,ChannelID:"1114271737710923816",value:"Message-II"},
    {Name:`Chat Kahramanı`,Category:"Message",Point:300,Time:60000*60*8, Reward:500,ChannelID:"1114271737710923816",value:"Message-III"},

    {Name:`Talkative`,Category:"Voice",Point:60000*60*1, Reward:150,Time:60000*60*3,CategoryID:"1066294817878986785",value:"Voice-I"},
    {Name:`Mikrofon Canavarı`,Category:"Voice",Point:60000*60*3,Time:60000*60*5, Reward:300,CategoryID:"1066294817878986785",value:"Voice-II"},
    {Name:`Konuşkan Kahraman`,Category:"Voice",Point:60000*60*5,Time:60000*60*8, Reward:500,CategoryID:"1066294817878986785",value:"Voice-III"},

    {Name:`Yayın Ustaları`,Category:"Streamer",Point:60000*60*1,Time:60000*60*3,Reward:150,CategoryID:"",value:"Streamer-I"},
    {Name:`Yayın Gezginleri`,Category:"Streamer",Point:60000*60*3,Time:60000*60*5,Reward:300,CategoryID:"",value:"Streamer-II"},
    {Name:`Yayın Yıldızları`,Category:"Streamer",Point:60000*60*5,Time:60000*60*8,Reward:500,CategoryID:"",value:"Streamer-III"},

    {Name:`Görüntü Perileri`,Category:"C-Streamer",Point:60000*60*1,Time:60000*60*3,Reward:150,CategoryID:"",value:"C-Streamer-I"},
    {Name:`Kamera Titanları`,Category:"C-Streamer",Point:60000*60*3,Time:60000*60*5,Reward:300,CategoryID:"",value:"C-Streamer-II"},
    {Name:`Görsel Hayaletler`,Category:"C-Streamer",Point:60000*60*5,Time:60000*60*8,Reward:500,CategoryID:"",value:"C-Streamer-III"},

    {Name:`Bağlantı Muhafızları`,Category:"Invıte",Point:100,Time:60000*60*3, Reward:150,value:"Invite-I"},
    {Name:`Davet Elçisi`,Category:"Invıte",Point:200,Time:60000*60*5, Reward:300,value:"Invite-II"},
    {Name:`Link Büyücüsü`,Category:"Invıte",Point:300,Time:60000*60*8, Reward:500,value:"Invite-III"},

  ]
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class gorevsec extends Command {
    constructor(client) {
        super(client, {
            name: "gorev",
            description: "Bot ile mesaj göndermek için",
            usage: ".gorev-sec",
            category: "Mission",
            aliases: ["gorev-sec","gorev"],

            enabled: true,
            guildOwner:true,
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const aktiveTaskData = await aktiveTask.findOne({guildID:message.guild.id,userID:member.id})
if(aktiveTaskData){
    let approval = tasks.filter(x=> x.value === aktiveTaskData.value)[0]
    let description;
    if(approval.Category == "Message") description = `${message.guild.channels.cache.get(approval.ChannelID) ? message.guild.channels.cache.get(approval.ChannelID).name : "#Yok"} kanalına ${moment.duration(approval.Time).format("H [Saat]")} içinde ${approval.Point} adet mesaj gönder!`;
    else if (approval.Category == "Voice") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** sohbet et!`;
    else if (approval.Category == "Streamer") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** yayın yap!`;
    else if (approval.Category == "C-Streamer") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** kameranı aç!`;
    else if(approval.Category == "Invıte") description = `Sunucuya ${approval.Point} kişiyi kendi davet linkini kullanarak davet et!`;

message.channel.send({
    embeds:[
        new GenerateEmbed()
        .setAuthor({
            name:message.guild.name,
            iconURL:message.guild.iconURL({dynamic:true})
        })
        .setDescription(`"${aktiveTaskData.name}" isimli göreviniz detayları aşağıda verilmiştir.`)
        .addFields(
            {name:"Kategori",value:`**${aktiveTaskData.category}**`,inline:true},
            {name:"Süre",value:`**${moment.duration(aktiveTaskData.time).format("H [Saat]")} (${moment.duration(( aktiveTaskData.startTime - Date.now())).format("H [Saat] m [Dakika]")} kaldı.)**`,inline:true},
            {name:"Ödül",value:`🎁: ${aktiveTaskData.reward}🟢`,inline:true},
            {name:"Durum",value:`- [${aktiveTaskData ? aktiveTaskData.progress : 0}/${aktiveTaskData.Point}]\n${await progressBar(aktiveTaskData ? aktiveTaskData.progress : 0,aktiveTaskData.Point,10)} \`${calculatePercentage(aktiveTaskData ? aktiveTaskData.progress : 0,aktiveTaskData.Point)}%\``,inline:false},
            {name:"Görev",value:` \`\`\`${description}\`\`\` `,inline:false},
        )
    ]
})
}else{
var taskMenuOptions = [];
for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let emoji = task.Category == "Message" ? message.guild.findReaction(Metin,"ID") : task.Category == "Voice" ? message.guild.findReaction(Ses,"ID"):message.guild.findReaction(Elmas,"ID");
    let description;
    if(task.Category == "Message") description = `${message.guild.channels.cache.get(task.ChannelID) ? message.guild.channels.cache.get(task.ChannelID).name : "#Yok"} kanalına ${task.Point} adet mesaj gönder!`;
    else if (task.Category == "Voice") description = `${message.guild.channels.cache.get(task.CategoryID) ? message.guild.channels.cache.get(task.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında sohbet et!`;
    else if (task.Category == "Streamer") description = `${message.guild.channels.cache.get(task.CategoryID) ? message.guild.channels.cache.get(task.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(task.Time).format("H [Saat]")} içinde toplam **${moment.duration(task.Point).format("H [Saat]")}** yayın yap!`;
    else if (task.Category == "C-Streamer") description = `${message.guild.channels.cache.get(task.CategoryID) ? message.guild.channels.cache.get(task.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(task.Time).format("H [Saat]")} içinde toplam **${moment.duration(task.Point).format("H [Saat]")}** kameranı aç!`;
    else if(task.Category == "Invıte") description = `Sunucuya ${task.Point} kişiyi kendi davet linkini kullanarak davet et!`;

    taskMenuOptions.push({
        label:`${task.Name} (🎁: ${task.Reward}🟢)`,
        description:description,
        value:task.value,
        emoji:{id:emoji}
    });
}
var TaskData = await mission.findOne({guildID:message.guild.id,userID:member.id})
if(!TaskData) TaskData = {firstTask:undefined,firstBadgename:undefined,badges:[],failedMissions:[]};
message.channel.send({
    embeds:[
    new GenerateEmbed()
    .setThumbnail(member.user.avatarURL({dynamic:true}))
    .setColor("Red")
    .setDescription(`${member}`)
    .setFields(
        {name:"İlk Görev Tarihi",value:`${TaskData.firstTask != undefined ? `<t:${(TaskData.firstTask/1000).toFixed()}>`:"`Bulunamadı.`"}`,inline:true},
        {name:"İlk Rozeti",value:`${TaskData.firstBadgename != undefined ? `**${TaskData.firstBadgename} <t:${(TaskData.firstBadgedate/1000).toFixed()}> (<t:${(TaskData.firstBadgedate/1000).toFixed()}:R>)**`:"`Yok.`"}`,inline:true},
        {name:"Rozetleri",value:`**1,2,3**`,inline:true},
        {name:"Başarısız Görevleri",value:`**4,5,6**`,inline:true},
    )
    ],
    components:[
        new ActionRowBuilder()
        .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("tasks")
        .setPlaceholder("Görevler")
        .setOptions(taskMenuOptions)
        )
    ]
}).then(async msg => {
    var filter = (i) => i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({filter:filter});
    var mesaj;

    collector.on('collect',
    async (i) => {
    await i.deferUpdate();
    for (let app = 0; app < tasks.length; app++) {
        const approval = tasks[app];
    if(i.values[0] === approval.value){
        let description;
        if(approval.Category == "Message") description = `${message.guild.channels.cache.get(approval.ChannelID) ? message.guild.channels.cache.get(approval.ChannelID).name : "#Yok"} kanalına ${moment.duration(approval.Time).format("H [Saat]")} içinde ${approval.Point} adet mesaj gönder!`;
        else if (approval.Category == "Voice") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** sohbet et!`;
        else if (approval.Category == "Streamer") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** yayın yap!`;
        else if (approval.Category == "C-Streamer") description = `${message.guild.channels.cache.get(approval.CategoryID) ? message.guild.channels.cache.get(approval.CategoryID).name : "#Yok"} Kategorisi altında ki ses kanallarında ${moment.duration(approval.Time).format("H [Saat]")} içinde toplam **${moment.duration(approval.Point).format("H [Saat]")}** kameranı aç!`;
        else if(approval.Category == "Invıte") description = `Sunucuya ${approval.Point} kişiyi kendi davet linkini kullanarak davet et!`;
    
    if(!mesaj){ mesaj = await i.channel.send({
    content:`"${approval.Name}" Görevine ait detaylar aşağıda verilmiştir, ${member}`,
    embeds:[
        new GenerateEmbed()
        .setAuthor({
            name:message.guild.name,
            iconURL:message.guild.iconURL({dynamic:true})
        })
        .setColor("Green")
        .setTitle(approval.Name)
        .setDescription(`${description}`)
        .setFields(
            {name:"Ödül:",value:`${approval.Reward} Puan.`,inline:true},
            {name:"Kategori",value:`${approval.Category}`,inline:true},
            {name:"Süre",value:`${moment.duration(approval.Time).format("H [Saat]")}`,inline:true}
        )
    ],
    components:[
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder().setCustomId("önceki").setLabel("Önce ki Görev").setStyle(ButtonStyle.Secondary).setDisabled(true),
          new ButtonBuilder().setCustomId("evet").setLabel("Kabul Ediyorum.").setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId("sonraki").setLabel("Sonra ki Görev").setStyle(ButtonStyle.Secondary).setDisabled(true),
        )
    ]
    })
} else {
if(mesaj) await mesaj.edit({
    content:`"${approval.Name}" Görevine ait detaylar aşağıda verilmiştir, ${member}`,
    embeds:[
        new GenerateEmbed()
        .setAuthor({
            name:message.guild.name,
            iconURL:message.guild.iconURL({dynamic:true})
        })
        .setColor("Green")
        .setTitle(approval.Name)
        .setDescription(`${description}`)
        .setFields(
            {name:"Ödül:",value:`${approval.Reward} Puan.`,inline:true},
            {name:"Kategori",value:`${approval.Category}`,inline:true},
            {name:"Süre",value:`${moment.duration(approval.Time).format("H [Saat]")}`,inline:true}
        )
    ],
    components:[
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder().setCustomId("önceki").setLabel("Önce ki Görev").setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setCustomId("evet").setLabel("Kabul Ediyorum.").setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId("sonraki").setLabel("Sonra ki Görev").setStyle(ButtonStyle.Secondary),
        )
    ]
    })
}
let appcollector = mesaj.createMessageComponentCollector({filter:filter});
appcollector.on('collect',
    async (appro) => {
if(appro.customId === "evet"){
    let ID = approval.Category === "Message" ? approval.ChannelID : approval.Category === "Voice" ? approval.CategoryID : null;
    TaskData = await mission.findOne({guildID:message.guild.id,userID:member.id})
    if(!TaskData?.firstTask || TaskData?.firstTask == undefined) await mission.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{firstTask:Date.now()}},{upsert:true})
    await aktiveTask.findOneAndUpdate({userID:member.id,guildID:message.guild.id},{$set:{startTime:(Date.now() + approval.Time),category:approval.Category,time:approval.Time,reward:approval.Reward,ID:ID,value:approval.value,Point:approval.Point,name:approval.Name,}},{upsert:true})
    if(mesaj) await mesaj.delete();
    if(msg) await msg.edit({
     embeds:[
        new GenerateEmbed()
        .setAuthor({
            name:message.guild.name,
            iconURL:message.guild.iconURL({dynamic:true})
        })
        .setDescription(`${member}, Yeni görevin: **${approval.Name}**! Görev kategorisi **${approval.Category}**, tamamlama süresi **${moment.duration(approval.Time).format("H [Saat]")}** Ödülü ise **${approval.Reward} Puan**. Başarılar!`)
        .setFooter({text:"Görev Durumunu kontrol etmek için \".görev\" yazman yeterli olucaktır."})
     ],
     components:[]
    })
}
    })
}    
    }
    })
})
}}
}
module.exports = gorevsec;
function convertNumberTounicodeNumber(sayi) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
    if (basamakiki) {
      basamakbir = basamakbir.replace(/([0-9])/g, d => {
        return {
          '0':String.fromCharCode(8304),
          '1':String.fromCharCode(185),
          '2':String.fromCharCode(178),
          '3':String.fromCharCode(179),
          '4':String.fromCharCode(8308),
          '5':String.fromCharCode(8309),
          '6':String.fromCharCode(8310),
          '7':String.fromCharCode(8311),
          '8':String.fromCharCode(8312),
          '9':String.fromCharCode(8313),
        }
        [d];
      })
    }
    return basamakbir;
  
}
function calculatePercentage(pointsEarned, pointsNeeded) {
    const currentPoints = pointsEarned;
    const totalPoints = currentPoints + pointsNeeded;
    const percentage = (currentPoints / totalPoints) * 100;
    return  Math.floor(percentage);
   
  }