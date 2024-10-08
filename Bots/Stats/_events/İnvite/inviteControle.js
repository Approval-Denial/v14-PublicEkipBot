const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild")
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });
    }

    async onLoad() {

        const guildInviteSystem = await guildInviteSystemDB.findOne({ guildID: Guild.ID });
        const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false;
        if (guildInviteSystemControl == true) {
            const guild = client.guilds.cache.get(Guild.ID)
            guild.members.cache.forEach(member => {

                if (member.user.bot) return;
                try {
                    inviteSchema.findOne({ guildID: guild.id, userID: member.id }, async (err, data) => {
                        if (err) throw err;
                        if (data) return;

                        await new inviteSchema({
                            guildID: guild.id,
                            userID: member.id,

                            total: 0,
                            regular: 0,
                            leave: 0,
                            fake: 0,
                            bonus: 0,

                            dailyInvites: 0,
                            weeklyInvites: 0,

                            inviteSchema: null

                        }).save().catch(err => { return; })
                    })

                } catch (error) {
                    return;
                }


            })

            guild.invites.fetch()
                .then(invites => {

                    const codeUses = new Map();
                    invites.each(inv => codeUses.set(inv.code, inv.uses));
                    guildInvites.set(guild.id, codeUses);

                })
        }
    }
}

module.exports = ready;
