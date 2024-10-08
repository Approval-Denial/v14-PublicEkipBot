const { Client, ApplicationCommandType,PermissionsBitField,StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow , ActionRowBuilder, codeBlock,seelct} = require("discord.js");
const guard = require("../../../../Global/Database/Guard")
module.exports = {
    name: "Güvenli",
    type: ApplicationCommandType.User,
    userPermissions: PermissionsBitField.Flags.Administrator,
    onRequest:async (client, interaction) => {
if(![...client.owners,interaction.guild.ownerId].includes(interaction.user.id)) return interaction.reply({content:`Bu komutu sadece <@${interaction.guild.ownerId}> (\`Taç Sahibi\`) ve ${client.owners.map(x=> `<@${x}>`).join(", ")} kullanabilir!`,ephemeral:true})
const member = await interaction.targetUser;
const menu = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId("güvenli")
.setPlaceholder("Kategori Seçin!")
.setOptions([
    {label:"Full",description:"Taç sahibi seviyesinde izinlere sahip olur.",value:"full"},
    {label:"Sunucu Ayarları",description:"URL hariç sunucu profiline tam izinli erişim.",value:"server"},
    {label:"Rolleri Yönet",description:"Rollere tam izinli erişim ve yönetim.",value:"role"},
    {label:"Kanalları Yönet",description:"Kanallara tam izinli erişim ve yönetim.",value:"channel"},
    {label:"Ban ve Kick",description:"Sağ tık Yasakla/At işlemlere tam izin.",value:"bankick"},
    {label:"Emoji ve Sticker",description:"Tam izinli Emoji ve Sticker yönetimi.",value:"emojisticker"},
])
)
interaction.reply({content:`güvenli kategori listelerine eklediğin kişilerin yaptıklarından sorumlu değilizdir.`,ephemeral:true})
interaction.channel.send({content:`\`${member.tag}\` kullanıcısını eklemek/çıkarmak istediğin **Güvenli Kişiler** kategorisini aşağıda butonları kullanarak seçiniz!`,components:[menu]}).then(async intMsg=>{
    const filter = d => d.user.id == interaction.user.id 
    const collector = intMsg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
    collector.on('collect', async (menu) => {
        await menu.deferUpdate()
        const guardWhitelistData = await guard.findOne({guildID:menu.guild.id});
        var full = guardWhitelistData ? guardWhitelistData.SafedMembers : client.owners
        var server = guardWhitelistData ? guardWhitelistData.serverSafedMembers : client.owners
        var roles = guardWhitelistData ? guardWhitelistData.roleSafedMembers : client.owners
        var channels = guardWhitelistData ? guardWhitelistData.channelSafedMembers : client.owners
        var banAndkick = guardWhitelistData ? guardWhitelistData.banKickSafedMembers : client.owners
        var emojiAndSticker = guardWhitelistData ? guardWhitelistData.emojiStickers : client.owners
        const butonlar = await new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("onayla").setLabel("Evet").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("reddet").setLabel("Hayır").setStyle(ButtonStyle.Danger),
            )
        if(menu.values[0] == "full"){
    if(full.includes(member.id)){
        menu.channel.send({content:`${member} kullanıcısının sunucuda **Tam izini** mevcut kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
            const filterx = d => d.user.id == interaction.user.id 
            const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
            collectorx.on("collect",async button => {
            if(button.customId == "onayla"){
            await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{SafedMembers:member.id}},{upsert:true});
            button.reply({content:`**${member.tag}** Sunucuda tam erişim izni kaldırıldı. yaptığı her işlem engellenicektir.`,ephemeral:true})
            if(intMsg) await intMsg.delete();
            if(x) await x.delete();
            }else{
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();  
            }
            })
            }) 
    } else{
        menu.channel.send({content:`${member} kullanıcısına sunucuda **Tam izin** vermek istediğine emin misin ?`,components:[butonlar],ephemeral:true}).then(async x=>{
            const filterx = d => d.user.id == interaction.user.id 
            const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
            collectorx.on("collect",async button => {
            if(button.customId == "onayla"){
            await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{SafedMembers:member.id}},{upsert:true});
            button.reply({content:`**${member.tag}** Sunucuda tam erişime sahip!`,ephemeral:true})
            if(intMsg) await intMsg.delete();
            if(x) await x.delete();
            }else{
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();  
            }
            })
            }) 
    }

        }
        if(menu.values[0] == "server"){
            if(server.includes(member.id)){
                menu.channel.send({content:`${member} kullanıcısının sunucunun profil erişimi kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                    const filterx = d => d.user.id == interaction.user.id 
                    const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                    collectorx.on("collect",async button => {
                    if(button.customId == "onayla"){
                    await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{serverSafedMembers:member.id}},{upsert:true});
                    button.reply({content:`**${member.tag}** Sunucu profil erişim izni kaldırıldı. yaptığı her işlem engellenicektir.`,ephemeral:true})
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();
                    }else{
                        if(intMsg) await intMsg.delete();
                        if(x) await x.delete();  
                    }
                    })
                    }) 
            } else{
                menu.channel.send({content:`${member} kullanıcısına sunucunun profiline erişim izni vermek istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                    const filterx = d => d.user.id == interaction.user.id 
                    const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                    collectorx.on("collect",async button => {
                    if(button.customId == "onayla"){
                    await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{serverSafedMembers:member.id}},{upsert:true});
                    button.reply({content:`**${member.tag}** Sunucunun profiline tam izini erişim verildi!`,ephemeral:true})
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();
                    }else{
                        if(intMsg) await intMsg.delete();
                        if(x) await x.delete();  
                    }
                    })
                    }) 
            }
        
        }
        if(menu.values[0] == "role"){
        if(roles.includes(member.id)){
            menu.channel.send({content:`${member} kullanıcısına sunucuda **Rollere tam erişim** izni mevcut kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{roleSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda **Rollere tam erişim** izni kaldırıldı. yaptığı her rol işlem engellenicektir.`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        } else{
            menu.channel.send({content:`${member} kullanıcısına sunucuda **Rollere tam erişim** vermek istediğine emin misin ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{roleSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda **Rollere tam erişim** sahip!`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        }
                
        }
        if(menu.values[0] == "channel"){
        if(channels.includes(member.id)){
            menu.channel.send({content:`${member} kullanıcısına sunucuda **Kanallara tam erişim** izni mevcut kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{channelSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda **Kanallara tam erişim** izni kaldırıldı. yaptığı her işlem engellenicektir.`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        } else{
            menu.channel.send({content:`${member} kullanıcısına sunucuda ***Kanallara tam erişim** izni vermek istediğine emin misin ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{channelSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda **Kanallara tam erişim** sahip!`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        }
                        
        }
        if(menu.values[0] == "bankick"){
        if(banAndkick.includes(member.id)){
            menu.channel.send({content:`${member} kullanıcısına sunucuda **Üyeleri Yasakla/At** işlemlerine tam izni mevcut kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{banKickSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda **Üyeleri Yasakla/At** tam erişim izni kaldırıldı. yaptığı her işlem engellenicektir.`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        } else{
            menu.channel.send({content:`${member} kullanıcısına sunucuda **Üyeleri Yasakla/At** işlemine tam erişim izni vermek istediğine emin misin ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                const filterx = d => d.user.id == interaction.user.id 
                const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                collectorx.on("collect",async button => {
                if(button.customId == "onayla"){
                await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{banKickSafedMembers:member.id}},{upsert:true});
                button.reply({content:`**${member.tag}** Sunucuda rahatlıkla sağ tık**Ban&Kick** işlemlerini kullanabilir!`,ephemeral:true})
                if(intMsg) await intMsg.delete();
                if(x) await x.delete();
                }else{
                    if(intMsg) await intMsg.delete();
                    if(x) await x.delete();  
                }
                })
                }) 
        }
                                
        }
        if(menu.values[0] == "emojisticker"){
         if(emojiAndSticker.includes(member.id)){
             menu.channel.send({content:`${member} kullanıcısına sunucuda **Emoji ve Sticker Yönet** izni mevcut kaldırmak istediğinize emin misiniz ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                 const filterx = d => d.user.id == interaction.user.id 
                 const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                 collectorx.on("collect",async button => {
                 if(button.customId == "onayla"){
                 await guard.findOneAndUpdate({guildID:button.guild.id},{$pull:{emojiStickers:member.id}},{upsert:true});
                 button.reply({content:`**${member.tag}** Sunucuda **Emoji ve Sticker Yönet** erişim izni kaldırıldı. yaptığı her işlem engellenicektir.`,ephemeral:true})
                 if(intMsg) await intMsg.delete();
                 if(x) await x.delete();
                 }else{
                     if(intMsg) await intMsg.delete();
                     if(x) await x.delete();  
                 }
                 })
                 }) 
         } else{
             menu.channel.send({content:`${member} kullanıcısına sunucuda ****Emoji ve Sticker Yönet** izni vermek istediğine emin misin ?`,components:[butonlar],ephemeral:true}).then(async x=>{
                 const filterx = d => d.user.id == interaction.user.id 
                 const collectorx = await x.createMessageComponentCollector({ filter: filterx,  errors: ["time"], time: 30000*10 })
                 collectorx.on("collect",async button => {
                 if(button.customId == "onayla"){
                 await guard.findOneAndUpdate({guildID:button.guild.id},{$push:{emojiStickers:member.id}},{upsert:true});
                 button.reply({content:`**${member.tag}** Sunucuda **Emoji ve Sticker Yönet** yetkisine tam erişim iznine sahip!`,ephemeral:true})
                 if(intMsg) await intMsg.delete();
                 if(x) await x.delete();
                 }else{
                     if(intMsg) await intMsg.delete();
                     if(x) await x.delete();  
                 }
                 })
                 }) 
         }
                                        
        }
    })
})
}
};