const { infractionScore } = require("./infractionScore");
const { GenerateEmbed } = require("../Structures/Default.Embeds");
const GuildRolesConfig = require("../Database/Guild.Roles.Config");

async function unInfraction(guild, member, staff, reason, type, message) {

    const roleData = await GuildRolesConfig.findOne({ guildID: Guild.Guild.ID });

    const embed = new GenerateEmbed()
        .setColor('#ff0000')
        .setAuthor({ name: staff.user.tag, iconURL: staff.avatarURL({ dynamic: true }) })
        .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
        .setTimestamp();

    if (type === "CHAT-MUTE") {
        new GenerateEmbed().setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
            .setFields(
                { name: 'Sebep', value: `${reason}`, inline: true },
                { name: 'Tarih', value: `<t:${(Date.now() / 1000).toFixed()}>`, inline: true }

            )
        const ceza = await penaltys.countDocuments().exec();
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: staff.id, Punished: member.id, SentencingDate: Date.now(), Reason: reason, type: "CHAT-UNMUTE" } } }, { upsert: true })
        if (channels.cMutedLog != undefined && guild.channels.cache.get(channels.cMutedLog)) guild.channels.cache.get(channels.cMutedLog)
            .send({ embeds: [embed] })
        await mute.findOneAndUpdate({ guildID: guild.id, userID: staff.id }, { $inc: { limit: 1, unmute: 1 }, $push: { mutes: { Punished: member.id, SentencingDate: Date.now(), Type: "C-UNMUTE", Reason: reason, Finished: false } } }, { upsert: true })
        await penaltys.find({ guildID: guild.id, userID: member.id }, async (err, data) => {
            data.filter(x => x.penaltys.some(x => x.type === "CHAT-MUTE" && x.Finished === false)).forEach(async veri => {
                veri.penaltys.forEach(async ceza => {
                    await penaltys.findOneAndUpdate({ guildID: guild.id, cezaId: veri.cezaId }, { $set: { penaltys: { Staff: ceza.Staff, Punished: ceza.Punished, SentencingDate: ceza.SentencingDate, PenaltyEndTime: ceza.PenaltyEndTime, Finished: true, type: ceza.type } } }, { upsert: true })
                    if ((roleData && roleData.chatMutedRole) && member.roles.cache.has(roleData.chatMutedRole)) await member.roles.remove(roleData.chatMutedRole)
                })

            })
            if (channels.cMutedLog != undefined && guild.channels.cache.get(channels.cMutedLog)) guild.channels.cache.get(channels.cMutedLog)
                .send({ content: `${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.` })

        })
        await infractionScore(member, "UNCHAT-MUTE")
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));
    }
    if (type === "VOICE-MUTE") {
        new GenerateEmbed().setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
            .setFields(
                { name: 'Sebep', value: `${reason}`, inline: true },
                { name: 'Tarih', value: `<t:${(Date.now() / 1000).toFixed()}>`, inline: true }
            )
        const ceza = await penaltys.countDocuments().exec();
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: staff.id, Punished: member.id, SentencingDate: Date.now(), Reason: reason, type: "VOICE-UNMUTE" } } }, { upsert: true })
        await member.voice.setMute(false).catch(() => { });
        await message.reply({ content: ` "${member.id}" ID'li kullanıcının metin kanallarında ki susturması açıldı!` })
        if (channels.vMutedLog != undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog)
            .send({ embeds: [embed] })
        await vmute.findOneAndUpdate({ guildID: guild.id, userID: staff.id }, { $inc: { limit: 1, unvmute: 1 }, $push: { vmutes: { Punished: member.id, SentencingDate: Date.now(), Type: "V-UNMUTE", Reason: reason, Finished: false } } }, { upsert: true })
        await penaltys.find({ guildID: guild.id, userID: member.id }, async (err, data) => {
            data.filter(x => x.penaltys.some(x => x.type === "VOICE-MUTE" && x.Finished === false)).forEach(async veri => {
                veri.penaltys.forEach(async ceza => {
                    await penaltys.findOneAndUpdate({ guildID: guild.id, cezaId: veri.cezaId }, { $set: { penaltys: { Staff: ceza.Staff, Punished: ceza.Punished, SentencingDate: ceza.SentencingDate, PenaltyEndTime: ceza.PenaltyEndTime, Finished: true, type: ceza.type } } }, { upsert: true })
                    if ((roleData && roleData.voiceMutedRole) && member.roles.cache.has(roleData.voiceMutedRole)) await member.roles.remove(roleData.voiceMutedRole)
                    if (member && member.voice.channel) await member.voice.setMute(false);
                })

            })
            if (channels.vMutedLog != undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog).send({ content: `${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.` })
        })
        await infractionScore(member, "UNVOICE-MUTE")
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));
    }
    if (type === "JAIL") {
        new GenerateEmbed().setDescription(`**${staff}** adlı yetkili tarafından **${member}** adlı kullanıcının \`${type}\` cezası kaldırıldı.`)
            .setFields(
                { name: 'Sebep', value: `${reason}`, inline: true },
                { name: 'Tarih', value: `<t:${(Date.now() / 1000).toFixed()}>`, inline: true }

            )
        const ceza = await penaltys.countDocuments().exec();
        await penaltys.findOneAndUpdate({ guildID: message.guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: staff.id, Punished: member.id, SentencingDate: Date.now(), Reason: reason, type: "UNJAIL" } } }, { upsert: true })
        await jail.findOneAndUpdate({ guildID: guild.id, userID: staff.id }, { $inc: { limit: 1, unvmute: 1 }, $push: { vmutes: { Punished: member.id, SentencingDate: Date.now(), Type: "UNJAIL", Reason: reason, Finished: true } } }, { upsert: true })
        await penaltys.find({ guildID: guild.id, userID: member.id }, async (err, data) => {
            data.filter(x => x.penaltys.some(x => x.type === "JAIL" && x.Finished === false)).forEach(async veri => {
                veri.penaltys.forEach(async ceza => {
                    await penaltys.findOneAndUpdate({ guildID: guild.id, cezaId: veri.cezaId }, { $set: { penaltys: { Staff: ceza.Staff, Punished: ceza.Punished, SentencingDate: ceza.SentencingDate, PenaltyEndTime: ceza.PenaltyEndTime, Finished: true, type: ceza.type, Reason: ceza.Reason } } }, { upsert: true })
                    await member.roles.add(ceza.Roles)
                    setTimeout(async () => { await member.roles.remove(roleData.jailedRole) }, 1000);
                })

            })
            if (channels.jailedLog != undefined && guild.channels.cache.get(channels.jailedLog)) guild.channels.cache.get(channels.jailedLog).send({ embeds: [embed] })
        })
        await infractionScore(member, "UNJAİL")
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));
    }
}
module.exports = { unInfraction }