const DiscordOne = require('discord.js');
const logs = require('discord-logs');
const { ID, Bots, welcomeVoiceLink, unregrole } = require("../../Global/Config/Guild").Guild
/* -------------------------------------------------------------------------------------------------------------  */
const client = new DiscordOne.Client({ intents: 32767 });
logs(client);
const welcomeOneToken = Bots.Dis[0]
const welcomeOneVoice = require('@discordjs/voice');
client.login(welcomeOneToken)
var connectionOne;
var playerOne;
var resourceOne;
client.on(DiscordOne.Events.ClientReady, async () => {
    const guildOne = await client.guilds.cache.get(ID);
    const channelOne = await guildOne.channels.cache.get("1251091951093288981")
    if (channelOne) connectionOne = welcomeOneVoice.joinVoiceChannel({ channelId: channelOne.id, guildId: guildOne.id, adapterCreator: guildOne.voiceAdapterCreator, });
    setTimeout(() => {
        if (channelOne) connectionOne = welcomeOneVoice.joinVoiceChannel({ channelId: channelOne.id, guildId: guildOne.id, adapterCreator: guildOne.voiceAdapterCreator, })
    }, 30 * 60000);
})
client.on("voiceChannelJoin", async (member, channel) => {
    const user = channel.guild.members.cache.get(member.id)
    if (user.roles.cache.has(unregrole) && channel.id === "1251091951093288981") {
        playerOne = welcomeOneVoice.createAudioPlayer();
        resourceOne = welcomeOneVoice.createAudioResource(welcomeVoiceLink[Math.floor(Math.random() * welcomeVoiceLink.length)]);
        await playerOne.play(resourceOne)
        await connectionOne.subscribe(playerOne)
        playerOne = undefined;
        resourceOne = undefined;
    }
})
