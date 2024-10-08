const { Client, ApplicationCommandType,PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow , ActionRowBuilder, codeBlock} = require("discord.js");
const guardSicil = require("../../../../Global/Database/guardPenalty")
module.exports = {
    name: "Guard İşlem Geçmiş",
    type: ApplicationCommandType.User,
    userPermissions: PermissionsBitField.Flags.Administrator,
    onRequest:async (client, interaction) => {
    const user = await interaction.targetUser;
    const data = await guardSicil.findOne({guildID:interaction.guild.id,OrusbuEvladı:user.id});
    if(!data || (data && data.işlemler.length == 0)) return interaction.reply({content:`**Kişinin yaptığı işlemler yok veya bulunamadı!**`,ephemeral:true})
    interaction.reply({embeds:[new GenerateEmbed().setDescription(`${data.işlemler.map(x => `\`İşlem  :\` ${x.işlem}\n\`Tarih  :\` <t:${(x.Tarih/1000).toFixed()}> (<t:${(x.Tarih/1000).toFixed()}:R>)`).join("\n")}`)],ephemeral:true})
    }
};