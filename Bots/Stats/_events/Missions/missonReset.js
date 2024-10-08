const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const { Collection, EmbedBuilder, PermissionsBitField,codeBlock,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const guildautostaffsystem = require("../../../../Global/Database/SystemDB/guildautostaffsystem");
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const { Events: { ClientReady } } = require("discord.js")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ready extends Event {
    constructor(client) {
        super(client, {
            name: ClientReady,
            enabled: true,
        });    
    }    

 async   onLoad() {
  new CronJob("00 00 * * *", async () => {
    const guild = client.guilds.cache.get(Guild.ID)
    const gass = await guildautostaffsystem.findOne({guildID:guild.id})
    const gasso = gass ? gass.only : false;
    if(gasso == false) return;
    const log = guild.channels.cache.find(x=> x.name == "görev-log")
    await missionsystem.find({ guildID: guild.id },async (err, data) => {
      if(data.only == false) return;
      data.forEach(async (veri) => {
       veri.voiceTask = 0;
       veri.messageTask = 0;
       veri.registrationTask = 0;
       veri.InviteTask = 0;
       veri.tagInviteTask = 0;
       veri.StaffInviteTask = 0;
      veri.save()
const guildAutoStaff = await guildAutoStaffdb.findOne({guildID:guild.id,userID:veri.userID});
let rank = guildAutoStaff ? guildAutoStaff.staffRank : 1
if(log) await log.send(
  {content:`[<@${veri.userID}>]`,
  embeds:
  [new GenerateEmbed()
    .setTitle("Günlük Görevler Yenilendi!")
    .setDescription(`<@${veri.userID}>, görevlerin yenilendi! görevlerinin tamamlayıp **Yetkili Görev Puanı** kazanabilir ve hızlı bir şekilde yetki seviyesi atlayabilirsin.`)
    .addFields({name:"Görevlerin:",value:`\`Kayıt Görevi  :\`  **${StaffAutoRank[rank].Missions.R}**
\`Ses Görevi    :\` **${sureCevir(StaffAutoRank[rank].Missions.V)}**
\`Mesaj Görevi  :\` **${StaffAutoRank[rank].Missions.M}**
\`Davet Görevi  :\` **${StaffAutoRank[rank].Missions.I}**
\`Taglı Görevi  :\` **${StaffAutoRank[rank].Missions.TI}**
\`Yetkili Görevi:\` **${StaffAutoRank[rank].Missions.SI}**`})
  ]
}
)
       });
    });
  }, null, true, "Europe/Istanbul").start();

           
    }
}    
module.exports = ready;
