const { GuildMember } = require("discord.js");

/**
 * @param {Array} roles 
 * @returns {GuildMember} 
 */

GuildMember.prototype.changeRoles = function (roles = []) {
    let newRoles = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(roles);
    return this.roles.set(newRoles).catch(err => {});
}