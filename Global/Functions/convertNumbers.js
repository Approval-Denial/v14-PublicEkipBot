const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../Config/emojis");

function convertNumbers(sayi,guild) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
    if (basamakiki) {
      basamakbir = basamakbir.replace(/([0-9])/g, d => {
        return {
          '0': guild.findReaction(Sıfır),
          '1': guild.findReaction(Bir),
          '2': guild.findReaction(İki),
          '3': guild.findReaction(Uc),
          '4': guild.findReaction(Dört),
          '5': guild.findReaction(Beş),
          '6': guild.findReaction(Alti),
          '7': guild.findReaction(Yedi),
          '8': guild.findReaction(Sekiz),
          '9': guild.findReaction(Dokuz),
        }
        [d];
      })
    }
    return basamakbir;
  }

  module.exports = {convertNumbers}