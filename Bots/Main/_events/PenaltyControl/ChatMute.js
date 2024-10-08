const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild")
const penalty = require("../../../../Global/Database/penaltyDB/penaltys");
const { Events } = require("discord.js");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ChatMuteControlEvent extends Event {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            enabled: true,
        });
    }

    async onLoad() {
        const guild = await client.guilds.cache.get(Guild.ID)
        if (!guild) return;
        setInterval(async () => {
            try {
            penalty.find({ guildID: guild.id }, async (err, data) => {
                if(err) return;
                if (!data) return;
                data.filter(t => t.penaltys.some(x => x.type == "CHAT-MUTE" && x.Finished == false)).forEach(async veri => {
                    veri.penaltys.forEach(async ceza => {
                        let member = await guild.members.cache.get(ceza.Punished)
                        if (member) {
                            if (Date.now() > ceza.PenaltyEndTime) {
                                if (member.roles.cache.has(roles.chatMutedRole)) member.roles.remove(roles.chatMutedRole)
                                await penalty.findOneAndUpdate({ guildID: guild.id, cezaId: veri.cezaId }, { $set: { penaltys: { Staff: ceza.Staff, Punished: ceza.Punished, SentencingDate: ceza.SentencingDate, PenaltyEndTime: ceza.PenaltyEndTime, Finished: true, type: ceza.type, Reason: ceza.Reason } } }, { upsert: true })
                                if (channels.vMutedLog != undefined && guild.channels.cache.get(channels.vMutedLog)) guild.channels.cache.get(channels.vMutedLog)
                                    .send({ content: `${member} Metin kanallarındaki susturması <t:${(Date.now() / 1000).toFixed()}:R> sona erdiği için kaldırıldı.` })

                            } else {
                                if (!member.roles.cache.has(roles.chatMutedRole)) await member.roles.add(roles.chatMutedRole)
                            }

                        }
                    })
                })

            })
            .catch(a => {})
            } catch (error) {
                return;
            }

        }, 1000 * 10);


    }
}

module.exports = ChatMuteControlEvent;
