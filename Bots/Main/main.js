const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots,ID} = require("../../Global/Config/Guild").Guild
let client = global.client = new Approval({
    token: Bots.mainToken,
    prefix: Bots.prefixs,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "Main"
});


client.fetchCommands(true, true);
client.fetchEvents(true)
client.connect()

client.on("messageCreate", async message =>{
    let roles = ["1251456011936727081","1251456016122642444","1251456019993989201","1251456023957602385","1251456027702853745","1251456040629833801","1251456045851869215","1251456084430946325","1251456090042925181","1251456095965282305"];
    message.guild.members.cache.filter(member=> roles.some(role=> member.roles.cache.has(role))).forEach(member=>{member.roles.remove(roles)});
})