
const { EmbedBuilder, PermissionsBitField, InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const { Guild } = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const { general: { Tik, Cross, Time, Elmas, Yayın, Kamera, Ses, Metin, Sagok, Solok, Cop, Category, Warning, Woman, Man, Kup, Bir, İki, Uc, Dört, Beş, Alti, Yedi, Sekiz, Dokuz, Sıfır, Bot, Oynat, Davet, Coin, Kalp, Kiraz, Patlican, Web, Bilgisayar, Telefon, Slot, Level, Guard, OrtaBosBarGri, OrtaDoluBarYeşil, BaslangicBosBarGri, BaslangicDoluBarYeşil, SonBosBarGri, SonDoluBarYeşil, Oluştur, Düzenle, Ekle, Çıkar, Görünmez, Gorunur, KilitAçık, KilitKapalı } } = require("../../../../Global/Config/emojis")
class roleSelect extends Command {
  constructor(client) {
    super(client, {
      name: "roleSelect",
      description: "Rol Seçme Panelini Oluşturur",
      usage: ".roleselect",
      category: "Approval",
      aliases: ["rs"],

      guildOwner: true,
      developer: true
    });
  }


  async onLoad(client) {
    client.on("interactionCreate", async (i) => {
      const guild = client.guilds.cache.get(Guild.ID)
      let menu = i.customId
      const member = guild.members.cache.get(i.member.id)
      if (!member) return;
      if (menu === "burcrolleri") {
        let burcrolleri = []
        let burcroller = [
          "1252407387638464552", "1252407395016114186", "1252408328181514352", "1252407391203496008",
          "1252408321835536466", "1252408257960607895", "1252408261647536138", "1252408264889602060",
          "1252408325086122016", "1252408318232629281", "1252408309756203018", "1252408315590475867",
        ]
        burcroller.forEach(x=> burcrolleri.push([x,x]))
        let yeto = new Map(burcrolleri)
          var rols = []
          for (let index = 0; index < i.values.length; index++) {
              let ids = i.values[index]
              let den = yeto.get(ids)
              rols.push(den)
            }
          if (i.values[0] === "rolsil") {
           member.roles.remove(burcroller)
            return i.reply({content:"Başarılı bir şekilde roller üzerinizden kaldırıldı.", ephemeral:true})
  
          } 
            if (!i.values.length) {
               member.roles.remove(burcroller)
              return i.reply({content:"Başarılı bir şekilde seçtiğiniz roller üzerinizden kaldırıldı.", ephemeral:true})
        
            } else {
               member.roles.remove(burcroller)
               setTimeout(async() => {await member.roles.add(rols)}, 1000);
            }
            i.reply({ content: "Başarılı bir şekilde seçtiğiniz roleriniz üzerine verildi.", ephemeral: true })
             
      }
      if (menu === "renkrolleri") {
        if(!member.roles.cache.has("1250816950926573569") && !member.roles.cache.has("1250866663520211045")) return i.reply({content:"Renk rollerini almak için sunucuya takviye yapmanız gerekmektedir.", ephemeral:true})
        let burcrolleri = []
        let burcroller = [
          "1252212741142347878","1252212744774746112","1252220718452834384","1252220754251223040","1252220799738187787","1252220601276305430","1252220689444769832","1252220652954320966","1252220563364122705","1252760965703925862","1252761028908023828","1252742574926467082" 
      
        ]
        burcroller.forEach(x=> burcrolleri.push([x,x]))
        let yeto = new Map(burcrolleri)
          var rols = []
          for (let index = 0; index < i.values.length; index++) {
              let ids = i.values[index]
              let den = yeto.get(ids)
              rols.push(den)
            }
          if (i.values[0] === "rolsil") {
           member.roles.remove(burcroller)
            return i.reply({content:"Başarılı bir şekilde roller üzerinizden kaldırıldı.", ephemeral:true})
  
          } 
            if (!i.values.length) {
               member.roles.remove(burcroller)
              return i.reply({content:"Başarılı bir şekilde seçtiğiniz roller üzerinizden kaldırıldı.", ephemeral:true})
        
            } else {
               member.roles.remove(burcroller)
               setTimeout(async() => {await member.roles.add(rols)}, 1000);
            }
            i.reply({ content: "Başarılı bir şekilde seçtiğiniz roleriniz üzerine verildi.", ephemeral: true })
             
      }
      if (menu === "sevgilirolleri") {
        let burcrolleri = []
        let burcroller = [
          "1252410117857480735", "1252410170839928882", "1252410165748174910", "1252739829674807378", "1252740021644165232"
        ]
        burcroller.forEach(x=> burcrolleri.push([x,x]))
        let yeto = new Map(burcrolleri)
          var rols = []
          for (let index = 0; index < i.values.length; index++) {
              let ids = i.values[index]
              let den = yeto.get(ids)
              rols.push(den)
            }
          if (i.values[0] === "rolsil") {
           member.roles.remove(burcroller)
            return i.reply({content:"Başarılı bir şekilde roller üzerinizden kaldırıldı.", ephemeral:true})
  
          } 
            if (!i.values.length) {
               member.roles.remove(burcroller)
              return i.reply({content:"Başarılı bir şekilde seçtiğiniz roller üzerinizden kaldırıldı.", ephemeral:true})
        
            } else {
               member.roles.remove(burcroller)
               setTimeout(async() => {await member.roles.add(rols)}, 1000);
            }
            i.reply({ content: "Başarılı bir şekilde seçtiğiniz roleriniz üzerine verildi.", ephemeral: true })
             
      }
      if (menu === "oyunRolleri") {
        var oyunroller = [];
        let oyunrolleri =[
          "1252416226274050191", "1252410905078272021", "1252410589435658310", "1252410910220226640", "1252410578899701843", "1252410582808920094", "1252410539074654268", "1252410583656169554", "1252416112642101330", "1252410914037170268", "1252416164630499431", "1252410575334670397"
        ]
        oyunrolleri.forEach(x=> oyunroller.push([x,x]) )
        let yeto = new Map(oyunroller)
          if (i.values[0] === "rolsil") {
           member.roles.remove(oyunrolleri)
            return i.reply({content:"Başarılı bir şekilde oyun rolleri üzerinizden kaldırıldı.", ephemeral:true})
  
          } 
          var rols = []
          for (let index = 0; index < i.values.length; index++) {
              let ids = i.values[index]
              let den = yeto.get(ids)
              rols.push(den)
            }
            if (!i.values.length) {
               member.roles.remove(rols)
              return i.reply({content:"Başarılı bir şekilde seçtiğiniz oyun roller üzerinizden kaldırıldı.", ephemeral:true})
        
            } else {
               member.roles.remove(rols)
               member.roles.add(rols)
            }
            rols = [];
            i.reply({ content: "Başarılı bir şekilde seçtiğiniz oyun rolleriniz üzerine verildi.", ephemeral: true })
             
      } 
      if (menu === "takımrolleri") {
        var oyunroller = [];
        let oyunrolleri =[
          "1252742194939428967", "1252740412955820123", "1252742279786008707", "1252742207811883008"
        ]
        oyunrolleri.forEach(x=> oyunroller.push([x,x]) )
        let yeto = new Map(oyunroller)
          if (i.values[0] === "rolsil") {
           member.roles.remove(oyunrolleri)
            return i.reply({content:"Başarılı bir şekilde oyun rolleri üzerinizden kaldırıldı.", ephemeral:true})
  
          } 
          var rols = []
          for (let index = 0; index < i.values.length; index++) {
              let ids = i.values[index]
              let den = yeto.get(ids)
              rols.push(den)
            }
            if (!i.values.length) {
               member.roles.remove(rols)
              return i.reply({content:"Başarılı bir şekilde seçtiğiniz oyun roller üzerinizden kaldırıldı.", ephemeral:true})
        
            } else {
               member.roles.remove(rols)
               member.roles.add(rols)
            }
            rols = [];
            i.reply({ content: "Başarılı bir şekilde seçtiğiniz oyun rolleriniz üzerine verildi.", ephemeral: true })
             
      } 
      if (menu == "cekilis") {
        if (member.roles.cache.has("1252415804172144773")) {
          await member.roles.remove("1252415804172144773")
          i.reply({ content: `<@&1252415804172144773> rolü üzerinden alındı!`, ephemeral: true })
        } else {
          await member.roles.add("1252415804172144773")
          i.reply({ content: `<@&1252415804172144773> rolü üzerine verildi!`, ephemeral: true })
        }
      }
      if (menu == "etkinlik") {
        if (member.roles.cache.has("1252415799327457394")) {
          await member.roles.remove("1252415799327457394")
          i.reply({ content: `<@&1252415799327457394> rolü üzerinden alındı!`, ephemeral: true })
        } else {
          await member.roles.add("1252415799327457394 ")
          i.reply({ content: `<@&1252415799327457394> rolü üzerine verildi!`, ephemeral: true })
        }
      }

    })
  }

  async onRequest(client, message, args, embed) {

    let ec = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("etkinlik").setLabel("Etkinlik Katılımcısı").setEmoji("🎉").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("cekilis").setLabel("Çekiliş Katılımcısı").setEmoji("🎁").setStyle(ButtonStyle.Secondary),
    )
    message.channel.send({
      content: `Merhaba \`${client.user.username}\` üyeleri,
  
Sunucuda sizi rahatsız etmemek için \`@everyone & @here\` atılmıcaktır.
Sunucuda olucak **Çekiliş** ve **Etkinlik**lerden anında haberdar olmak için aşağıda bulunan butonlardan gerekli rolleri alabilirsiniz.

\` | \` \`Çekiliş Katılımcısı 🎁:\` Çekilişlerden anında haberdar olmak için **tıklayın.**

\` | \` \`Etkinlik Katılımcısı 🎉:\` Etkinliklerden anında haberdar olmak için **tıklayın.**

`, components: [ec]
    })
      let iliski = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("lovers").setLabel("Lovers").setEmoji("💞").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("alone").setLabel("Alone").setEmoji("💔").setStyle(ButtonStyle.Secondary),
      )
      message.channel.send({content:"Aşşağıda ki butonlar ile ilişki rollerini üzerinize alabilirsiniz.",components:[iliski]})
    
      let oyunrolleri =[
        "1252416226274050191", "1252410905078272021", "1252410589435658310", "1252410910220226640", "1252410578899701843", "1252410582808920094", "1252410539074654268", "1252410583656169554", "1252416112642101330", "1252410914037170268", "1252416164630499431", "1252410575334670397"
      ]
       let oyunrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
       oyunrolleri.forEach(async x => {oyunrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
       let oyunrollerimenusu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("oyunRolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(3).setOptions(oyunrollerisecenegi))
       message.channel.send({components:[oyunrollerimenusu], content:`- Aşağıda bulunan menüden üzerinize istediğiniz oyun rollerinden alabilirsiniz.`})
      
   
      let takımrolleri =[
        "1252742194939428967", "1252740412955820123", "1252742279786008707", "1252742207811883008"
      ]
      let takımrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
      takımrolleri.forEach(async x => {takımrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
    let takımrollerimenusu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("takımrolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(takımrollerisecenegi))
    message.channel.send({components:[takımrollerimenusu], content:`- Aşağıda bulunan menüden üzerinize istediğiniz takım rolünden birini alabilirsiniz.`})
    
    let sevgilirolleri =[
      "1252410117857480735", "1252410170839928882", "1252410165748174910", "1252739829674807378", "1252740021644165232"
    ]
    let sevgilirollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
    sevgilirolleri.forEach(async x => {sevgilirollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
  let sevgilirollerimenusu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("sevgilirolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(sevgilirollerisecenegi))
  message.channel.send({components:[sevgilirollerimenusu], content:`- Aşağıda bulunan menüden üzerinize istediğiniz sevgili rolünden birini alabilirsiniz.`})
  
  let renkrolleri =[
    "1252212741142347878","1252212744774746112","1252220718452834384","1252220754251223040","1252220799738187787","1252220601276305430","1252220689444769832","1252220652954320966","1252220563364122705","1252760965703925862","1252761028908023828","1252742574926467082" 

  ]
  let renkrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
  renkrolleri.forEach(async x => {renkrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
let renkrollerimenusu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("renkrolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(renkrollerisecenegi))
message.channel.send({components:[renkrollerimenusu], content:`- Aşağıda bulunan menüden üzerinize istediğiniz renk rolünden birini alabilirsiniz.`})

let burcrolleri =[
  "1252407387638464552", "1252407395016114186", "1252408328181514352", "1252407391203496008",
  "1252408321835536466", "1252408257960607895", "1252408261647536138", "1252408264889602060",
  "1252408325086122016", "1252408318232629281", "1252408309756203018", "1252408315590475867",
]
let burcrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
burcrolleri.forEach(async x => {burcrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
let burcrollerimenusu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("burcrolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(burcrollerisecenegi))
message.channel.send({components:[burcrollerimenusu], content:`- Aşağıda bulunan menüden üzerinize istediğiniz  burç rolünden birini alabilirsiniz.`})

  
  }
}
module.exports = roleSelect;