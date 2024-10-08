async function firstBadgeControl(member, name) {
    const Data = await mission.findOne({ guildID: guild.id, userID: member.id });
    if (!Data || !Data.firstBadgename) {
        await mission.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $push: { completedTask: { name: name, date: Date.now() } }, $set: { firstBadgename: name, firstBadgedate: Date.now() } }, { upsert: true })
        let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
        if (logChannel) await logChannel.send({ content: `${member} Tebrikler 🎉, ilk rozetini kazandın!` })
    } else {
        await mission.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $push: { completedTask: { name: name, date: Date.now() } } }, { upsert: true })
    }
}
module.exports = { firstBadgeControl }