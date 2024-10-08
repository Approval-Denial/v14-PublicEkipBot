const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild");
const penalty = require("../../../../Global/Database/penaltyDB/penaltys");
const { Events } = require("discord.js");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class VoiceMuteControlJoin extends Event {
  constructor(client) {
    super(client, {
      name: Events.VoiceStateUpdate,
      enabled: true,
    });
  }

  async onLoad(oldUser, newUser) {
    const guild = await client.guilds.fetch(Guild.ID);
    if (!guild) return;
    if (!oldUser.channelId && newUser.channelId) {
      const member = newUser.member;

      try {
        const data = await penalty.find({ guildID: guild.id, userID: member.id }).exec();
        if (!data) return;

        data
          .filter((t) => t.penaltys.some((x) => x.type === "VOICE-MUTE" && x.Finished === false))
          .forEach(async (veri) => {
            veri.penaltys.forEach(async (ceza) => {
              if (ceza.Punished === member.id) {
                if (member) {
                  const roles = guild.roles;
                  if (roles && roles.voiceMutedRole && !member.roles.cache.has(roles.voiceMutedRole)) {
                    await member.roles.add(roles.voiceMutedRole);
                  }
                  if (member.voice && member.voice.mute === false) {
                    await member.voice.setMute(true);
                  }
                  if (Date.now() > ceza.PenaltyEndTime) {
                    if (roles && roles.voiceMutedRole && member.roles.cache.has(roles.voiceMutedRole)) {
                      await member.roles.remove(roles.voiceMutedRole);
                    }
                    if (member.voice && member.voice.mute === true) {
                      await member.voice.setMute(false);
                    }
                    await penalty.findOneAndUpdate(
                      { guildID: guild.id, cezaId: veri.cezaId },
                      {
                        $set: {
                          penaltys: {
                            Staff: ceza.Staff,
                            Punished: ceza.Punished,
                            SentencingDate: ceza.SentencingDate,
                            PenaltyEndTime: ceza.PenaltyEndTime,
                            Finished: true,
                            type: ceza.type,
                            Reason: ceza.Reason,
                          },
                        },
                      },
                      { upsert: true }
                    );
                    const channels = guild.channels;
                    if (channels.vMutedLog && guild.channels.cache.get(channels.vMutedLog)) {
                      guild.channels.cache.get(channels.vMutedLog).send({
                        content: `${member} Ses kanallarındaki susturması <t:${(Date.now() / 1000).toFixed()}:R> sona erdiği için kaldırıldı.`,
                      });
                    }
                  }
                }
              }
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = VoiceMuteControlJoin;
