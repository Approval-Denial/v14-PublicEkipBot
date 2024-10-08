const { ApplicationCommandType,EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , codeBlock} = require("discord.js");
const musteri = require("../../../../Global/Database/Musteri")
module.exports = {
    name: "sifrem",
    description: "Web panel şifresini gösterir.",
    type: ApplicationCommandType.ChatInput,
    onRequest: async (client, interaction) => {
const member = interaction.user
    const data = await musteri.findOne({userID:member.id})
    if(data.only == true){
  interaction.reply({content:`
\`Şifreniz  :\` **${data.password}**
\`Yenilenme :\` **<t:${Math.floor(data.passwordRenewalDate/1000)}:R>**`,ephemeral:true})
} else {
interaction.reply({content:`Müşteri olmadığınız için panel erişim şifresini alamazsınız.`,ephemeral:true})
}

    }
};