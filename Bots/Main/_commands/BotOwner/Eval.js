
const { EmbedBuilder,PermissionsBitField ,codeBlock} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const request = require('request');
const { sendLongCodeBlocks } = require("../../../../Global/Functions/sendLongCodeBlocks");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "manuel kod denemeleri için",
            usage: ".eval",
            aliases: ["eval","deval"],
            enabled: true,
            developer : true
        });
    }
    async onRequest(client, message, args) {
        try {
            const code = args.join(' ');
            if (!code) return message.channel.send('Hmm, bir kod yazmalısın.');

            if (code.includes('secret') || code.includes('token') || code.includes('process.env')) {
                return message.channel.send('Güvenlik nedeniyle bu kod çalıştırılamaz.');
            }

            let evaled = await eval(code);

            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });

            sendLongCodeBlocks(message.channel, 'js', clean(evaled));
        } catch (error) {
            sendLongCodeBlocks(message.channel, 'js', clean(error));
        }
    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}
module.exports = Eval

function getRandomElementFromArray(array){
    if (!Array.isArray(array) || array.length === 0) {
      return "ertunun annesi";
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }