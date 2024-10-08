const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const YasaklıTagDB = require("../../../../Global/Database/SystemDB/guildBannedTag")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class yasaklıtag extends Command {
    constructor(client) {
        super(client, {
            name: "yasaklıtag",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".yasaklıtag",
            category: "Management",
            aliases: ["yasaktag","ys","yasakt","ytag","yasaklıtag"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms].some(x=> message.member.roles.cache.has(x))){
if(!args[0]) return message.reply({content:"**Yasaklı Tag** Sistemine hoşgeldin, aşağıda ki komutları kullanarak sistemi açabilir/kapatabilirsin ve yasaklı ekle/çıkar/liste gibi işlemleride yapabilirsin. ```md\n#.yasaklıtag aç\n#.yasaklıtag kapat\n#.yasaklıtag ekle isim/etiket\n#.yasaklıtag çıkar\n- Açılan menüden istediğiniz yasaklı tag ile listeme/çıkarma gibi işlemler yapabilirsiniz.\n```"})
if(args[0] == "aç"){
    await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$set:{only:true}},{upsert:true})
    return message.reply({content:"**Yasaklı Tag** Sistemi Açıldı."})
}
if(args[0] == "kapat"){
    await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$set:{only:false}},{upsert:true})
   return message.reply({content:"**Yasaklı Tag** Sistemi Kapatıldı."})
}
if(args[0] == "ekle"){
    const tagdata = await tagsistem.findOne({guildID:message.guild.id})
    const log = await message.guild.channels.cache.find(x => x.name == "yasaklıtag_log");
    if(args[1]=="isim"){
        const tag = await args[2];
        if(!tag) return message.reply({content:"Bir tag girmeniz gerekmektedir."})
        if(((tagdata.only == true) && tagdata.Tag) && (tag == tagdata.Tag)) return message.reply({content:"`Şaka mısın ?:D aynen kardeşim tagı şuanda yasaklıya attın XD`"})
        await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$push:{symbolTags:tag}, $set:{only:true}},{upsert:true})
        let yasaklıtaglılar = await message.guild.members.cache.filter(member => !member.user.bot && member.user.username.includes(tag))
        await message.channel.send({content:`"${tag}" tagında toplamda **${yasaklıtaglılar.size}** kişi bulundu, yasaklı tag rolü hepsine veriliyor ve Dm kutularına mesaj yollanıyor.`})
        yasaklıtaglılar.forEach(async member => {
        if (!member.manageable) return;
        await member.send({content:`Merhaba ${member},\nİsminde yasaklı tag (**${tag}**) bulundurduğun için **${message.guild.name}** sunucusundan geçiçi olarak uzaklaştırıldın.
Bunun bir yanlışlık olduğunu düşünüyorsan __Yönetm Ekibi__ ile iletişime geçebilirsin.
İsminde ki yasaklı tagı çıkarıp sunucuya tekrardan erişim sağlayabilirsin.
${tagdata ? tagdata.Tag !=undefined ?`İstersende tagımızı (**${tagdata.tag}**) ismine alabilirsin.`:`` : ""}`}).catch(async err=>{
if(log) await log.send({content:`Merhaba ${member},\nİsminde yasaklı tag (**${tag}**) bulundurduğun için **${message.guild.name}** sunucusundan geçiçi olarak uzaklaştırıldın.
Bunun bir yanlışlık olduğunu düşünüyorsan __Yönetm Ekibi__ ile iletişime geçebilirsin.
İsminde ki yasaklı tagı çıkarıp sunucuya tekrardan erişim sağlayabilirsin.
${tagdata ? tagdata.Tag !=undefined ?`İstersende tagımızı (**${tagdata.tag}**) ismine alabilirsin.`:`` : ""}`})
})
let roller = await member.roles.cache.filter(x=> x.id != message.guild.id && x.id != roles.boosterRole).map(x=> x.id)
await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$push:{members:{memberID:member.id,roles:roller,bannedTag:tag}}},{upsert:true})
await member.roles.remove(roller)
setTimeout(async() => {
    await member.roles.add(roles.bannedTagRole)
}, 1000);        });
    }
    if(args[1]=="etiket"){
        const etiketTag = await args[2];
        if(!etiketTag) return message.reply({content:"Bir etiket tagı girmeniz gerekmektedir."})
        if(!Number(etiketTag)) return message.reply({content:"Bir etiket tagı girmeniz gerekmektedir."})
        await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$push:{labelTags:etiketTag}, $set:{only:true}},{upsert:true})
        let yasaklıtaglılar = await message.guild.members.cache.filter(member => !member.user.bot && member.user.discriminator == etiketTag)
        await message.channel.send({content:`"${etiketTag}" tagında toplamda **${yasaklıtaglılar.size}** kişi bulundu, yasaklı tag rolü hepsine veriliyor ve Dm kutularına mesaj yollanıyor.`})
        yasaklıtaglılar.forEach(async member => {
        if (!member.manageable) return;
        await member.send({content:`Merhaba ${member},\nİsminde yasaklı tag (**${etiketTag}**) bulundurduğun için **${message.guild.name}** sunucusundan geçiçi olarak uzaklaştırıldın.
Bunun bir yanlışlık olduğunu düşünüyorsan __Yönetm Ekibi__ ile iletişime geçebilirsin.
İsminde ki yasaklı tagı çıkarıp sunucuya tekrardan erişim sağlayabilirsin.
`}).catch(async err=>{
if(log) await log.send({content:`Merhaba ${member},\nİsminde yasaklı tag (**${etiketTag}**) bulundurduğun için **${message.guild.name}** sunucusundan geçiçi olarak uzaklaştırıldın.
Bunun bir yanlışlık olduğunu düşünüyorsan __Yönetm Ekibi__ ile iletişime geçebilirsin.
İsminde ki yasaklı tagı çıkarıp sunucuya tekrardan erişim sağlayabilirsin.`})
})
let roller = await member.roles.cache.filter(x=> x.id != message.guild.id && x.id != roles.boosterRole).map(x=> x.id)
await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$push:{members:{memberID:member.id,roles:roller,bannedTag:etiketTag}}},{upsert:true})
await member.roles.remove(roller)
setTimeout(async() => {
    await member.roles.add(roles.bannedTagRole)
}, 1000);
        });
    }
}
if(args[0] == "çıkar"){
    const yasaklıtaglar = await YasaklıTagDB.findOne({guildID:message.guild.id})
    const log = await message.guild.channels.cache.find(x => x.name == "yasaklıtag_log");

    if(args[1] == "isim"){
        const tag = await args[2];
        if(!tag) return message.reply({content:"Bir tag girmeniz gerekmektedir."}) 
        if(!yasaklıtaglar.symbolTags.includes(tag)) return message.reply({content:"Girdiğiniz tag yasaklı taglar arasında bulunamadı."});
        let yasaklıtaglılar = await message.guild.members.cache.filter(member =>!member.user.bot && member.user.username.includes(tag))
        await message.channel.send({content:`"${tag}" Tagında **${yasaklıtaglılar.size}** kişi bulundu ve sistemde bulunan rolleri geri veriliyor yoksa kayıtsıza atılıcak.`});
        await YasaklıTagDB.find({guildID:message.guild.id}, async (err,data)=>{
            var yasakıtagrolündekiler = [];
            data[0].members.forEach(async x =>{ yasakıtagrolündekiler.push({memberID: x.memberID, roles:x.roles});})
            yasakıtagrolündekiler.filter(bilgiler => message.guild.members.cache.get(bilgiler.memberID) && message.guild.members.cache.get(bilgiler.memberID).roles.cache.has(roles.bannedTagRole))
            .forEach(async veri =>{
            let memberx = await message.guild.members.cache.get(veri.memberID)
            await memberx.roles.remove(roles.bannedTagRole);
            setTimeout(async() => {await memberx.roles.add(veri.roles);}, 1000);
            await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$pull:{members:{memberID:memberx.id,bannedTag:tag}}},{upsert:true})
            await memberx.send({content:`Merhaba ${memberx}, **${message.guild.name}** Sunucusunda isminde bulunan "${tag}" yasaklaması kaldırıldı. Sunucuya tekrardan erişebilirsin.`})
            .catch(err => {if(log) log.send({content:`Merhaba ${memberx}, **${message.guild.name}** Sunucusunda isminde bulunan "${tag}" yasaklaması kaldırıldı. Sunucuya tekrardan erişebilirsin.`})})
            })
            await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$pull:{symbolTags:tag}},{upsert:true})
    
        })

    }
    if(args[1] == "etiket"){
        const etiketTag = await args[2];
        if(!etiketTag) return message.reply({content:"Bir etiket tagı girmeniz gerekmektedir."})
        if(!Number(etiketTag)) return message.reply({content:"Bir etiket tagı girmeniz gerekmektedir."})
        if(!yasaklıtaglar.labelTags.includes(etiketTag)) return message.reply({content:"Girdiğiniz tag yasaklı taglar arasında bulunamadı."});
        let yasaklıtaglılar = await message.guild.members.cache.filter(member =>!member.user.bot && member.user.discriminator == etiketTag)
        await message.channel.send({content:`"${etiketTag}" Tagında **${yasaklıtaglılar.size}** kişi bulundu ve sistemde bulunan rolleri geri veriliyor yoksa kayıtsıza atılıcak.`});
        await YasaklıTagDB.find({guildID:message.guild.id}, async (err,data)=>{
            var yasakıtagrolündekiler = [];
        data[0].members.forEach(x =>{yasakıtagrolündekiler.push({memberID: x.memberID, roles:x.roles});});

        yasakıtagrolündekiler.filter(bilgiler => message.guild.members.cache.get(bilgiler.memberID) && message.guild.members.cache.get(bilgiler.memberID).roles.cache.has(roles.bannedTagRole))
        .forEach(async veri =>{
        let memberx = await message.guild.members.cache.get(veri.memberID)
        await memberx.roles.set(memberx.roles.cache.has(roles.boosterRole) ? [...veri.roles,roles.boosterRole]:veri.roles);
        await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$pull:{members:{memberID:memberx.id,bannedTag:etiketTag}}},{upsert:true})
        await memberx.send({content:`Merhaba ${memberx}, **${message.guild.name}** Sunucusunda isminde bulunan "${etiketTag}" yasaklaması kaldırıldı. Sunucuya tekrardan erişebilirsin.`})
        .catch(err => {if(log) log.send({content:`Merhaba ${memberx}, **${message.guild.name}** Sunucusunda isminde bulunan "${etiketTag}" yasaklaması kaldırıldı. Sunucuya tekrardan erişebilirsin.`})})
        })
        await YasaklıTagDB.findOneAndUpdate({guildID:message.guild.id},{$pull:{labelTags:etiketTag}},{upsert:true})

    })
       

    }
}
if(args[0] == "liste"){
const yasaktag = await YasaklıTagDB.findOne({guildID:message.guild.id});
var isimtagları = yasaktag.symbolTags || [];
var etikettagları = yasaktag.labelTags || [];
var tümtaglar = [...isimtagları,...etikettagları]
var menuicerik =[];
tümtaglar.forEach(taglar => menuicerik.push({label:taglar,description:`Tagın detaylı bilgileri için tıklayın.`, value:taglar}))
let row = await new ActionRowBuilder()
.addComponents(
await new StringSelectMenuBuilder()
.setCustomId("yasaklıtaglar")
.setOptions(menuicerik)
)
message.channel.send({content:`**Aşağıda verilen menüde yasaklı taglar detaylı bir şekilde görüntüleyebilirsiniz.**`, components:[row]}).then(async msg =>{
    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000 })
    collector.on('collect', async (menu) => {
    for (let i = 0; i < menu.values.length; i++) {
        const secim = menu.values[i];
    if(secim == menu.values[0]) {
    const tagdakiler = await menu.guild.members.cache.filter(member => !member.user.bot && (member.user.username.includes(menu.values[0]) || member.user.discriminator == menu.values[0]))
    menu.reply({content:`**${menu.values[0]}** tagında toplam **${tagdakiler.size}** kişi bulundu. 10 tanesi aşağıda sıralanadı. \n\n **${tagdakiler.map(x=>`${x.user.tag} | <t:${(x.joinedTimestamp/1000).toFixed()}> (<t:${(x.joinedTimestamp/1000).toFixed()}:R>)`).splice(0,10).join("\n")}**`,ephemeral:true})
    }
    }
    })
})
}
    }else return message.ReturnReply("Cannot use command")
    }
}

module.exports = yasaklıtag
