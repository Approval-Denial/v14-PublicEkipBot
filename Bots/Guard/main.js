const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild

let client = global.client = new Approval({
    token: Bots.guardOne,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "Guard"
});

client.fetchEvents(true)
client.connect()
startDistributors()

