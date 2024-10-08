const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild

let client = global.client = new Approval({
    token: Bots.statToken,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "Stats"
});
const invites = client.invites = {};
const guildInvites = global.guildInvites = new Map()
client.channelDuration = new Map()
client.fetchEvents(true)
client.connect()


