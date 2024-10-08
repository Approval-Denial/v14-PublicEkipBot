const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const {Guild} = require("../../../../Global/Config/Guild")
const GuardData = require("../../../../Global/Database/Guard")


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class Backup extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
        const guild = client.guilds.cache.get(Guild.ID)
        const Guard = await GuardData.findOne({guildID: guild.id})
        const databaseonly = Guard ? Guard.database : false;
        if(databaseonly == true){
        await startDistributors()
      await guildRoles(guild)
      await guildChannels(guild)
      setInterval(async () => {
        await guildRoles(guild)
        await guildChannels(guild)
    }, 1000*60*60*1);
        }
    }
}    




module.exports = Backup;
