
const { PermissionsBitField } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Help extends Command {
    constructor(client) {
        super(client, {
            name: "devyardım",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".yardım",
            category: "Approval",
            aliases: ["devhelp","devyardım"],
            enabled: true,

            cooldown: 3500,
            guildOwner:true,
            developer : true
        });
        // constructor(Approval){
        //     super(Approval,{
        //         name:"Mehmet",
        //         pseudonym:"Memo",
        //         nickname:"Approval",
        //         dcNickname:"Approval.#0001",
        //         instagram:"approval.memo0",
        //         bahance:"approvalcyber",
        //         skills:["Programmer","Social Media Manager"],
        //         languages:["Türkçe","İngilizce","Arapça"],
        //         softwareLanguages:["C#","JS","HTML/CSS","Dart","Python"]
        //     })
        // }
    }
    
    onRequest (client, message, args,embed) {
       message.reply({embeds:[new GenerateEmbed().setDescription(`${client.commands.filter(x=> (x.developer === true || x.guildOwner === true) && (x.category == "Approval" || x.category == "Guard")).map(x=> `\`${x.usage}\``).join("\n")}`)]})
    }
}

module.exports = Help
