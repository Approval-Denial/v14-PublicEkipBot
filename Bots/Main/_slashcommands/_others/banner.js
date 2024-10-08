const { ApplicationCommandType,EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");

module.exports = {
    name: "Banner",
    type: ApplicationCommandType.User,
    onRequest: async (client, interaction) => {
        const member = interaction.targetUser;
        let bannerurl = await GetBanner(member.id,client, interaction)
        let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: bannerurl})]})
        await interaction.reply({
            content: `${bannerurl}`
            , components:[link] })
    }
};