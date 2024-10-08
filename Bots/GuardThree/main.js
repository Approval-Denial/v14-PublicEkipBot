const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild

let client = global.client = new Approval({
    token: Bots.guardThree,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "GuardThree"
});

client.fetchEvents(true)
client.connect()


