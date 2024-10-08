const { ApplicationCommandType} = require("discord.js");
const bannedUsers = require("../../../../Global/Database/Bot/Banned.On.Bot")
module.exports = {
  name: "Block",
  type: ApplicationCommandType.User,
  onRequest: async (client, interaction) => {
    const int_member = interaction.member
    if(![...client.owners,interaction.guild.ownerId].some(x=> x == int_member.id)) return await interaction.reply({content:`- Bu komutu kullanamazsın.`, ephemeral:true})
    const member = interaction.guild.members.cache.get(interaction.targetId);
    const bannedUser = await bannedUsers.findOne({guildID:interaction.guild.id,userID:member.id});
    if(bannedUser){
    await bannedUsers.findOneAndDelete({guildID:interaction.guild.id,userID:member.id},{upsert:true})
    await interaction.reply({content:`> Bot üzerinde ki yasağı başarıyla kaldırıldı!`,ephemeral:true})
    }
    else 
    {
        await bannedUsers.findOneAndUpdate({guildID:interaction.guild.id,userID:member.id},{$set:{banning:int_member.id,date:Date.now()}},{upsert:true})
        await interaction.reply({content:`> Bot üzerinden kullanıcı yasaklandı.`,ephemeral:true})
    }

    }
};