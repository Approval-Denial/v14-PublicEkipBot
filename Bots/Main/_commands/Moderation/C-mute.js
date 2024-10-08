const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
const { Guild } = require("../../../../Global/Config/Guild");
const User = require("../../../../Global/Database/Users");
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan");
const penalty = require("../../../../Global/Database/penaltyDB/penaltys");
const mute = require("../../../../Global/Database/penaltyDB/mute");
const ms = require("ms");
const { log } = require("util");

const {general:{Tik,Cross,Time,Elmas,Yayın,Kamera,Ses,Metin,Sagok,Solok,Cop,Category,Warning,Woman,Man,Kup,Bir,İki,Uc,Dört,Beş,Alti,Yedi,Sekiz,Dokuz,Sıfır,Bot,Oynat,Davet,Coin,Kalp,Kiraz,Patlican,Web,Bilgisayar,Telefon,Slot,Level,Guard,OrtaBosBarGri,OrtaDoluBarYeşil,BaslangicBosBarGri,BaslangicDoluBarYeşil,SonBosBarGri,SonDoluBarYeşil,Oluştur,Düzenle,Ekle,Çıkar,Görünmez,Gorunur,KilitAçık,KilitKapalı}} = require("../../../../Global/Config/emojis")
class ChatMute extends Command {
  constructor(client) {
    super(client, {
      name: "C-mute",
      description: "ID'si girilen kullanıcıyı süreli bir şekilde sunucunun metin kanallarında susturur",
      usage: ".cmute @Approval/ID",
      category: "Moderation",
      aliases: ["sustur", "mute", "cmute"],
      enabled: true,
    });
  }

  async onRequest(client, message, args, embed) {
    if (
      [
        PermissionsBitField.Flags.Administrator,
        PermissionsBitField.Flags.ManageRoles,
        PermissionsBitField.Flags.BanMembers,
        PermissionsBitField.Flags.KickMembers,
      ].some((x) => message.member.permissions.has(x)) ||
      [
        ...roles.kurucuPerms,
        ...roles.üstYönetimPerms,
        ...roles.chatMuteStaffRole,
      ].some((x) => message.member.roles.cache.has(x))
    ) {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      if (!member) return message.ReturnReply("member not specified")
      if (member.user.bot) return message.ReturnReply("its a bot")
      if (!member.manageable) return message.ReturnReply("insufficient authorization")
      if (
        member.roles.highest.position >= message.member.roles.highest.position &&
        !client.owners.includes(message.author.id)
      )
        return message.ReturnReply("insufficient authorization")

      const data = await penalty.find();
      const cezakontrol = data.filter((x) =>
        x.penaltys.some(
          (x) => x.type === "CHAT-MUTE" && x.Punished === member.id && !x.Finished
        )
      ).length > 0;

      if (member.roles.cache.has(roles.chatMutedRole) || cezakontrol)
        return message.reply({
          content: `**${member.user.tag}**, Aktif cezası bulunduğu için susturma işlemi yapılamaz.`,
        });

      const cezaemojiID = await emojiBul("appEmoji_ceza");
      const cezalar = [
        {
          label: "Kışkırtma, Trol ve Dalgacı Davranış",
          description: "5 Dakika",
          emoji:{id:cezaemojiID},
          value: "kistirtmatrol1",
          sure:5*60000

        },
        {
          label: "Flood,Spam ve Capslock Kullanımı",
          description: "10 Dakika",
          emoji:{id:cezaemojiID},
          value: "floodspam"
          ,
          sure:10*60000
        },
        {
          label: "Metin Kanallarını Amacı Dışında Kullanmak",
          description: "10 Dakika",
          emoji:{id:cezaemojiID},
          value: "amacdisi",
          sure:10*60000
        },
        {
          label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış",
          description: "15 Dakika",
          emoji:{id:cezaemojiID},
          value: "kufurargo",
          sure:15*60000
        },
        {
          label: "Dini, Irki ve Siyasi değerlere Hakaret",
          description: "7 Gün",
          emoji:{id:cezaemojiID},
          value: "dinirk",
          sure:7*24*60*60000
        },
        {
          label: "Sunucu Kötüleme ve Kişisel Hakaret",
          description: "1 Saat",
          emoji:{id:cezaemojiID},
          value: "sunucukotuleme",
          sure:60*60000
        },
        {
          label: "Abartı, Küfür ve Taciz Kullanımı",
          description: "30 Dakika",
          emoji:{id:cezaemojiID},
          value: "abartikufur",
          sure:30*60000
        },
      ];
      const cezamenu = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder()
        .setCustomId("cezalar")
        .setPlaceholder("Metin kanalları cezaları")
          .setOptions(cezalar)
      );
      message.channel.send({
      
        embeds: [
          new GenerateEmbed()
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `Aşağıda bulunan menüden metin kanallarından susturmak istediğiniz ${member} için uygun olan ceza sebebini ve süresini seçiniz!`
            ),
        ],
        components:[cezamenu]
      }).catch(x=> {})
       .then(async (msg) => {
         const filter = async (button) => {
           await button.deferUpdate();
           return button.user.id === message.author.id;
         };

         const collector = msg.createMessageComponentCollector({
           filter,
           time: 30000,
         });

         collector.on("collect", async (menu) => {
           for (let i = 0; i < cezalar.length; i++) {
             const ceza = cezalar[i];
             if (ceza.value === menu.values[0]) {
               await infraction(
                 message.member,
                 member,
                 "CHAT-MUTE",
                 ceza.label,
                 ceza.sure,
                 message,
                 msg.edit({embeds:[new GenerateEmbed().setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL({ dynamic: true }),
                }).setDescription(
                  `${member} Kullanıcısı **${ceza.label}** sebebi nedeni ile \`${sureCevir(ceza.sure)}\` ChatMute atıldı`
                ),],components:[]})
               );
              
             }
           }
         });
       });
    } else {
      return message.ReturnReply("Cannot use command");
    }
  }
}

module.exports = ChatMute;
