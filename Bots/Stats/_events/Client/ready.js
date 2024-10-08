const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const { Guild } = require("../../../../Global/Config/Guild")
const guildRoles = require("../../../../Global/Database/Guild.Roles.Config")
const guildChannels = require("../../../../Global/Database/Guild.Channels.Config")


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });
    }

    async onLoad() {
        const guild = client.guilds.cache.get(Guild.ID)
        const channel = guild.channels.cache.get(Guild.botVoiceChannel)
        const roles = global.roles = await guildRoles.findOne({ guildID: guild.id });
        const channels = global.channels = await guildChannels.findOne({ guildID: guild.id });
        if (!roles) console.log("Roller ayarlanmamış");
        if (!channels) console.log("Kanallar Ayarlanmamış")

        if (guild && channel) voice.joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator, });
        setInterval(async () => {
            if (guild && channel) await voice.joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator, })
        }, 15 * 1000);
        console.log(`[${tarihsel(Date.now())}] ${chalk.green.bgHex('#2f3236')(`Başarıyla Giriş Yapıldı: ${client.user.tag}`)}`)

    }
}
module.exports = ready;
