
const {AttachmentBuilder, EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock, StringSelectMenuBuilder} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const guard = require("../../../../Global/Database/Guard");
const guardPenalty = require("../../../../Global/Database/guardPenalty");
const rolePermissions = require("../../../../Global/Database/rolePermissions");
const {exec} = require("child_process");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Panel extends Command {
    constructor(client) {
        super(client, {
            name: "Panel",
            description: "Guard Kontrol Paneli",
            usage: ".panel",
            category: "Guard",
            aliases: ["panel","guard"],

            enabled: true,
            guildOwner:true,

            developer : true
        });
    }
   async onRequest (client, message, args,embed) {
const ayarbutonları = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder().setCustomId("sunucuayarkoruma").setLabel("Sunucu Ayar Koruması").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("rolkoruma").setLabel("Rol Koruması").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("kanalkoruma").setLabel("Kanal Koruması").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("bankickkoruma").setLabel("Ban/Kick Koruması").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("emojistickerskoruma").setLabel("Emoji/Stickers Koruması").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
) 
const ayaryedekleme = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder().setCustomId("yetkiac").setLabel("Yetkileri Aç/Kapat").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("urlspammer").setLabel("URL Spammer").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("kanalyedek").setLabel("Kanalları/Rolleri Yedekle").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("weboffline").setLabel("Web/Çevrimdışı Güvenlik").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setCustomId("database").setLabel("Yedekleme Aç/Kapat").setEmoji(await emojiBul("appEmoji_cark")).setStyle(ButtonStyle.Secondary),
) 
let tik = await emojiBul("appEmoji_tik");
let carpi = await emojiBul("appEmoji_carpi");
let guardEmoji = message.guild.emojis.cache.find(x=> x.name == "appEmoji_guard") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_guard") :"•"
const dataguard = await guard.findOne({guildID:message.guild.id})
const safedMembers = dataguard ? dataguard.SafedMembers : client.owners
var adminmenu = [];
const admins = await message.guild.members.cache.filter(member => !member.user.bot && member.permissions.has(PermissionsBitField.Flags.Administrator)).map(async x=> await adminmenu.push({label:`${x.user.tag}`,description:`Sunucuya katılım: ${tarihsel(x.joinedTimestamp)}`,value:`${x.id}`,emoji:{id: "1251457656053567589" }}))
const yoneticilermenusu = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId("yoneticiMenu")
.setPlaceholder("Yöneticiler")
.setOptions(adminmenu)
);
var guardData = await guard.findOne({guildID:message.guild.id})
var databaseOnly = guardData ? guardData.database : false
var serverGuardOnly = guardData ? guardData.serverGuard : false
var roleGuardOnly = guardData ? guardData.rolesGuard : false
var channelGuardOnly = guardData ? guardData.channelsGuard : false
var bankickGuardOnly = guardData ? guardData.banKickGuard : false
var emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
var urlSpammerOnly = guardData ? guardData.UrlSpammer : false
var webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
message.channel.send({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
${guardEmoji} Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
${guardEmoji} Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
${guardEmoji} Database verilerini tekrar yedekleyebilir,
${guardEmoji} Yetkileri açıp/kapatabilirsin.
${guardEmoji} URL Spammer ile Url'ni koruyabilirsin.
${codeBlock("md",
`# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
`)}
**[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi <@${message.guild.ownerId}>** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
`)],components:[ayarbutonları,ayaryedekleme,yoneticilermenusu]}).then(async msg =>{
  const filter = d => d.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
  collector.on('collect', async (interaction) => {
    await interaction.deferUpdate();
    if(interaction.customId == "weboffline"){
    webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    if(webandofflineOnly == true){
      await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{webAndofflineGuard:false}},{upsert:true})
      guardData = await guard.findOne({guildID:interaction.guild.id})
  databaseOnly = guardData ? guardData.database : false
  serverGuardOnly = guardData ? guardData.serverGuard : false
  roleGuardOnly = guardData ? guardData.rolesGuard : false
  channelGuardOnly = guardData ? guardData.channelsGuard : false
  bankickGuardOnly = guardData ? guardData.banKickGuard : false
  emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
  urlSpammerOnly = guardData ? guardData.UrlSpammer : false
  webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
      await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
      • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
      • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
      • Database verilerini tekrar yedekleyebilir,
      • Yetkileri açıp/kapatabilirsin
      • URL Spammer ile Url'ni koruyabilirsin.
      ${codeBlock("md",
      `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
      `)}
      **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
      `)]})
    }else{
      await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{webAndofflineGuard:true}},{upsert:true})
  
      guardData = await guard.findOne({guildID:interaction.guild.id})
  serverGuardOnly = guardData ? guardData.serverGuard : false
  roleGuardOnly = guardData ? guardData.rolesGuard : false
  channelGuardOnly = guardData ? guardData.channelsGuard : false
  bankickGuardOnly = guardData ? guardData.banKickGuard : false
  emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
  urlSpammerOnly = guardData ? guardData.UrlSpammer : false
  webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
  databaseOnly = guardData ? guardData.database : false
      await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
      • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
      • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
      • Database verilerini tekrar yedekleyebilir,
      • Yetkileri açıp/kapatabilirsin
      • URL Spammer ile Url'ni koruyabilirsin.
      ${codeBlock("md",
      `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
      `)}
      **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
      `)]})
    }
    }
    if(interaction.customId == "kanalyedek"){
      guardData = await guard.findOne({guildID:interaction.guild.id})
      databaseOnly = guardData ? guardData.database : false
      if(databaseOnly == true){
        await guildChannels(interaction.guild)
        await guildRoles(interaction.guild)
        await interaction.channel.send({content:`**Kanallar ve Roller Başarıyla Yedeklendi!**`,ephemeral:true})
      }
      else {
        await interaction.channel.send({content:`**Datebase Sistemi** kapalı olduğundan dolayı yedekleme işlemi yapılamaz.`,ephemeral:true})
      }
    }
    if(interaction.customId == "database"){
      databaseOnly = guardData ? guardData.database : false

  if(databaseOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{database:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
databaseOnly = guardData ? guardData.database : false
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{database:true}},{upsert:true})

    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
databaseOnly = guardData ? guardData.database : false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
    await guildRoles(interaction.guild)
    await guildChannels(interaction.guild)
    await interaction.channel.send({content:`**Roller ve Kanallar Yedeklendi!** \n\`Not: Tekrar Yedeklemek için "Kanalları Yedekle" & "Rolleri Yedekle" butonlarını kullanabilirsiniz.\``,ephemeral:true})

  }
    }
    if(interaction.customId == "sunucuayarkoruma"){
      serverGuardOnly = guardData ? guardData.serverGuard : false

  if(serverGuardOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{serverGuard:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
databaseOnly = guardData ? guardData.database : false

channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{serverGuard:true}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "rolkoruma"){
      roleGuardOnly = guardData ? guardData.rolesGuard : false

  if(roleGuardOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{rolesGuard:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{rolesGuard:true}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "kanalkoruma"){
      channelGuardOnly = guardData ? guardData.channelsGuard : false

  if(channelGuardOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{channelsGuard:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
databaseOnly = guardData ? guardData.database : false

channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{channelsGuard:true}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "bankickkoruma"){
      bankickGuardOnly = guardData ? guardData.banKickGuard : false

  if(bankickGuardOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{banKickGuard:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{banKickGuard:true}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "emojistickerskoruma"){
      emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false

  if(emojistickerGuardOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{emojiStickersGuard:false}},{upsert:true})
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
databaseOnly = guardData ? guardData.database : false

roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{emojiStickersGuard:true}},{upsert:true})

    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "urlspammer"){
      if(!message.guild.vanityURLCode || message.guild.vanityURLCode == null) return interaction.channel.send({content:`Özel URL'ye sahip olmadığınız için bu sistemi kullanamazsınız.`})
      urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false

  if(urlSpammerOnly == true){
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{UrlSpammer:false}},{upsert:true})
    exec('pm2 stop ../UrlSpammer/approval.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Bir hata oluştu: ${error}`);
        return;
      }
      
      console.log(`Çıktı: ${stdout}`);
      console.error(`Hata: ${stderr}`);
    });    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
databaseOnly = guardData ? guardData.database : false

roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }else{
    await guard.findOneAndUpdate({guildID:interaction.guild.id},{$set:{UrlSpammer:true}},{upsert:true})
    exec('pm2 start ../UrlSpammer/temeriaURL.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Bir hata oluştu: ${error}`);
        return;
      }
      
      console.log(`Çıktı: ${stdout}`);
      console.error(`Hata: ${stderr}`);
    });
    guardData = await guard.findOne({guildID:interaction.guild.id})
serverGuardOnly = guardData ? guardData.serverGuard : false
roleGuardOnly = guardData ? guardData.rolesGuard : false
channelGuardOnly = guardData ? guardData.channelsGuard : false
bankickGuardOnly = guardData ? guardData.banKickGuard : false
emojistickerGuardOnly = guardData ? guardData.emojiStickersGuard : false
urlSpammerOnly = guardData ? guardData.UrlSpammer : false
webandofflineOnly = guardData ? guardData.webAndofflineGuard :false
    await msg.edit({embeds:[new GenerateEmbed().setDescription(`Merhaba ${message.member} Guard Yönetim ve Kontrol Paneline Hoşgeldin,
    • Aşağıda bulunan butonlardan korumaları açıp/kapatabilir,
    • Menüden bulunan yöneticileri Güvenliye ekleyebilir/çıkarabilir,
    • Database verilerini tekrar yedekleyebilir,
    • Yetkileri açıp/kapatabilirsin
    • URL Spammer ile Url'ni koruyabilirsin.
    ${codeBlock("md",
    `# Sunucu Koruma Paneli
${databaseOnly == true ? "< Database                 : Açık 🟢":"> Database                 : Kapalı 🔴"}
${urlSpammerOnly == true ? "< URL Spammer              : Açık 🟢":"> URL Spammer              : Kapalı 🔴"}
${roleGuardOnly == true ? "< Rol Koruması             : Açık 🟢":"> Rol Koruması             : Kapalı 🔴"}
${channelGuardOnly == true ? "< Kanal Koruması           : Açık 🟢":"> Kanal Koruması           : Kapalı 🔴"}
${serverGuardOnly == true ? "< Sunucu Koruması          : Açık 🟢":"> Sunucu Koruması          : Kapalı 🔴"}
${bankickGuardOnly == true ? "< Ban ve Kick Koruması     : Açık 🟢":"> Ban ve Kick Koruması     : Kapalı 🔴"}
${emojistickerGuardOnly == true ? "< Emoji ve Sticker Koruması: Açık 🟢":"> Emoji ve Sticker Koruması: Kapalı 🔴"}
${webandofflineOnly == true ? "< Web/Çevrimdışı Koruması  : Açık 🟢":"> Web/Çevrimdışı Koruması  : Kapalı 🔴"}
    `)}
    **[Unutma]** \`Not:\` __Bu panele sadece__ **Taç Sahibi** __ ve ${client.owners.map(x=> `<@${x}>`).join(", ")} erişebilir ve kullanabilir.__
    `)]})
  }
    }
    if(interaction.customId == "yetkiac"){
    interaction.channel.send({embeds:[
      new GenerateEmbed()
      .setDescription(`Sunucuda bulunan rollerde ki yetkileri açmak veya kapatmak için aşağıda ki butonları kullanınız!`)
    ],
  components:[
    new ActionRowBuilder()
    .setComponents(
      new ButtonBuilder().setCustomId("ac").setLabel("Yetkileri Aç").setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId("kapat").setLabel("Yetkileri Kapat").setStyle(ButtonStyle.Success)
    )
  ]})
  .then(async ytMSG=>{
    const filter = d => d.user.id == message.member.id 
  const collector = ytMSG.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
  collector.on('collect', async (ytInteraction) => {
  await ytInteraction.deferUpdate();
if(ytInteraction.customId == "ac"){
let rolepData = await rolePermissions.find();
if(!rolepData || rolepData.length == 0) return ytInteraction.channel.send({content:`Veri bulunamadı!`});
rolepData.forEach(async data =>{
let role = ytInteraction.guild.roles.cache.get(data.roleID);
if(!role) return;
if(!role.editable) return;
role.setPermissions(new PermissionsBitField(data.BitField))
ytInteraction.channel.send({embeds:[
  new GenerateEmbed().setDescription(`\`${role.name}\` isimli role **${data.BitField}** yetkisi verildi!`)
]})
await guardPenalty.findOneAndUpdate({guildID:message.guild.id,OrusbuEvladı:message.member.id},{$push:{işlemler:{Güvenilir:safedMembers.some(id => id == message.member.id),işlem:`${role.name} ${data.BitField} ✅`,Tarih:Date.now()}}},{upsert:true})
await rolePermissions.findOneAndDelete({roleID:role.id},{upsert:true})
})

}
if(ytInteraction.customId == "kapat"){
  let roles =   ytInteraction.guild.roles.cache.filter(r => r.editable && (r.permissions.has(PermissionsBitField.Flags.Administrator)))
  if(roles.size == 0) return   ytInteraction.channel.send({embeds:[
    new GenerateEmbed()
    .setDescription(`Sunucuda yetkisi kapatılıcak rol bulunamadı veya yetersiz yetkim bulunuyor.`)
  ]})
  ytInteraction.guild.roles.cache.filter(r => r.editable && (r.permissions.has(PermissionsBitField.Flags.Administrator))).forEach(async r => {
    await rolePermissions.findOneAndUpdate({roleID:r.id},{$set:{BitField:r.permissions.bitfield}},{upsert:true})
    await r.setPermissions(PermissionsBitField.Flags.SendMessages);
  });
  ytInteraction.channel.send({embeds:[
    new GenerateEmbed()
    .setDescription(`Aşağıdaki rollerin yetkileri kapatılmıştır.`)
    .setFields({name:`Roller \`(${roles.size})\``,value:`${roles.map(x=> `\`${x.rawPosition}.\` **> ${x.name} [~~${x.permissions.bitfield}~~]**`).join("\n")}`})
  ]})
  await guardPenalty.findOneAndUpdate({guildID:message.guild.id,OrusbuEvladı:message.member.id},{$push:{işlemler:{Güvenilir:safedMembers.some(id => id == message.member.id),işlem:`${role.name} ${data.BitField} ❌`,Tarih:Date.now()}}},{upsert:true})

}
  })
  })
    }
  for (let index = 0; index < adminmenu.length; index++) {
    const element = adminmenu[index];
    if(interaction.values && interaction.values[0] == element.value){
      let admin = interaction.guild.members.cache.get(element.value)
      let guardp = await guardPenalty.findOne({OrusbuEvladı:admin.id});
      let guardsicil = guardp ? guardp.işlemler : [];
let adminembed = new GenerateEmbed().setAuthor({name:admin.user.tag,iconURL:admin.user.avatarURL()})
      .setDescription(`<t:${(admin.joinedTimestamp/1000).toFixed()}> Tarihinden beri sunucuda bulunuyor.`)
        .addFields({name:`👤 Kullanıcı Bilgisi`,value:`
\`•\` ID: \`${admin.id}\`
\`•\` Profil: ${admin}`,inline:true})
      if(guardsicil.length > 0){
      new GenerateEmbed().addFields({name:"Son 10 İşlemi",value:`**${guardsicil.sort((a,b)=> b.Tarih -a.Tarih).map(x=> `[${x.Güvenilir == true ? "✅" : "❌"} | <t:${(x.Tarih/1000).toFixed()}>] ${x.işlem} `).splice(0,10).join("\n")}**`})
      }

      interaction.channel.send({embeds:[
        adminembed
      ]})
    }
  }

  })
})
   }
  }
module.exports = Panel
/*  */
