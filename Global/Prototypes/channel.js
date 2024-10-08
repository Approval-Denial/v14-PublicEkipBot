const { GuildMember, Guild, TextChannel } = require("discord.js");
const Webhooklar = {};
TextChannel.prototype.wsend = async function (content, options) {
    if (Webhooklar[this.id]) return (await Webhooklar[this.id].send(content, options));
    let entegrasyonlar = await this.fetchWebhooks();
    let webh = entegrasyonlar.find(e => e.name == client.user.username),
        result;
    if (!webh) {
        webh = await this.createWebhook(client.user.username, {
            avatar: client.user.avatarURL()
        });
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    } else {
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    }
    return result;
};