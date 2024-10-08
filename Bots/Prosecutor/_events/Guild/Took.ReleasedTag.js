const { Event } = require("../../../../Global/Structures/Default.Events");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { EmbedBuilder,Events,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const guildTagSystem = require("../../../../Global/Database/SystemDB/guildTag")
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const tagaldirstaff = require("../../../../Global/Database/SystemDB/tagaldir.staff")
const taglialimdb = require("../../../../Global/Database/SystemDB/guild.tagli.alim")
const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class TookReleasedTag extends Event {
    constructor(client) {
        super(client, {
            name: Events.UserUpdate,
            enabled: true,
        });    
    }    

 async   onLoad(oldUser,newUser) {
const guild = await client.guilds.cache.get(Guild.ID)
const tagsistem = await guildTagSystem.findOne({guildID:guild.id})
let only = tagsistem ? tagsistem.only : false;
if(only == true) {
const tagLog = await guild.channels.cache.get(tagsistem.tagLog);
const embed = new GenerateEmbed().setAuthor({name:guild.name,iconURL:guild.iconURL({dynamic:true})}).setFooter({text:"Took/Released Tag System | Developed By Luppux.",iconURL:client.user.avatarURL()})
if(tagsistem.Type == "Public"){
const eskiMember = guild.members.cache.get(oldUser.id);
const yeniMember = guild.members.cache.get(newUser.id);
const tag = tagsistem.Tag;
const unTag = tagsistem.unTag;

if((!yeniMember.roles.cache.has(tagsistem.tagRol)) && (newUser.displayName.includes(tag))){
if(tagLog) await tagLog.send({embeds:[new GenerateEmbed().setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adına tagımızı (\`${tagsistem.Tag}\`) aldı.
**▬▬▬▬▬▬▬▬▬▬(\`${guild.members.cache.filter(x=> x.user.displayName.includes(tagsistem.Tag)).size}\`)▬▬▬▬▬▬▬▬▬▬**
\`•\` __Eski kullanıcı adı__: **${oldUser.displayName}**
\`•\` __Yeni kullanıcı adı__: **${newUser.displayName}**`)]});
await yeniMember.setNickname(yeniMember.displayName.replace(unTag,tag)).catch(x=>{} )
await yeniMember.roles.add(tagsistem.tagRol).catch(x=>{} )
};
if((yeniMember.roles.cache.has(tagsistem.tagRol)) && (!newUser.displayName.includes(tag))){
    let taglialimdata = await taglialimdb.findOne({guildID:guild.id});
    let taglialimonly = taglialimdata ? taglialimdata.only:false;
    if(tagLog) await tagLog.send({embeds:[new GenerateEmbed().setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adından tagımızı (\`${tagsistem.Tag}\`) kaldırdı.
**▬▬▬▬▬▬▬▬▬▬(\`${guild.members.cache.filter(x=> x.user.displayName.includes(tagsistem.Tag)).size}\`)▬▬▬▬▬▬▬▬▬▬**
\`•\` __Eski kullanıcı adı__: **${oldUser.displayName}**
\`•\` __Yeni kullanıcı adı__: **${newUser.displayName}**`)]})
    const tagaldirdb = await tagaldir.findOne({guildID:guild.id,userID:oldUser.id})
    const onlytagaldir = tagaldirdb ? tagaldirdb.only : false;
if(onlytagaldir == true){
await tagaldirstaff.findOneAndUpdate({guildID:guild.id,userID:tagaldirdb.Staff},{$pull:{users:{memberId:oldUser.id}},$inc:{count:-1}},{upsert:true})
await tagaldir.findOneAndDelete({guildID:guild.id,userID:oldUser.id},{upsert:true})
}
await yeniMember.setNickname(yeniMember.displayName.replace(tag,unTag)).catch(x=>{} )
if(taglialimonly == true) {
if([roles.boosterRole,roles.vipRole].some(x=> yeniMember.roles.cache.has(x)))  await yeniMember.roles.remove(tagsistem.tagRol).catch(x=>{} )
else{ yeniMember.roles.set(roles.unregisterRoles).catch(x=>{} )}
}
else {
    let roller = await yeniMember.roles.cache.filter(x=> x.id != guild.id && [...roles.manRoles,...roles.womanRoles,roles.boosterRole].some(y=> y == x.id)).map(x=> `${x.id}`);
    await yeniMember.roles.set(roller)
}

    };
};
if(tagsistem.Type == "Ekip"){
    const eskiMember = guild.members.cache.get(oldUser.id);
    const yeniMember = guild.members.cache.get(newUser.id);   
    const isimtaglari = tagsistem.nameTags;
    const etikettaglari = tagsistem.NmberTag;
    const tag = tagsistem.Tag;
const unTag = tagsistem.unTag;
let taglialimdata = await taglialimdb.findOne({guildID:guild.id});
const taglialimonly = taglialimdata ? taglialimdata.only:false;
if(!yeniMember.roles.cache.has(tagsistem.tagRol) && (!isimtaglari.some(tag=> oldUser.username.includes(tag))  && isimtaglari.some(tag=> newUser.username.includes(tag))) || (oldUser.discriminator != etikettaglari && newUser.discriminator == etikettaglari)) {
    if(tagLog) await tagLog.send({embeds:[new GenerateEmbed().setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adına tagımızı aldı.
    **▬▬▬▬▬▬▬▬▬▬(\`${guild.members.cache.filter(member => isimtaglari.some(tag => member.user.username.includes(tag)) || member.user.discriminator == etikettaglari).size}\`)▬▬▬▬▬▬▬▬▬▬**
    \`•\` __Eski kullanıcı adı__: **${oldUser.tag}**
    \`•\` __Yeni kullanıcı adı__: **${newUser.tag}**`)]});
    await yeniMember.setNickname(yeniMember.displayName.replace(unTag,tag));
    await yeniMember.roles.add(tagsistem.tagRol)
}
if(eskiMember.roles.cache.has(tagsistem.tagRol) && (isimtaglari.some(tag=> oldUser.username.includes(tag))  && !isimtaglari.some(tag=> newUser.username.includes(tag))) || (oldUser.discriminator == etikettaglari && newUser.discriminator != etikettaglari)) {
    if(tagLog) await tagLog.send({embeds:[new GenerateEmbed().setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adına tagımızı bıraktı.
    **▬▬▬▬▬▬▬▬▬▬(\`${guild.members.cache.filter(member => isimtaglari.some(tag => member.user.username.includes(tag)) || member.user.discriminator == etikettaglari).size}\`)▬▬▬▬▬▬▬▬▬▬**
    \`•\` __Eski kullanıcı adı__: **${oldUser.tag}**
    \`•\` __Yeni kullanıcı adı__: **${newUser.tag}**`)]});
    const tagaldirdb = await tagaldir.findOne({guildID:guild.id,userID:oldUser.id})
    const onlytagaldir = tagaldirdb ? tagaldirdb.only : false;
if(onlytagaldir == true){
await tagaldirstaff.findOneAndUpdate({guildID:guild.id,userID:tagaldirdb.Staff},{$pull:{users:{memberId:oldUser.id}},$inc:{count:-1}},{upsert:true})
await tagaldir.findOneAndDelete({guildID:guild.id,userID:oldUser.id},{upsert:true})
}
await yeniMember.setNickname(yeniMember.displayName.replace(tag,unTag));
if(taglialimonly == true) {
if([roles.boosterRole,roles.vipRole].some(x=> yeniMember.roles.cache.has(x))) return await yeniMember.roles.remove(tagsistem.tagRol);
else{ yeniMember.roles.set(roles.unregisterRoles)}
}
else {
    let roller = await yeniMember.roles.cache.filter(x=> x.id != guild.id && [...roles.manRoles,...roles.womanRoles,roles.boosterRole].some(y=> y == x.id)).map(x=> `${x.id}`);
    await yeniMember.roles.set(roller)
}
}
};
};
 }
}
module.exports = TookReleasedTag