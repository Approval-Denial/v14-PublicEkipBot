const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../Config/emojis")
class Event {
    constructor(client, {
		name = null,
		enabled = true
    }){
        this.client = client;
        this.name = name;
        this.enabled = enabled;
        if(!this.name) throw new Error('Komut ismi belirlenmediği için bu komut atlandı.');
    }

    on() {
        if(!this.enabled) return;
        this.client.on(this.name, this.onLoad);  
    }
    
}

module.exports = { Event };