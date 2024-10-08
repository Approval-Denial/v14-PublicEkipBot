
const { TextInputBuilder,TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder, StringSelectMenuBuilder ,EmbedBuilder,codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const User = require("../../../../Global/Database/Users")
const GuildLevelSystem  = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageUserChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceUserChannel = require("../../../../Global/Database/Stats/Voice/voiceUserChannel")
const joinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt")
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild");
const voiceGuild = require("../../../../Global/Database/Stats/Voice/voiceGuild");
const { DiscordBanners } = require('discord-banners');
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
class Kisayollar extends Command {
    constructor(client) {
        super(client, {
            name: "Kısayollar",
            description: "Kısayol menüsünü oluşturur!",
            usage: ".kısayol",
            category: "Luhux",
            aliases: ["kısayol","kısayollar"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    
async onLoad(client) {
client.on("interactionCreate", async (interaction)=>{
const menu = interaction.customId
const member =await interaction.guild.members.cache.get(interaction.user.id);
if(menu === "serverJoin"){
await interaction.reply({content:`**Sunucuya <t:${(member.joinedTimestamp/1000).toFixed()}> tarihinde yani <t:${(member.joinedTimestamp/1000).toFixed()}:R> katılmışsın.**\n**Hesabını <t:${(member.user.createdTimestamp/1000).toFixed()}> tarihinde yani <t:${(member.user.createdTimestamp/1000).toFixed()}:R> oluşturmuşsun.**`,ephemeral:true})
}
if(menu === "discordJoin"){
await interaction.reply({content:`**Hesabını <t:${(member.user.createdTimestamp/1000).toFixed()}> tarihinde yani <t:${(member.user.createdTimestamp/1000).toFixed()}:R> oluşturmuşsun.**`,ephemeral:true})
}
if(menu === "levelInfo"){
    const guildlevelsystem = await GuildLevelSystem.findOne({guildID:interaction.guild.id});
    let lvlsystem = guildlevelsystem ? guildlevelsystem.levelSystem : false;
if(lvlsystem === true){
    let authorData = await User.findOne({ guildID: interaction.guild.id, userID: member.id });
    let xp = authorData ? authorData.xp : 1
    let lvl = authorData ? authorData.lvl : 1
    let xpToLvl = authorData ? authorData.xpToLvl : 100   
await interaction.reply({content:`**Mevcut seviyen \`${lvl}\` bir sonra ki seviyeye ulaşmak için \`${xpToLvl-xp}\` __XP__ kazanman gerekiyor.**`,ephemeral:true})
}else return interaction.reply({content:`\`Level Sistemi Kapalı!\``,ephemeral:true})
}
if(menu === "messageStat"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem === true) {
    const memberMessageData = await messageUserChannel.find({ guildID: interaction.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop = memberMessageData.length > 0 ? memberMessageData.splice(0, 10).filter(x => interaction.guild.channels.cache.has(x.channelID)).map((x,index) => `\`${index + 1}.\`<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."
    const messageData = await messageUser.findOne({ guildID: interaction.guild.id, userID: member.id });
await interaction.reply({content:`**Toplamda ${messageData ? messageData.totalStat : 0} mesajın bulunuyor.

\`•\` __Aylık:__ ${messageData ? messageData.twoWeeklyStat : 0}
\`•\` __Haftalık:__ ${messageData ? messageData.weeklyStat : 0}
\`•\` __Günlük:__ ${messageData ? messageData.dailyStat : 0}

\`➡\` Top 10 Metin Kanalları:
${messageTop}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})

}
if(menu === "voiceStat"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem === true) {
        const memberVoiceData = await voiceUserChannel.find({ guildID: interaction.guild.id, userID: member.id }).sort({ channelData: -1 });
    
        let voiceTop = memberVoiceData.length > 0 ? memberVoiceData.splice(0, 10).filter(x => interaction.guild.channels.cache.has(x.channelID)).map((x,index) => `\`${index + 1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."
    
        const voiceData = await voiceUser.findOne({ guildID: interaction.guild.id, userID: member.id });
       let joinedAtData = await joinedAt.findOne({ userID: member.id });
       var a = 0;if(joinedAtData){ a = Date.now() - joinedAtData.date;};
interaction.reply({content:`**Ses kanallarında ${moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]")} vakit geçirmişsin!

\`•\` __Aylık:__ ${moment.duration(voiceData ? voiceData.twoWeeklyStat+a : 0).format("H [Saat], m [dakika]")}
\`•\` __Haftalık:__ ${moment.duration(voiceData ? voiceData.weeklyStat+a : 0).format("H [Saat], m [dakika]")}
\`•\` __Günlük:__ ${moment.duration(voiceData ? voiceData.dailyStat+a : 0).format("H [Saat], m [dakika]")}

\`➡\` Top 10 Ses Kanalları:
${voiceTop}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu === "top10Voice"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem === true) {
        const messageUsersData = await messageUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const voiceUsersData = await voiceUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildID: interaction.guild.id });
        const voiceGuildData = await voiceGuild.findOne({ guildID: interaction.guild.id });
       const messageUsers = messageUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
        const voiceUsers = voiceUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\``).join(`\n`);
        const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
        const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
interaction.reply({content:`**Sunucuda ${moment.duration(voiceGuildData ? voiceGuildData.totalStat : 0).format("H [saat], m [dakika]")} ses istatistiği bulunuyor!

\`➡\` __Top 10 Ses İstatistiği:__
${ses}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu === "top10Message"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem === true) {
        const messageUsersData = await messageUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildID: interaction.guild.id });
       const messageUsers = messageUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
        const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
interaction.reply({content:`**Sunucuda ${moment.duration(messageGuildData ? messageGuildData.totalStat : 0).format("H [saat], m [dakika]")} mesaj gönderilmiş.

\`➡\` __Top 10 Mesaj İstatistiği:__
${mesaj}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu === "roleInfo"){
let rolsayısı = member.roles.cache.size;
let a =0
let roller = member.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != interaction.guild.id).map((x)=>  `\`${x.rawPosition}.\` ${x}`).join("\n");
let üstrolü = member.roles.highest;
interaction.reply({content:`**Üstünde \`${rolsayısı}\` adet rol bulunuyor.

\`•\` Ayırıcı Rolün: ${üstrolü}
\`➡\` Rollerin:
${roller}**`,ephemeral:true})
}
if(menu === "avatar"){
const avatar = member.user.avatar ? member.user.avatarURL({dynamic:true}) : null
if(avatar === null){
interaction.reply({content:`**Profil resminiz bulunamadı!**`,ephemeral:true})
}
else{
    let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url:avatar})]})
    await interaction.reply({
      content: `${avatar}`,
      components:[link],
      ephemeral:true
    })}
}
if(menu === "banner2"){
    if(interaction.member.manageable && interaction.member.roles.cache.has(roles.boosterRole)) {
        const booster = new ModalBuilder()
        .setCustomId('booster31')
        .setTitle('Booster İsim');
    const sika = new TextInputBuilder()
        .setCustomId('soru1')
        .setLabel("İsminizi Girin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(50)
        .setRequired(true);
        let row = new ActionRowBuilder().addComponents(sika);
        booster.addComponents(row);
        await interaction.showModal(booster)
  } else return interaction.reply({content:"Booster olmanız gerek", ephemeral:true })
   
}
if(menu === "boosterColor"){
    await interaction.deferReply({ ephemeral: true });
    const response = await fetch(`https://api.vante.dev/users/${interaction?.user?.id}/names/luppuxsexpanel`);
            if (!response.ok) {
              return;
            }
            const responseData = await response.json();
          
            if (!Array.isArray(responseData)) {
            await interaction.editReply({ content: "Veri bulunamadı." });
            return;
            }
            let metin = `Sunuculardaki İsim Verilen Şu Şekilde;\n\n`.underline.green.bold;
            metin += responseData.map((data, i) => {
              return `${`${i + 1}`.cyan.bold}). ${`${data.serverName}`.blue.bold}\nİsim; ${`${data.name}`.white.bold}\nYaş; ${`${data.age}`.white.bold}\nCinsiyet; ${`${data.sex == "Male" ? "Erkek" : data.sex == "Female" ? "Kız" : "Unisex"}`.white.bold}\n\n`;
            }).join("\n");
          
       
          
            await interaction.editReply({ embeds:[new GenerateEmbed().setDescription(`${codeBlock("ansi",metin)}`)] });
          }


if(interaction.customId === "boosterColorRolesMenu"){
    if(!member.roles.cache.has("1250816950926573569") && !member.roles.cache.has("1250866663520211045")) return interaction.reply({content:"Renk rollerini almak için sunucuya takviye yapmanız gerekmektedir.", ephemeral: true})
        let renkroller = [
        "1252212741142347878","1252212744774746112","1252220718452834384","1252220754251223040","1252220799738187787","1252220601276305430","1252220689444769832","1252220652954320966","1252220563364122705","1252760965703925862","1252761028908023828","1252742574926467082" 
    
      ]
    for (let num = 0; num < renkroller.length; num++) {
    const renkID = renkroller[num];
    if(interaction.values[0] === renkID){
    interaction.member.roles.remove(interaction.member.roles.cache.filter(role => renkroller.some(renk => role.id == renk)).map(x=> x.id))
    setTimeout(() => {
        interaction.member.roles.add(renkID);
        interaction.reply({content:`<@${renkID}> rolün üzerine verildi!`,components:[],ephemeral:true})
    }, 1000);
    }
}
}
})  
client.on("interactionCreate", async (i) => {
    let menu = i.customId
    if(menu == "istekoneri"){
      const istmodal = new ModalBuilder()
          .setCustomId('istekModal')
          .setTitle('Yetk Başvuru');
      const sika2 = new TextInputBuilder()
          .setCustomId('soru1')
          .setLabel("Bir İstek & Öneri Belirtin")
          .setPlaceholder("Örn; Oyun Kanalları Açılsın")
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(5)
          .setMaxLength(50)
          .setRequired(true);
          let row2 = new ActionRowBuilder().addComponents(sika2);
          istmodal.addComponents(row2);
          await i.showModal(istmodal)  
  }
  if(menu == "şikayet"){
      const sikamodal = new ModalBuilder()
      .setCustomId('sikayetModal')
      .setTitle('Şikayet Sistemi');
  const sika = new TextInputBuilder()
      .setCustomId('soru1')
      .setLabel("Bir Şikayet Belirtin")
      .setPlaceholder("Sunucu hakkında şikayetiniz")
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(2)
      .setMaxLength(50)
      .setRequired(true);
      let row = new ActionRowBuilder().addComponents(sika);
      sikamodal.addComponents(row);
      await i.showModal(sikamodal)
  }
  if(menu == "başvuru"){
    const modal = new ModalBuilder()
    .setCustomId('başvuruabim')
    .setTitle(`${client.user.username} - Yetkili Başvuru`)
    .addComponents(
    new ActionRowBuilder()
    .addComponents(new TextInputBuilder().setCustomId('isim-yas').setLabel("İsim & Yaş").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder()
    .addComponents(new TextInputBuilder().setCustomId('baskayerdesponsor').setLabel("Daha önce başka yerde yetkili oldun mu?").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder()
    .addComponents(new TextInputBuilder().setCustomId('nelerverebilir').setLabel("Bize neler katabilirsin?").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder()
    .addComponents(new TextInputBuilder().setCustomId('kaccekilis').setLabel("Günde Ne kadar aktif olabilirsin?").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder()
    .addComponents(new TextInputBuilder().setCustomId('karsilik').setLabel("Neden burada yetkili olmalısınız?").setStyle(TextInputStyle.Short).setRequired(true)),
    );

await i.showModal(modal);
  }


})
}

 async onRequest (client, message, args,embed) {
    let oynat = await emojiBul("appEmoji_oynat")
    let ünlem = await emojiBul("appEmoji_unlem")
const menu = new ActionRowBuilder()
.addComponents(
await new StringSelectMenuBuilder()
.setCustomId("kisayollar")
.setOptions([
    {label:"Renk Seç",description:"Sadece Boostera Özel!",value:"boosterColor",emoji:{id:oynat}},
{label:`Sunucuya Katılım`,description:`Sunucuya katılım tarihini öğrenirsin.`,value:`serverJoin`,emoji:{id:oynat}},
{label:`Hesap Oluşturma`,description:`Hesap oluşturma tarihini öğrenirsin.`,value:`discordJoin`,emoji:{id:oynat}},
{label:`Level Bilgi`,description:`Mevcut seviyen hakkında bilgi.`,value:`levelInfo`,emoji:{id:oynat}},
{label:`İstatistik (Mesaj)`,description:`Sunucuda ki mesaj istatistiklerini öğrenirsin.`,value:`messageStat`,emoji:{id:oynat}},
{label:`İstatistik (Ses)`,description:`Sunucuda ki ses istatistiklerini öğrenirsin.`,value:`voiceStat`,emoji:{id:oynat}},
{label:`Top 10 (Ses)`,description:`Sunucuda ki top 10 ses sıralaması.`,value:`top10Voice`,emoji:{id:oynat}},
{label:`Top 10 (Mesaj)`,description:`Sunucuda ki top 10 mesaj sıralaması.`,value:`top10Message`,emoji:{id:oynat}},
{label:`Rollerim`,description:`Üstünde bulunan rollerim tam listesi.`,value:`roleInfo`,emoji:{id:oynat}},
{label:`Avatarım`,description:`Profil resmini alabilirsin`,value:`avatar`,emoji:{id:oynat}},
{label:`Afişim`,description:`Afişin (Bannerın)ı alabilirsin.`,value:`banner`,emoji:{id:oynat}},
])
)
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("başvuru").setLabel("🛡️").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("istekoneri").setLabel("📨").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("şikayet").setLabel("⚠️").setStyle(ButtonStyle.Danger)
        )
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("serverJoin").setLabel("1️⃣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("levelInfo").setLabel("2️⃣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("messageStat").setLabel("3️⃣").setStyle(ButtonStyle.Secondary),
            )
        const row2 = new ActionRowBuilder().addComponents(
        
            new ButtonBuilder().setCustomId("voiceStat").setLabel("4️⃣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("top10Voice").setLabel("5️⃣").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("top10Message").setLabel("6️⃣").setStyle(ButtonStyle.Secondary),
            )
            const row3 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("boosterColorRolesMenu").setLabel("7️⃣").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("roleInfo").setLabel("8️⃣").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("banner2").setLabel("9️⃣").setStyle(ButtonStyle.Secondary),
                )

message.channel.send({content:`
\` 1 \` Sunucuya giriş tarihinizi öğrenin.
\` 2 \` Sunucuda ki level bilginiz.
\` 3 \` Sunucuda ki mesaj istatistiklerinizi gösterir.

\` 4 \` Sunucuda ki ses istatistiklerinizi gösterir.
\` 5 \` Sunucuda ki ses sıralaması.
\` 6 \` Sunucuda ki mesaj sıralaması.

\` 7 \` Tüm sunucularda ki isim verilerinizi gösterir
\` 8 \` Sunucuda ki rollerinizi gösterir.
\` 9 \` İsim değiştirme (Sadece booster).

• \`🛡️\`: Yetkili başvuru formu oluşturur.
• \`📨\`: İstek/Öneri mesajı gönderebilirsiniz
• \`⚠️\`: Şikayetinizi gönderebilirsiniz

`,components:[row1,row2,row3,row]})

}
}
module.exports = Kisayollar;