const { ApplicationCommandType,EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");

module.exports = {
    name: "Avatar",
    type: ApplicationCommandType.User,
    onRequest: async (client, interaction) => {
        let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: interaction.targetUser.displayAvatarURL({dynamic:true})})]})
        await interaction.reply({
            content: `${interaction.targetUser.displayAvatarURL({dynamic:true})}`
            , components:[link] })
    }
};