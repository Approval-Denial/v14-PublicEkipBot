
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, StringSelectMenuBuilder, codeBlock } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { GenerateEmbed } = require("../../../../Global/Structures/Default.Embeds");
class genetik extends Command {
  constructor(client) {
    super(client, {
      name: "genetik",
      description: "Yokki",
      usage: ".genetik @Approval/ID",
      category: "Register",
      aliases: ["genetik","gerizekalı","özürlü","lasche"],

      enabled: true,
    });
  }
  async onRequest(client, message, args, embed) {
    if ([PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers,].some(x => message.member.permissions.has(x))
      ||
      [...roles.kurucuPerms, ...roles.üstYönetimPerms, ...roles.ortaYönetimPerms, ...roles.altYönetimPerms, ...roles.registerStaffRole].some(x => message.member.roles.cache.has(x))) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(["1250864384952242370","1250863947444129792"].some(x=> member.roles.cache.has(x))) {
         member.roles.remove(["1250864384952242370","1250863947444129792"]).then(async()=>{
            await member.roles.add(roles.unregisterRoles)
          })
          message.reply({content:"Genetik özürlü rolleri kişinin üstünden alındı."})
        } else {
          member.roles.set(["1250864384952242370","1250863947444129792"])
          message.reply({content:"Genetik özürlü rolleri kişinin üstüne verildi."})

        }
      } else return message.ReturnReply("Cannot use command")
  }
}

module.exports = genetik
