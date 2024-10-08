const aktiveTask = require("../../Global/Database/mission/aktiveTask");
const {Guild:{ID}} = require("../Config/Guild");
const { GenerateEmbed } = require("../Structures/Default.Embeds");
const { firstBadgeControl } = require("./firstBadgeControl");
async function taskProgress(member, taskType, voiceData) {

    const guild = await client.guilds.cache.get(ID)
    var taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
    if (!taskInAktive) return;
    if (taskInAktive.category === taskType) {
        await aktiveTask.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { progress: 1 } }, { upsert: true })
        taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
        if (taskInAktive.progress >= taskInAktive.Point) {
            let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
            if (logChannel) await logChannel.send({
                content: `${member}`, embeds: [new GenerateEmbed().setDescription(`**${taskInAktive.name}** İsimli görevinizi tamamladınız! Ödül olarak **${taskInAktive.reward}** Puan hesabına eklendi!`)
                    .setFooter({ text: "\".ilerleme\" komutu ile ilerlemenizi takip edebilirsiniz!" })]
            })
            await firstBadgeControl(member, taskInAktive.name)
            await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: member.id }, { upsert: true })
        }
    }
    if (taskInAktive.category === taskType) {
        await aktiveTask.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { progress: 1 } }, { upsert: true })
        taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
        if (taskInAktive.progress >= taskInAktive.Point) {
            let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
            if (logChannel) await logChannel.send({
                content: `${member}`, embeds: [new GenerateEmbed().setDescription(`**${taskInAktive.name}** İsimli görevinizi tamamladınız! Ödül olarak **${taskInAktive.reward}** Puan hesabına eklendi!`)
                    .setFooter({ text: "\".ilerleme\" komutu ile ilerlemenizi takip edebilirsiniz!" })]
            })
            await firstBadgeControl(member, taskInAktive.name)
            await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: member.id }, { upsert: true })
        }
    }
    if (taskInAktive.category === taskType) {
        await aktiveTask.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { progress: voiceData } }, { upsert: true })
        taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
        if ((taskInAktive.progress >= taskInAktive.Point) && taskInAktive.completed === false) {
            let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
            if (logChannel) await logChannel.send({
                content: `${member}`, embeds: [new GenerateEmbed().setDescription(`**${taskInAktive.name}** İsimli görevinizi tamamladınız! Ödül olarak **${taskInAktive.reward}** Puan hesabına eklendi!`)
                    .setFooter({ text: "\".ilerleme\" komutu ile ilerlemenizi takip edebilirsiniz!" })]
            })
            await firstBadgeControl(member, taskInAktive.name)

            await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: member.id }, { upsert: true })
        }
    }
    if (taskInAktive.category === taskType) {
        await aktiveTask.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { progress: voiceData } }, { upsert: true })
        taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
        if ((taskInAktive.progress >= taskInAktive.Point) && taskInAktive.completed === false) {
            let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
            if (logChannel) await logChannel.send({
                content: `${member}`, embeds: [new GenerateEmbed().setDescription(`**${taskInAktive.name}** İsimli görevinizi tamamladınız! Ödül olarak **${taskInAktive.reward}** Puan hesabına eklendi!`)
                    .setFooter({ text: "\".ilerleme\" komutu ile ilerlemenizi takip edebilirsiniz!" })]
            })
            await firstBadgeControl(member, taskInAktive.name)
            await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: member.id }, { upsert: true })
        }
        if (taskInAktive.category === taskType) {
            await aktiveTask.findOneAndUpdate({ guildID: guild.id, userID: member.id }, { $inc: { progress: voiceData } }, { upsert: true })
            taskInAktive = await aktiveTask.findOne({ guildID: guild.id, userID: member.id })
            if ((taskInAktive.progress >= taskInAktive.Point) && taskInAktive.completed === false) {
                let logChannel = await guild.channels.cache.find(x => x.name === "görev-log");
                if (logChannel) await logChannel.send({
                    content: `${member}`, embeds: [new GenerateEmbed().setDescription(`**${taskInAktive.name}** İsimli görevinizi tamamladınız! Ödül olarak **${taskInAktive.reward}** Puan hesabına eklendi!`)
                        .setFooter({ text: "\".ilerleme\" komutu ile ilerlemenizi takip edebilirsiniz!" })]
                })
                await firstBadgeControl(member, taskInAktive.name)
                await aktiveTask.findOneAndDelete({ guildID: guild.id, userID: member.id }, { upsert: true })
            }
        }
    }
}
module.exports = { taskProgress }