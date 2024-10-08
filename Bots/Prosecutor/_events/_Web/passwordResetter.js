const { Events } = require("discord.js");
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const Musteri = require("../../../../Global/Database/Musteri");
// const webSystem = require("../../../../Database/Systems/web.System");
const { createPassword } = require("../../../../Global/Functions/createPassword");
const Guild = require("../../../../Global/Config/Guild").Guild

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class passwordResetter extends Event {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            enabled: true,
        });    
    }    

 async   onLoad() {
//   const web_System = await webSystem.findOne({guildID:config.Guild.ID})
//    if(web_System?.state === true){
    //require("../../../../Global/Structures/Default.Web")
    setInterval(async () => {
    let musteris = await Musteri.find({guildID:Guild.ID})
    for (let i = 0; i < musteris.length; i++) {
        const musteriData = musteris[i];
        let now = Date.now();
        if(now >= musteriData.passwordRenewalDate){
            var newPass = await createPassword()
            await Musteri.findOneAndUpdate({guildID:Guild.ID,userID:musteriData.userID},{$set:{only:true,date:Date.now(),password:newPass,passwordRenewalDate:(now+30000)}},{upsert:true})
        }
    }
    }, 1000);
//    }
    }
}    


module.exports = passwordResetter;