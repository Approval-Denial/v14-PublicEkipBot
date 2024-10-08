const { GenerateEmbed } = require("../Structures/Default.Embeds");
const BannedOnBot = require("../Database/Bot/Banned.On.Bot");
const { Guild } = require("../Config/Guild");
const { general: { Cross } } = require("../Config/emojis");

async function checkBannedUser(message = undefined, userId) {
    const bannedUser = await BannedOnBot.findOne({ guildID: Guild.ID, userID: userId });
    if (bannedUser) {
        if (message != undefined) {
            message.replyReaction(message.guild.findReaction(Cross,"ID"));
            message.reply({
                embeds: [new GenerateEmbed().setDescription(message.member.id != userId ? `<@${bannedUser.banning}> tarafından <t:${Math.floor(bannedUser.date / 1000)}> tarihinde bot üstünden kullanıcı yasaklandığı için, hiç bir komut ve sistemi kullanamaz.`:`<@${bannedUser.banning}> tarafından <t:${Math.floor(bannedUser.date / 1000)}> tarihinde bot üstünden yasaklandınız, hiç bir komut ve sistemi kullanamazsınız.`)]
            })
                .destroyMessage();
            return true;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}


module.exports = { checkBannedUser }