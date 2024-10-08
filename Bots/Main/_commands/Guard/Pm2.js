
const { EmbedBuilder,codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const children = require("child_process");
const { log } = require("console");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Pm2 extends Command {
    constructor(client) {
        super(client, {
            name: "Pm2",
            description: "manuel kod denemeleri için",
            usage: ".pm2",
            category: "Approval",
            aliases: ["pm2","pm"],

            enabled: true,

            developer : true
        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, message, args) {
    if(!args) return message.reply({content:".pm2 <restart/stop/start/list> (Proc ID)"})
    const ls = children.exec(`pm2 ${args.join(' ')}`);
    ls.stdout.on('data', async function (content) {
        if (content.length > 2000) {
            const chunks = splitMessage(content, 2000);
            for (const chunk of chunks) {
                await message.channel.send({content:codeBlock(chunk)});
            }
        } else {
            await message.channel.send({content:codeBlock(content)});
        }  
    });
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
module.exports = Pm2
// async  function chunks(content,message) {
//     if (content.length > 2000) {
//         const chunks = content.match(/[\s\S]{1,2000}/g) || [];
//         for (const chunk of chunks) {
//             await message.channel.send({content:codeBlock(chunk)});
//         }
//     } else {
//         await message.channel.send({content:codeBlock(content)});
//     }
// }
function splitMessage(content, limit) {
    const chunks = [];
    while (content.length) {
        if (content.length <= limit) {
            chunks.push(content);
            break;
        }
        let chunk = content.slice(0, limit);
        const lastSpaceIndex = chunk.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            chunk = chunk.slice(0, lastSpaceIndex);
        }
        chunks.push(chunk);
        content = content.slice(chunk.length);
    }
    return chunks;
}