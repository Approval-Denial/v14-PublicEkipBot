const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild

let client = global.client = new Approval({
    token: Bots.guardTwo,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "GuardTwo"
});

client.fetchEvents(true)
client.connect()


