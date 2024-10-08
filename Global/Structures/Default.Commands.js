const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../Config/emojis")
class Command {
    constructor(client, {
		name = null,
		description = "Açıklama Belirtilmemiş.",
		usage = "Kullanım Belirtilmemiş.",
		category = "Other",
		aliases = [],
        permissions = [],
        onlyChannels = [],
        onlyRoles = [],
		enabled = true,
        cooldown = null,
        guildOwner= false,
        developer = false,
        location = undefined,
    }){
        this.client = client;
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.aliases = aliases;
        this.onlyChannels = onlyChannels;
        this.onlyRoles = onlyRoles;
        this.category = category;
        this.enabled = enabled;
        this.guildOwner = guildOwner;
        this.developer = developer;
        this.permissions = permissions;
        this.onRequest = this.onRequest;
        this.cooldown = cooldown;
        this.location = location
        if(!this.name) throw new Error('Komut ismi belirlenmediği için bu komut atlandı.');
        if(this.onLoad) this.onLoad(this.client);
    }

    on() {
        if(!this.enabled) return;
        this.client.commands.set(this.name, this);
        if(this.aliases && this.aliases.length > 0) this.aliases.forEach(alias => this.client.aliases.set(alias, this));
    }
    
}

module.exports = { Command };