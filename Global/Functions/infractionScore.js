const cezapuan = require("../Database/penaltyDB/cezapuan")
const { GenerateEmbed } = require("../Structures/Default.Embeds")

async function infractionScore(member, type) {
    const guild = client.guilds.cache.get(Guild.Guild.ID)

    if (type === "CHAT-MUTE") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 10 } }, { upsert: true })

    }
    if (type === "VOICE-MUTE") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 10 } }, { upsert: true })

    }
    if (type === "JAIL") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 15 } }, { upsert: true })

    }
    if (type === "BAN") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 25 } }, { upsert: true })

    }
    if (type === "UNCHAT-MUTE") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 10 } }, { upsert: true })

    }
    if (type === "UNVOICE-MUTE") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 10 } }, { upsert: true })

    }
    if (type === "UNJAİL") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 15 } }, { upsert: true })

    }
    if (type === "UNBAN") {
        await cezapuan.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { cezapuan: 25 } }, { upsert: true })

    }
    let cezapuandata = await cezapuan.findOne({ guildID: guild.id, userID: member.id })
    let channel = guild.findChannel(channels.penaltyPointsLog)
    if (channel != false) channel.send({ embeds: [new GenerateEmbed().setDescription(`**${member}**, ceza puanın güncellendi! Mevcut ceza puanın: **${(cezapuandata ? cezapuandata.cezapuan : 0) < 0 ? 0 : (cezapuandata ? cezapuandata.cezapuan : 0)}**.`)] })
}

module.exports = { infractionScore }