const { Client, ApplicationCommandType,PermissionsBitField,StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow , ActionRowBuilder, codeBlock,seelct} = require("discord.js");
const guard = require("../../../../Global/Database/Guard");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
module.exports = {
    name: "guvenli-liste",
    description: "Güvenli Kategorileri ve içindekiler",
    type: ApplicationCommandType.ChatInput,
    userPermissions: PermissionsBitField.Flags.Administrator,
    onRequest:async (client, interaction) => {
if(![...client.owners,interaction.guild.ownerId].includes(interaction.user.id)) return interaction.reply({content:`Bu komutu sadece <@${interaction.guild.ownerId}> (\`Taç Sahibi\`) ve ${client.owners.map(x=> `<@${x}>`).map(x=> `<@${x}>`).join(", ")} kullanabilir!`,ephemeral:true})
const guardWhitelistData = await guard.findOne({guildID:interaction.guild.id});
var full = guardWhitelistData ? guardWhitelistData.SafedMembers : []
var server = guardWhitelistData ? guardWhitelistData.serverSafedMembers : []
var roles = guardWhitelistData ? guardWhitelistData.roleSafedMembers : []
var channels = guardWhitelistData ? guardWhitelistData.channelSafedMembers : []
var banAndkick = guardWhitelistData ? guardWhitelistData.banKickSafedMembers : []
var emojiAndSticker = guardWhitelistData ? guardWhitelistData.emojiStickers : []
interaction.reply({
    embeds:[
        new GenerateEmbed()
    .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL({dynamic:true})})
    .setDescription(`**<@${client.owners[0]}> tarafından \`${interaction.guild.name}\` sunucusu için yapılan __Guard (Koruma)__ sisteminin sunucudaki her yetki kategorisi için yapılan korumalar ve korumalardan etkilenmeyecek kişilerin listeleri aşağıda verilmiştir.**

### Güvenlik Kategorileri;

- Full Access **(${full.length})**
  - ${full.map(x=> `<@${x}>`).join(", ")}
- Server Management **(${server.length})**
  - ${server.map(x=> `<@${x}>`).join(", ")}
- Role Management **(${roles.length})**
  - ${roles.map(x=> `<@${x}>`).join(", ")}
- Channel Management **(${channels.length})**
  - ${channels.map(x=> `<@${x}>`).join(", ")}
- Emoji and Sticker Management **(${emojiAndSticker.length})**
  - ${emojiAndSticker.map(x=> `<@${x}>`).join(", ")}
- Ban and Kick Management **(${banAndkick.length})**
  - ${banAndkick.map(x=> `<@${x}>`).join(", ")}`)
    ]
})
}
};