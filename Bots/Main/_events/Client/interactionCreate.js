const { Collection, EmbedBuilder, InteractionType} = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const cooldown = new Collection();
const ms = require('ms');

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class interactionCreate extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate",
            enabled: true,
        });
    }
    
    async onLoad(interaction) {
        const slashcommands = client.slashcommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashcommands.autocomplete) {
				const choices = [];
				await slashcommands.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
        if(!slashcommands) return client.slashcommands.delete(interaction.commandName);
        await slashcommands.onRequest(client, interaction);
    }
}

module.exports = interactionCreate