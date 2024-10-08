
const { PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder,Events, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const penaltys = require('../../../../Global/Database/penaltyDB/penaltys');
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Ceza,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class penal extends Command {
    constructor(client) {
        super(client, {
            name: "penal",
            description: "Panel Kurulumu",
            usage: ".penal",
            category: "Approval",
            aliases: ["penal","yonetimpenal","cezapenal"],
            enabled: true,

            cooldown: 3500,
            guildOwner:true,
        });
    }
    async onLoad(client) {
    
    client.on("interactionCreate",async interaction=>{
        switch (interaction.customId) {
            case "only-penalty":
                const member = interaction.guild.members.cache.get(interaction.user.id);
                var penaltysData = await penaltys.find({userID:member.id})
                penaltysData =  penaltysData.filter(y=> y.penaltys.some(x=>x.Finished === false));
               if(!penaltysData.length || penaltysData.length == 0 ) return interaction.reply({content:"Herhangi bir cezanız görünmüyor.",ephemeral:true})
               
               interaction.reply({embeds:[
                new GenerateEmbed()
                .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL()})
                .setDescription(`<t:${(penaltysData.penaltys[0].SentencingDate/1000)}> tarihinde aldığın \`#${penaltysData.cezaId}\` numaralı cezanın detayları;`)
                .setColor('#0099ff')
                .setTitle('Ceza Bilgileri')
                .addFields({label:'Yetkili', value: `<@${penaltysData.penaltys[0].Staff}>`, inline:true},
                {label:'Ceza Alan', value: `<@${penaltysData.penaltys[0].Punished}>`, inline:true},
                {label:'Ceza Tarihi',value:  new Date(penaltysData.penaltys[0].SentencingDate).toLocaleString(), inline:true},
                {label:'Ceza Bitiş Tarihi',value:  new Date(penaltysData.penaltys[0].PenaltyEndTime).toLocaleString(), inline:true},
                {label:'Tamamlandı', value: penaltysData.penaltys[0].Finished ? 'Evet' : 'Hayır', inline:true},
                {label:'Ceza Türü', value: penaltysData.penaltys[0].type, inline:true},
                {label:'Sebep', value: penaltysData.penaltys[0].Reason,inline:true},
                {label:'Roller',value: penaltysData.penaltys[0].Roles.map(x=> `<@&${x}>`).join('')})
               ],ephemeral:true})
                break;
               case "penalty-points":
                let cezapuandata = await cezapuan.findOne({guildID:interaction.guild.id,userID:interaction.member.id})
                const cp = cezapuandata ? cezapuandata.cezapuan: 0;
               interaction.reply({content:`Mevcut ceza puanın \`${cp}\`. `,ephemeral:true})
                break;
                case "penaltys":
                    var data = await penaltys.find({guildID:interaction.guild.id,userID:interaction.member.id});
                    if(!data.length || data.length == 0) return interaction.reply({content:`Ceza geçmişin bulunamadı!`,ephemeral:true})
                    var ban = 0;
                    var cmute = 0;
                    var vmute =0;
                    var jail = 0;
                    var menuOptions = [];
                    for (let i = 0; i < data.length; i++) {
                        const cezalar = data[i];
                        await menuOptions.push({
                            label:`${(cezalar.penaltys[0].type).replace("UNJAIL","Uzaklaştırması Kaldırıldı").replace("VOICE-UNMUTE","Sesli Susturması Kaldırıldı").replace("CHAT-UNMUTE","Yazılı Susturması Kaldırıldı").replace("CHAT-MUTE","Yazılı Susturma").replace("VOICE-MUTE","Sesli Susturma").replace("JAIL","Uzaklaştırma").replace("UNBAN","Yasak Kaldırıldı").replace("BAN","Sunucu Yasağı")} - ${moment(cezalar.penaltys[0].SentencingDate).format("YYYY-MM-DD")}`,
                            description:`${cezalar.penaltys[0].Reason === undefined ? "Sebep Girilmemiş.":cezalar.penaltys[0].Reason}`,
                            emoji:{id : (cezalar.penaltys[0].Finished === true ? interaction.guild.findReaction(Tik,"ID") : interaction.guild.findReaction(Cross,"ID"))},
                            value:`${cezalar.cezaId}`
                        })
                        if(cezalar.penaltys[0].type == "CHAT-MUTE"){cmute++}
                        if(cezalar.penaltys[0].type == "VOICE-MUTE"){vmute++}
                        if(cezalar.penaltys[0].type == "JAIL"){jail++}
                        if(cezalar.penaltys[0].type == "BAN"){ban++}
                    }
                    interaction.reply({content:`\`${(ban+jail+vmute+cmute)}\` adet ceza bulundu! (Son 10 tanesi aşağıda sıralanadı!)\n ${codeBlock("md",`${menuOptions.splice(0,10).map(x=> `## ${x.label} \n> Sebep: ${x.description}\n> Durum: ${interaction.guild.emojis.cache.get(x.emoji)}`).join("\n")}`)}`,ephemeral:true})
                    break;
            default: 
                break;
        }
    })  
    }
    onRequest (client, message, args,embed) {
    message.channel.send({
        embeds:[new GenerateEmbed().setDescription(`Kurmak istediğin paneli aşağıda ki menüden seçerek kurabilirsin.`)],
        components:[
            new ActionRowBuilder()
            .setComponents(
                new StringSelectMenuBuilder()
                .setCustomId("panels")
                .setOptions(
                    {label:"Ceza Bilgi",description:undefined,value:"penalty-info",emoji:{name:"🧾"}},
                    {label:"Yönetim Paneli",description:undefined,value:"admin-penal",emoji:{name:"💠"}},
                )
            )
        ]
    }).then(async msg => {
        const filter = d => d.user.id == message.member.id 
        const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000 })
        collector.on('collect', async (s) => {
            await s.deferUpdate();
        if(s.values[0] === "penalty-info"){
        s.channel.send({embeds:[
            new GenerateEmbed()
            .setDescription(`Aşağıda ki butonları kullanarak aldığınız cezalara, aktif cezalarınıza ve ceza puanınıza bakabilirsiniz!`)
        ],
    components:[
        new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder().setCustomId("only-penalty").setLabel("Aktif Ceza").setStyle(ButtonStyle.Success).setEmoji(message.guild.findReaction(Ceza,"ID")),
            new ButtonBuilder().setCustomId("penaltys").setLabel("Cezalar").setStyle(ButtonStyle.Success).setEmoji(message.guild.findReaction(Category,"ID")),
            new ButtonBuilder().setCustomId("penalty-points").setLabel("Ceza Puan").setStyle(ButtonStyle.Success).setEmoji(message.guild.findReaction(Warning,"ID")),
        )
    ]
    })
    msg.delete();
    message.replyReaction(message.guild.findReaction(Cross,"ID"));
        }
        })
    })
    }
}

module.exports = penal