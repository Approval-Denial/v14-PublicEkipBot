
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,codeBlock ,StringSelectMenuBuilder} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { post } = require("node-superfetch");
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const yetkiliyapdb = require("../../../../Global/Database/SystemDB/yetkiliyap")
const yetkiliyapstaffdb = require("../../../../Global/Database/SystemDB/yetkiliyap.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system");
const Guild = require("../../../../Global/Config/Guild");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class yetkiliSes extends Command {
    constructor(client) {
        super(client, {
            name: "yetkilises",
            description: "Yetkililerin ses denetimleri için kullanlır.",
            usage: ".yetkilises",
            category: "Staff",
            aliases: ["yetkiliSes","yses","ysay"],

            enabled: true,
 
            });
    }
    async onLoad(client) {
        client.on("voiceChannelLeave", async (member,channel)=>{
            if(!member.roles.cache.get("1066294817249837155")) return;
          const guild = channel.guild;
          if(guild.members.cache.filter(x=> x.roles.cache.has("1066294817249837155") && !x.voice.channel).size < 25){
            const sesteolmayanyetkili = await guild.members.cache.filter(x=> x.roles.cache.has("1066294817249837155") && !x.voice.channel)

            sesteolmayanyetkili.forEach(async member=>{
            await  member.send({content:`**Heyy ${member.user.tag}**
    \`${client.user.tag}\` tarafından **${guild.name}** sunucusunda her hangi bir ses kanalına çağrılıyorsun.
    `}).catch(erro=> message.channel.send({content:`**Heyyy ${member}**
    **${client.user.tag}** tarafından her hangi bir ses kanalına çağrılıyorsun.`}))
            })
          }
      })
    }
async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms].some(x=> message.member.roles.cache.has(x))){
  if(!roles || !roles.registerStaffRole || !message.guild.roles.cache.has(roles.registerStaffRole)) return message.ReturnReply("its a own")
  const yetkiliSayısı = await message.guild.members.cache.filter(member=>!member.user.bot && member.roles.cache.has(roles.registerStaffRole));
  const cevrimiciyetkili = await  message.guild.members.cache.filter(member=>!member.user.bot && member.roles.cache.has(roles.registerStaffRole) && (member.presence && member.presence.status !="offline"));
  const cevrimdisiyetkili = await  message.guild.members.cache.filter(member=>!member.user.bot && member.roles.cache.has(roles.registerStaffRole) &&(member.presence && member.presence.status == "offline"));
  const aktifyetkili = await  message.guild.members.cache.filter(member=>!member.user.bot && member.roles.cache.has(roles.registerStaffRole) && ((member.presence && member.presence.status !="offline") && (member.voice && member.voice.channel)));
  const sesteolmayanyetkili = await  message.guild.members.cache.filter(member=>!member.user.bot && member.roles.cache.has(roles.registerStaffRole) && ((member.presence && member.presence.status !="offline") && !member.voice.channel));
  const menu = await new ActionRowBuilder()
.addComponents(
await new StringSelectMenuBuilder()
.setCustomId("rolDenetim")
.setPlaceholder("Menüden bir işlem seçin!")
.setOptions(
    [
        {label:"📝",description:"Yetkilileri listele",value:"hepsi"},
        {label:"📢",description:"Yetkilileri sese davet et",value:"sesdavet"},
        {label:"🔉",description:"Seste ki yetkilileri listele",value:"sesteolan"},
        {label:"🔇",description:"Seste olmayan yetkilileri listele",value:"sesteolmayan"},
        {label:"🟢",description:"'Çevrimiçi' yetkilileri listele",value:"cevrimici"},
        {label:"🔴",description:"'Çevrimdışı' yetkilileri listele",value:"cevrimdisi"},
    ]
    )
)
    message.channel.send({embeds:[embed
    .setDescription(`Yetkili istatistikleri aşağıda verilmiştir. Menüyü kullanarak gerekli işlemleri yerine getirebilirsiniz.`+codeBlock("md",
`Toplam yetkili        : ${yetkiliSayısı.size}
Çevrimiçi yetkili     : ${cevrimiciyetkili.size}
Çevrimdışı yetkili    : ${cevrimdisiyetkili.size}
Aktif yetkili         : ${aktifyetkili.size}
Seste olmayan yetkili : ${sesteolmayanyetkili.size}`))
    ],components:[menu]})
.then(async msg =>{
  var filter = (i) => i.user.id === message.member.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
  collector.on('collect', async (interaction) => {
      await interaction.deferUpdate();
      if(interaction.values[0] == "hepsi"){
      var uyeListe = [];
      yetkiliSayısı.forEach(member=>{uyeListe.push({memberTag:member.user.tag,online:member.presence ? true:false,voice:member.voice && member.voice.channel? true:false})})
      let list = chunkify(uyeListe,20);
      for (let index = 0; index < list.length; index++) {
          const listeİcerik = list[index];
      interaction.channel.send({
          content:`${codeBlock("md",
          `${listeİcerik.map(x=> `# ${x.memberTag}\n${x.online == true ? `< Çevrimiçi 🟢`:`> Çevrimdışı`}\n${x.voice == true ? `< Seste 🔉`:`> Seste Değil 🔇`}`).join("\n")}`)}`
      })
      }
      }
      if(interaction.values[0] == "sesteolan"){
          if(aktifyetkili.size == 0) return interaction.channel.send({content:`Ses kanallarında yetkili bulunamadı!`})
          var uyeListe = [];
          aktifyetkili.forEach(member=>{uyeListe.push({memberTag:member.user.tag,channel:member.voice.channel.name,memberId:member.id})})
          let list = chunkify(uyeListe,20);
          for (let index = 0; index < list.length; index++) {
              const listeİcerik = list[index];
          interaction.channel.send({
              content:`**Seste olan yetkililer:**\n${codeBlock("md",
              `${listeİcerik.map(x=> `# ${x.memberTag}\n< Ses Kanalı: #${x.channel}`).join("\n")}`)}`
          })
          }
      }
      if(interaction.values[0] == "sesteolmayan"){
          if(sesteolmayanyetkili == 0) return interaction.channel.send({content:"garip.. tüm yetkililer seste görünüyor ? :D"})
          var uyeListe = [];
          sesteolmayanyetkili.forEach(member=>{uyeListe.push({memberId:member.id})})
          let list = chunkify(uyeListe,20);
          for (let index = 0; index < list.length; index++) {
              const listeİcerik = list[index];
          interaction.channel.send({
              content:`**Seste olmayan yetkililer:**\n${codeBlock("md",
              `${listeİcerik.map(x=> `<@${x.memberId}>`).join(", ")}`)}`
          })
          }   
      }
      if(interaction.values[0] == "sesdavet"){
        if(sesteolmayanyetkili == 0) return interaction.channel.send({content:"garip.. tüm yetkililer seste görünüyor ? :D"})
        var uyeListe = [];
        sesteolmayanyetkili.forEach(async member=>{
        await  member.send({content:`**Heyy ${member.user.tag}**
\`${message.member.user.tag}\` tarafından **${message.guild.name}** sunucusunda her hangi bir ses kanalına çağrılıyorsun.
`}).catch(erro=> message.channel.send({content:`**Heyyy ${member}**
**${message.member.user.tag}** tarafından her hangi bir ses kanalına çağrılıyorsun.`}))
        })
    }
      if(interaction.values[0] == "cevrimici"){
          var uyeListe = [];
          cevrimiciyetkili.forEach(member=>{uyeListe.push({memberTag:member.user.tag})})
          let list = chunkify(uyeListe,20);
          for (let index = 0; index < list.length; index++) {
              const listeİcerik = list[index];
          interaction.channel.send({
              content:`**Çevrimiçi yetkililer:**\n${codeBlock("md",
              `${listeİcerik.map(x=> `# ${x.memberTag}`).join("\n")}`)}`
          })
          }      
      }
      if(interaction.values[0] == "cevrimdisi"){
          var uyeListe = [];
          cevrimdisiyetkili.forEach(member=>{uyeListe.push({memberId:member.id})})
          let list = chunkify(uyeListe,20);
          for (let index = 0; index < list.length; index++) {
              const listeİcerik = list[index];
          interaction.channel.send({
              content:`**Çevrimdışı yetkililer:**\n${codeBlock("md",
              `${listeİcerik.map(x=> `<@${x.memberId}>`).join(", ")}`)}`
          })
          }             
      }
  })
})
    }else return message.ReturnReply("Cannot use command")
  }
}
module.exports = yetkiliSes;
