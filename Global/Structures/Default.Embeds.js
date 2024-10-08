const { EmbedBuilder } = require("discord.js");
const Guild = require("../Config/Guild");
const { getRandomElementFromArray } = require("../Functions/getRandomElementFromArray");


const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../Config/emojis")
class GenerateEmbed extends EmbedBuilder {
    constructor(...opt) {
        super(...opt);
        let guild = client.guilds.cache.get(Guild.Guild.ID);
        if (guild) {
            this.setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }),url:`https://approvalcyber.dev`});
            this.setColor("2F3136");
        } else {
            this.setColor("2F3136");
        }
        if (!this.footer || !this.footer.text) {
          this.setFooter({ text: getRandomElementFromArray(Guild.Guild.botStatus).name });
        }
    }
}

module.exports = { GenerateEmbed };