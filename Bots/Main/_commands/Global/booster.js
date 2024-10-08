
const { PermissionsBitField } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
class Booster extends Command {
    constructor(client) {
        super(client, {
            name: "Booster",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".Booster (isim)",
            category: "Global",
            aliases: ["booster","zengin","b"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
 async  onRequest (client, message, args,embed) {
        let yazilacakIsim;
        let isim = args.join(' ');
        if (!isim)  return message.ReturnReply("name not specified")

    const data = await tagsistem.findOne({guildID:message.guild.id});
    const a = data.only 
    const tag = `${a == true ? `${data.Type == "Public" ? `${message.member.displayName.includes(data.Tag) ? `${data.Tag}`:`${data.unTag}`}` :`${data.nameTags.some(x=> message.member.displayName.includes(x) || message.member.user.discriminator == data.NumberTag) ? `${data.Tag}`:`${data.unTag}`}`}` : ""}`
        yazilacakIsim = `${tag} ${isim}`;
        if(message.member.manageable && message.member.roles.cache.has(roles.boosterRole)) {
            message.member.setNickname(`${yazilacakIsim}`).catch((x=>{}))
            message.react(await emojiBul("appEmoji_tik")).then(async msg => {
                setTimeout(async() => {
                if(message) await message.delete();
                if(msg) await msg.delete();
                }, 5000);
                })
      } else message.ReturnReply("Not booster")
    }
}

module.exports = Booster
