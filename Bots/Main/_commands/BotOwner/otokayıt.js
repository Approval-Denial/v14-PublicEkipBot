
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const {BetterMarkdown ,yellow , green } = require('discord-bettermarkdown');
const { codeBlock,ActionRowBuilder, PermissionFlagsBits,ButtonBuilder,ButtonStyle,RoleSelectMenuBuilder, EmbedBuilder} = require("discord.js");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Otokayıt extends Command {
    constructor(client) {
        super(client, {
            name: "Kayıtpanel",
            description: "Bot ile mesaj göndermek için",
            usage: ".Kayıtpanel (metin/embed)",
            category: "Approval",
            aliases: ["Kayıtpanel","kayıt-panel","otokayıt"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

    onLoad(client) {
      client.on("interactionCreate", async (interaction)=>{
        let menu2 = interaction.customId
        const value = interaction.customId;
        const utku = await interaction.guild.members.cache.get(interaction.user.id);
        
        if (menu2 === "registerDatas") {
            await interaction.deferReply({ ephemeral: true });
            const response = await fetch(`https://api.vante.dev/users/${interaction?.user?.id}/names`);
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
          
            metin += `${"Otomatik Kayıt".bgDarkBlue.green.bold} ${"Butonuna Basarak Sunucumuza".pink.bold} ${"Kayıt Olabilirsin.".pink.bold}\n`;
            metin += `⚠️ Eğer Buradaki İsim Ve Yaş Bilgilerinde Hata Olduğunu Düşünüyor isen, Lütfen Kayıt İşlemine Teyit Vererek Devam Et.`.red.bold;
          
            await interaction.editReply({ embeds:[new GenerateEmbed().setColor("#00ff00").setAuthor({name:`Otomatik Kayıt Sistemi`,url:`https://www.youtube.com/watch?v=dQw4w9WgXcQ`}).setDescription(`${codeBlock("ansi",metin)}`)] });
          }
      
          if (menu2 === "autoRegister") {
            await interaction.deferReply({ ephemeral: true });
           
            // susturdun beni de küstürdün hayata söyle nefesim söyle anlat ona anasını sikmedim aslaaa 
                
          }
          
                            
        })
    }

 async onRequest (client, message, args,embed) {
    let aiRow = new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Otomatik Kayıt").setCustomId("autoRegister").setEmoji(`🖋️`),new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Verileri Görüntüle").setCustomId("registerDatas").setEmoji(`💭`)]);
    
    
    var metin = "Merhaba! Yapay Zeka Kayıt Sistemine Hoş Geldiniz!\n\n".reset.green.underline.bold;
    metin += "Bu Kısımda Sizin Geçmiş Ve Diğer Sunuculardaki  Verilerinizi Kontrol Ederek Sizi Doğru Şekilde Teyit Gereksinimi Duymadan Kayıt Etmektedir.\n\n".pink.bold;
    metin += "Bu İşlem Sonrası Eğer ki Sorun Yaşıyorsanız Veya Yanlış Kayıt Olduğunuzu Düşünüyorsanız \`Kayıt Sorumlularımız\`'a Ulaşarak İşlem Gerçekleştirebilirsiniz.\n\n".pink.bold;
    metin += "Şimdiden Kayıt Olduysanız Sizlere İyi Eğlenceler Dilerim.".yellow.bold;
    
    message.delete();
    message.channel.send({components:[aiRow],embeds:[new GenerateEmbed().setColor("#00ff00").setAuthor({name:`Otomatik Kayıt Sistemi`,url:`https://www.youtube.com/watch?v=dQw4w9WgXcQ`}).setDescription(`${codeBlock("ansi",metin)}`)]})
    

    }

}

module.exports = Otokayıt;