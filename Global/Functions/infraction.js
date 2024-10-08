const { GenerateEmbed } = require("../Structures/Default.Embeds");
const mute = require("../Database/penaltyDB/mute");
const penaltys = require("../Database/penaltyDB/penaltys");
const vmute = require("../Database/penaltyDB/vmute");
const jail = require("../Database/penaltyDB/jail");
const roleSetup = require("../Database/Guild.Roles.Config");
const {infractionScore} = require("./infractionScore")
async function infraction(author, member, type, sebep, cezaSure, message, msg) {

    const guild = client.guilds.cache.get(Guild.Guild.ID)
    const roleData = await roleSetup.findOne({ guildID: Guild.Guild.ID });

    const embed = new GenerateEmbed().setTimestamp();

    if (type === "CHAT-MUTE") {

        const bitisTarihi = (Date.now() + cezaSure)
        new GenerateEmbed().setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
            .setFields(
                { name: 'Sebep', value: sebep },
                { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
                { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi / 1000).toFixed()}>`, inline: true }
            )
        const ceza = await penaltys.countDocuments().exec();
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: author.id, Punished: member.id, SentencingDate: Date.now(), PenaltyEndTime: bitisTarihi, Finished: false, Reason: sebep, type: "CHAT-MUTE" } } }, { upsert: true })
        await mute.findOneAndUpdate({ guildID: guild.id, userID: author.id }, { $inc: { limit: 1, mute: 1 }, $push: { mutes: { Punished: member.id, SentencingDate: Date.now(), Type: "C-MUTE", Reason: sebep, Finished: false } } }, { upsert: true })
        if (roleData && roleData.chatMutedRole) await member.roles.add(roleData.chatMutedRole)
        if (channels.cMutedLog != undefined && message.guild.channels.cache.get(channels.cMutedLog)) message.guild.channels.cache.get(channels.cMutedLog).send({ embeds: [embed] })
        await infractionScore(member, "CHAT-MUTE")
        await message.edit({ content: `${member} üyesi başarıyla! ${author} tarafından tüm metin kanallarından susturuldu!`, embeds: [], components: [] })
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));
    }
    if (type === "VOICE-MUTE") {
        const bitisTarihi = (Date.now() + cezaSure)
        new GenerateEmbed().setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
            .setFields(
                { name: 'Sebep', value: sebep },
                { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
                { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi / 1000).toFixed()}>`, inline: true }
            )
        const ceza = await penaltys.countDocuments().exec();
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: author.id, Punished: member.id, SentencingDate: Date.now(), PenaltyEndTime: bitisTarihi, Reason: sebep, Finished: false, type: "VOICE-MUTE" } } }, { upsert: true })
        await vmute.findOneAndUpdate({ guildID: guild.id, userID: author.id }, { $inc: { limit: 1, vmute: 1 }, $push: { vmutes: { Punished: member.id, SentencingDate: Date.now(), Type: "V-MUTE", Reason: sebep, Finished: false } } }, { upsert: true })
        if (roleData && roleData.voiceMutedRole) await member.roles.add(roleData.voiceMutedRole)
        if (member && member.voice.channel) await member.voice.setMute(true);
        if (channels.vMutedLog != undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog).send({ embeds: [embed] })
        await infractionScore(member, "VOICE-MUTE")
        await message.edit({ content: `${member} üyesi başarıyla! ${author} tarafından tüm ses kanallarından susturuldu!`, embeds: [], components: [] })
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));

    }
    if (type === "JAIL") {
        const bitisTarihi = (Date.now() + cezaSure)
        new GenerateEmbed().setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
            .setFields(
                { name: 'Sebep', value: sebep },
                { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
                { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi / 1000).toFixed()}>`, inline: true }
            )
        const ceza = await penaltys.countDocuments().exec();
        let rolleri = member.roles.cache.filter(x => x.id != guild.id && x.id != roles.boosterRole).map(x => x.id)
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: author.id, Punished: member.id, SentencingDate: Date.now(), PenaltyEndTime: bitisTarihi, Finished: false, type: "JAIL", Reason: sebep, Roles: rolleri } } }, { upsert: true })
        await member.roles.set(member.roles.cache.has(roles.boosterRole) ? [roles.jailedRole, roles.boosterRole] : [roles.jailedRole])
        if (channels.jailedLog != undefined && guild.channels.cache.get(channels.jailedLog)) message.guild.channels.cache.get(channels.jailedLog).send({ embeds: [embed] })
        await jail.findOneAndUpdate({ guildID: guild.id, userID: author.id }, { $inc: { limit: 1, jail: 1 }, $push: { jails: { Punished: member.id, SentencingDate: Date.now(), Type: "JAIL", Reason: sebep, Finished: false } } }, { upsert: true })
        await infractionScore(member, "JAIL")
        await message.channel.send({ content: `${member} üyesi başarıyla! ${author} tarafından tüm ses ve metin kanallarından engellendi!`, embeds: [], components: [] })
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));

    }
    if (type === "Reklam") {
        const bitisTarihi = (Date.now() + cezaSure)
        new GenerateEmbed().setDescription(`**${author}** adlı yetkili tarafından **${member}** adlı kullanıcıya \`${type}\` cezası uygulandı.`)
            .setFields(
                { name: 'Sebep', value: sebep },
                { name: 'Süre', value: `${cezaSure / 60000} dakika`, inline: true },
                { name: 'Bitiş Tarihi', value: `<t:${(bitisTarihi / 1000).toFixed()}>`, inline: true }
            )
        const ceza = await penaltys.countDocuments().exec();
        let rolleri = member.roles.cache.filter(x => x.id != guild.id && x.id != roles.boosterRole).map(x => x.id)
        await penaltys.findOneAndUpdate({ guildID: guild.id, userID: member.id, cezaId: ceza + 1 }, { $set: { penaltys: { Staff: author.id, Punished: member.id, SentencingDate: Date.now(), PenaltyEndTime: bitisTarihi, Finished: false, type: "JAIL", Reason: sebep, Roles: rolleri } } }, { upsert: true })
        await member.roles.set(member.roles.cache.has(roles.boosterRole) ? ["1114815186965123072", roles.boosterRole] : ["1114815186965123072"])
        if (channels.jailedLog != undefined && guild.channels.cache.get(channels.jailedLog)) message.guild.channels.cache.get(channels.jailedLog).send({ embeds: [embed] })
        await jail.findOneAndUpdate({ guildID: guild.id, userID: author.id }, { $inc: { limit: 1, jail: 1 }, $push: { jails: { Punished: member.id, SentencingDate: Date.now(), Type: "JAIL", Reason: sebep, Finished: false } } }, { upsert: true })
        await infractionScore(member, "JAIL")
        await message.channel.send({ content: `${member} üyesi başarıyla! ${author} tarafından tüm ses ve metin kanallarından engellendi!` })
        return message.replyReaction(message.guild.findReaction(Cross, "ID"));

    }
}
module.exports = { infraction }