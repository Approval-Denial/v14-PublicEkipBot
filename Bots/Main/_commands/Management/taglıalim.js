
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const taglialimdb = require("../../../../Global/Database/SystemDB/guild.tagli.alim")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class taglıAlım extends Command {
    constructor(client) {
        super(client, {
            name: "TaglıAlım",
            description: "Taglı alım modunu açar/kapatır.",
            usage: ".taglialim",
            category: "Management",
            aliases: ["taglialim","taglıalım"],
            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
 async onRequest (client, message, args,embed) {
    const data = await tagsistem.findOne({guildID:message.guild.id});
    const tagsystemonly = data ? data.only : false
    if(tagsystemonly == true) {
    let taglialimdata = await taglialimdb.findOne({guildID:message.guild.id});
    let taglialimonly = taglialimdata ? taglialimdata.only:false;
    if(!taglialimdata || taglialimonly == false){
        if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

    await taglialimdb.findOneAndUpdate({guildID:message.guild.id},{$set:{only:true}},{upsert:true});
    message.reply({content:"**Taglı Alım** Modu açıldı! Tagsız kayıt yapılmıcaktır ve tagı salanlar 'kayıtsız' olarak sunucuda kalabiliceklerdir."})
    }
    else{
        if(message) message.replyReaction(message.guild.findReaction(Tik,"ID"));

        await taglialimdb.findOneAndUpdate({guildID:message.guild.id},{$set:{only:false}},{upsert:true});
        message.reply({content:"**Taglı Alım** Modu kapalı! tüm üyeler sunucuya erişebiliceklerdir."})   
    }
    }
    else 
    {
        if(message) message.replyReaction(message.guild.findReaction(Cross,"ID"));

        message.reply({content:"**Tag Modu** kapalı olduğu için bu işlem yapılamaz."})
    }
}
}
module.exports = taglıAlım;