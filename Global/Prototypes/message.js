const { Message, codeBlock } = require("discord.js")
const { GenerateEmbed } = require("../Structures/Default.Embeds")
const { general: { Cross,Warning } } = require("../Config/emojis")

/**
 * 
 * @param {String} Emoji Enter the Emoji to be added
 * @returns {Message}
 */
Message.prototype.replyReaction = function (Emoji) {
    this.react(Emoji).catch(err => { })
}


/**
 * @param {String} err User with banned tag
 * @param {String} err registered user
 * @param {String} err suspicious user
 * @param {String} err Penalized user
 * @param {String} err its a developer
 * @param {String} err insufficient authorization
 * @param {String} err its a own 
 * @param {String} err its a bot
 * @param {String} err member not specified
 * @param {String} err name not specified
 * @param {String} err age not specified
 * @param {String} err not tagged
 * @returns {Message}
 */

Message.prototype.ReturnReply = function (err) {
    if (err == "Not booster") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`İkinizde aynı ${"ses".bold} kanalında bulunuyorsunuz.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }
    if (err == "You are on the same channel") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`İkinizde aynı ${"ses".bold} kanalında bulunuyorsunuz.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "You're not in the audio channel") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Her hangi bir ${"ses".bold} kanalında değilsin.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }


    if (err == "Not in audio channel") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Kullanıcı her hangi bir ${"ses".bold} kanalında değil.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No duration specified") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bu işlem için ${"süre".bold} girilmelisiniz.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No one in the role") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Rolde".bold} sahip kimse bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No role id") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Rol".bold} id girilmedi.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No channel id") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Kanal".bold} id girilmedi.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "Category not found") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Belirtilen ${"Kategori".bold} bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "Role deleted") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Rol".bold} silindiği için işlem dururuldu.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No one is there") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Rolü".bold} dağıtıcak kimse bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "Data not found") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`İstenilen ${"veri".bold} arandı fakat bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }
        
    if (err == "No channel") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Belirtilen ${"Kanal".bold} bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }
    
    if (err == "No role") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Belirtilen ${"Rol".bold} bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }
  
    if (err == "Cannot use command") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bu ${"Komutu".bold} kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }


    if (err == "This system is closed") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Sistem".bold} kapalı olduğu için bu komutu kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No name data") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Kullanıcının ${"isim".bold} verisi bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "Not listening to songs") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Kullanıcı ${"Spotify".bold} üstünden şarkı dinlemiyor.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "API Limit") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"API".bold} bu işlemi yapmana izin vermiyor.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }


    if (err == "not tagged") {
        this.replyReaction(this.guild.findReaction(Warning));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Kayıt işlemini tamamlamak için kullanıcının tagımızı almalı, Sunucuya ${"takviye".underline} yapmalı veya ${"üst yönetim".underline.bold} tarafından ${"VIP".bold} olarak kaydedilmelidir.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "indifferent") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Kayıtsız".bold} kullanıcılar üstünde bu komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }


    if (err == "registered user") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Kayıtlı".bold} kullanıcılar üstünde bu komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "User with banned tag") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Yasaklı Tag".bold} barındıran kullanıcılar üstünde komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "suspicious user") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Şüpheli".bold} kullanıcılar üstünde komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "Penalized user") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Cezalı".bold} kullanıcılar üstünde komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "No tagged people") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Taglı".bold} kullanıcıların bulunamadı.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "its a developer") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bot geliştiricileri üstünde komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    

    if (err == "insufficient authorization") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bu kullanıcı üstünde bu komutu kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "its a own") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bu komutu ${"kendi".bold} üstünde kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage();
    }

    if (err == "its a bot") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`${"Bot".bold} üstünde komut kullanamazsın.`.cyan}`)}`)
            ]
        }).destroyMessage()
    }

    if (err == "member not specified") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bir kullanıcıyı etiketleyin (${`@Approval`.bold}) veya ${`ID`.bold} yazın.`.cyan}`)}`)
            ]
        }).destroyMessage()
    }

    if (err == "name not specified") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bir ${"isim".bold} girmelisin.`.cyan}`)}`)
            ]
        }).destroyMessage()
    }

    if (err == "age not specified") {
        this.replyReaction(this.guild.findReaction(Cross,"ID"));
        this.channel.send({
            embeds: [
                new GenerateEmbed()
                    .setDescription(`${codeBlock("ansi", `${"⚠ Hata".bgDarkBlue.red} ${`Bir ${"yaş".bold} girmelisin`.cyan}`)}`)
            ]
        }).destroyMessage()
    }
}

/**
 * 
 * @param {String} emojiID Enter the emoji name and remove the emoji
 * @returns {Message}
 */
Message.prototype.removeToEmoji = function (emojiID) {
    let emoji = this.reactions.cache.get(emojiID);
    if(emoji) return emoji.remove()
   }

   