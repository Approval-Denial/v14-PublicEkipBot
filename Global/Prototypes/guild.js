const { Guild } = require("discord.js");
const emojis = require("../Config/emojis");


/**
 * 
 * @param {Number} time Enter the Emoji to be find
 * @returns {Guild}
 */
Guild.prototype.findReaction = function (NoR,searchType = "normal") {
    const reaction = this.emojis.cache.find(e => e.id === NoR || e.name === NoR)
    if (reaction){
     if(searchType !== "normal"){
    return reaction.id;
     }else {
        return reaction;
     }
    }
    else {
        const defaultReaction = emojis.default.find(x => x.name === NoR)
        if (defaultReaction) return defaultReaction.emoji;
        else {
            console.log(`"${NoR}" Emojisi sunucuda arandı fakat bulunamadı.`)
            return false;
        }
    }
}

/**
 * 
 * @param {String} user Tag or enter id to find the channel
 * @returns {Guild}
 */
Guild.prototype.findChannel = function (NoR){
    const channel = this.channels.cache.find(c => c.id === NoR || c.name === NoR)
    if(channel) return channel;
    else {
        console.log(`"${NoR}" Kanalı sunucuda arandı fakat bulunamadı.`)
        return false;
    }
}

/**
 * 
 * @param {String} user Tag or enter id to find the role
 * @returns {Guild}
 */
Guild.prototype.findRole = function (NoR){
    const role = this.roles.cache.find(c => c.id === NoR || c.name === NoR)
    if(role) return role;
    else {
        console.log(`"${NoR}" rolü sunucuda arandı fakat bulunamadı.`)
        return false;
    }
}

/**
 * 
 * @param {String} user Tag or enter id to find the user
 * @returns {Guild}
 */

Guild.prototype.findMember = function (user){
let newUser = ["<",">","@"].some(x=> user.includes(x)) ? user.match(/\d+/)[0] : user;
const member = this.members.cache.find(e => e.id === newUser);
if(member) return member;
else {
    console.log(`"${NoR}" kullanıcı sunucuda arandı fakat bulunamadı.`)
    return false;  
}
}