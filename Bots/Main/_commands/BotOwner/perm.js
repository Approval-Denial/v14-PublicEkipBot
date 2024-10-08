
const { EmbedBuilder,PermissionsBitField,codeBlock, ActionRowBuilder,StringSelectMenuBuilder, ButtonBuilder, ButtonStyle,ChannelType,PermissionFlagsBits, ActionRow, RoleSelectMenuBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const perms = require("../../../../Global/Database/SystemDB/perm")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Perm extends Command {
    constructor(client) {
        super(client, {
            name: "perm",
            description: "perm",
            usage: ".perm",
            category: "Approval",
            aliases: ["perm"],
            enabled: true,

            cooldown: 3500,
        });
    }
    
async onRequest (client, message, args,embed) {
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.replyReaction(message.guild.findReaction(Cross,"ID"))
    if(!["ekle","çıkar","liste"].some(x=> args[0] == x)) return message.reply({content:"`Ekle:` **.perm ekle komutIsmi RolID YetkiliRolID**\n`Çıkar:` **.perm çıkar** (menüden seçim)\n`Liste:` **.perm liste**"})
    if(args[0] == "ekle"){
        const data = await perms.findOne({guildID:message.guild.id})
        const permsData = data ? data.perms : [];
        let mesaj = await message.channel.send(`Eklemek istedin komutun adını yazman için **15 Saniyen** var!`);
        let komutPushlancak = {}
        var isimfilter = m => m.author.id == message.author.id
        await message.channel.awaitMessages({isimfilter, max: 1, time: 15000, errors: ["time"]})
        .then(async isim => {
        if (isim.first().content == ("iptal" || "i")) {
          isim.first().delete();
          mesaj.delete();
          return;
        };
        if (isim.first().content.includes(" ")) {
            mesaj.delete();
            isim.first().content;
            return message.channel.send(`Boşluk Kullanamazsın!`);
          }
          if(permsData.some(veri=> veri == (isim.first().content))) return message.reply({content:`Bu komut daha önce zaten eklenmiş`})
          if (isim.first().content.length > 25) return message.channel.send(`${cevaplar.prefix} Eklemek istediğiniz komut 25 karakterden fazla isime sahip.`);
          komutPushlancak.permName = isim.first().content
          isim.first().delete();
          await mesaj.edit({content: null, embeds: [new GenerateEmbed().setDescription(`Komutu kullanma izni verilcek rolleri aşağıda ki menüden seçiniz?`)], components: [new ActionRowBuilder().setComponents(new RoleSelectMenuBuilder().setCustomId("permRoleSelectMenu").setMaxValues(5))]});
    })
    const filter = i => i.user.id == message.member.id 
    const collector = mesaj.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 50000 })
 
    collector.on('collect', async i => { 
        await i.deferUpdate();
      if(i.customId == "permRoleSelectMenu") {
          var role = []
          for (let index = 0; index < i.values.length; index++) {
            let ids = i.values[index]
            role.push(ids)
          }
    
          komutPushlancak.staffRoleID = role

          message.replyReaction(message.guild.findReaction(Cross,"ID"));
         let mesajx =await mesaj.channel.send({ embeds: [ new GenerateEmbed().setDescription(`Komutun vericeği rolü aşağıdan seçiniz`)],components: [new ActionRowBuilder().setComponents(new RoleSelectMenuBuilder().setCustomId("permRolesSelectMenu").setMaxValues(5))]})
          const collectorx = mesajx.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 50000 })
          collectorx.on('collect', async t => { 
            await t.deferUpdate();
            if(t.customId == "permRolesSelectMenu") {
                var role1 = []
                for (let index = 0; index < t.values.length; index++) {
                  let ids = t.values[index]
                  role1.push(ids)
                }
                komutPushlancak.permID = role1
                await perms.findOneAndUpdate({guildID:message.guild.id},{$push:{perms:komutPushlancak}},{upsert:true})
                await mesajx.edit({components: [], embeds: [ new GenerateEmbed().setDescription(`**${komutPushlancak.permName}** isimli alt komut başarıyla oluşturuldu.`).addFields({name:`Kullanacak rol(ler)`,value: `${komutPushlancak.staffRoleID.map(x => message.guild.roles.cache.get(x)).join(",")}`,inline: true}).addFields({name:`Verilecek rol(ler)`,value:`${role1.map(x => message.guild.roles.cache.get(x)).join(", ")}`,inline:true})]});
            
            }
        })

        }

      

    })
   }
    if(args[0] == "çıkar"){
        const data = await perms.findOne({guildID:message.guild.id})
        const permsData = data ? data.perms : [];
        var liste = [{label:"İşlemi iptal et!",description:"Menüyü Kapatır.",value:`iptal`}];
        for (let i = 0; i < permsData.length; i++) {
            const veri = permsData[i];
            liste.push({label:`Komut: ${veri.permName}`,description:`Rol: ${message.guild.roles.cache.get(veri.permID) ? message.guild.roles.cache.get(veri.permID).name : "Rol Silinmiş."}`,value:`${veri.permName}`})
        }
    const menu = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("permler")
        .setOptions(liste)
        .setPlaceholder("Silmek istediğin komutu seç")
    )
    message.channel.send({components:[menu],embeds:[new GenerateEmbed().setDescription(`Listesen silmek istediğiniz komutu seçiniz.`)]}).then(async msg =>{
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
        collector.on("collect",async(i)=>{
        await i.deferUpdate();
        for (let index = 0; index < liste.length; index++) {
        if(i.values[0] == `${liste[index].value}`){
        await perms.findOneAndUpdate({guildID:message.guild.id},{$pull:{perms:{permName:liste[index].value}}},{upsert:true})
        message.channel.send({content:"`Komut başarıyla silindi!`"}).then(x=>{setTimeout(() => {if(x) x.delete();}, 5000);})
        }
        }   
        if(i.values[0] == "iptal") {
            if(msg) await msg.delete();
            if(message) await message.delete();
            } 
        })
    })
    }
    if(args[0] == "liste"){
        const data = await perms.findOne({guildID:message.guild.id})
        const permsData = data ? data.perms : [];
        message.channel.send({embeds:[new GenerateEmbed().setDescription(`toplam **${permsData.length}** ek komut aşağıda listelenmiştir. \n\n ${permsData.length == 0 ? " " : `${codeBlock("md",
        `${permsData.map(x=> `# ${x.permName.toUpperCase()} \n> Kullanım: .${x.permName} @Luppux/ID\n< Rol: ${message.guild.roles.cache.get(x.permID) ? message.guild.roles.cache.get(x.permID).name : "Rol Silinmiş."}\n< Y. Rolü: ${message.guild.roles.cache.get(x.staffRoleID) ? message.guild.roles.cache.get(x.staffRoleID).name : "Rol Silinmiş."}`).join("\n")}`
        )}`}`)]})
    }
    }
}
module.exports = Perm
