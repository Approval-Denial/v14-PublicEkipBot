const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder,Message } = require('discord.js');
const Discord = global.Discord = require('discord.js');
const mongoose = require('mongoose');
const { bgBlue, black, green } = require("chalk");
const fs = require('fs');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const path = global.path = require("path")
const {Guild} = require("../Config/Guild")
const Users = require("../Database/Users")
const logs = require('discord-logs');
const BetterMarkdown = require('discord-bettermarkdown');
class Approval extends Client {
    constructor(options) {
        super({
            options,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers, 
                GatewayIntentBits.GuildBans, 
                GatewayIntentBits.GuildEmojisAndStickers, 
                GatewayIntentBits.GuildIntegrations, 
                GatewayIntentBits.GuildWebhooks, 
                GatewayIntentBits.GuildInvites, 
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences, 
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping, 
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions, 
                GatewayIntentBits.DirectMessageTyping, 
                GatewayIntentBits.MessageContent,
            ], 
            partials: [
            Partials.Message,
            Partials.Channel,
            Partials.GuildMember,
            Partials.Reaction,
            Partials.GuildScheduledEvent,
            Partials.User,
            Partials.ThreadMember,
            ] 
        })
        this._logger = require('../Additions/_console.additions');
        require('../Additions/_general.additions');
        require("../Prototypes/guild");
        require("../Prototypes/message");
        require("../Prototypes/Promise");
        this.token = options.token
        this.MongoURI = options.MongoURI
        this.prefix = options.prefix || [".","!","-"]
        this.owners = options.owners || ["341592492224806914","852800814808694814"]
        this.commands = new Collection()
        this.aliases = new Collection()
        this.slashcommands = new Collection()
        this.invites = new Collection();
        this._dirname = options._dirname;
        this.commandLength = global.commandLength == 0;
        this.on("disconnect", () => this._logger.log("Bot is disconnecting...", "disconnecting"))
        this.on("reconnecting", () => this._logger.log("Bot reconnecting...", "reconnecting"))
        this.on("error", (e) => this._logger.log(e, "error"))
        this.on("warn", (info) => this._logger.log(info, "warn"));
        logs(this);
        this.setMaxListeners(0)
       // process.on("unhandledRejection", (err) => { this._logger.log(err, "caution") });
        process.on("warning", (warn) => { this._logger.log(warn, "varn") });
      
        process.on("uncaughtException", err => {
            const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
            console.error("Beklenmedik Hata: ", hata);
        });
    }

    async fetchCommands(active = true, slash = false) {
        if(slash) {
            const slashcommands = await globPromise(`../../Bots/${this._dirname}/_slashcommands/*/*.js`);
            const arrSlash = [];
            slashcommands.map((value) => {
                const file = require(value);
                if (!file?.name) return;
                this.slashcommands.set(file.name, file);
                if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
                arrSlash.push(file);
                
            });
            this.on("ready", async () => {
                this.guilds.cache.map(async (x) => {
                    x.commands.set(arrSlash);
                })
                this._logger.log(`${arrSlash.length} Slash Command(s) loaded.`, "ready")
            })
        }
        if(!active) return;
        let dirs = fs.readdirSync("./_commands", { encoding: "utf8" });
        this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} ${dirs.length} category in client loaded.`, "category");
        dirs.forEach(dir => {
            let files = fs.readdirSync(`../../Bots/${this._dirname}/_commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} ${files.length} commands loaded in ${dir} category.`, "load");
            files.forEach(file => {
                const cmd = new (require(`../../Bots/${this._dirname}/_commands/${dir}/${file}`))(client);
                this.commandLength++
                cmd.location = dir;
                cmd.name = file;
                if(cmd) cmd.on()
            });
        });
    }

    async fetchEvents(active = true) {
        if(!active) return;
        let dirs = fs.readdirSync('./_events', { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`../../Bots/${this._dirname}/_events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} ${files.length} events loaded in ${dir} category.`, "load");
            files.forEach(file => {
                const events = new (require(`../../Bots/${this._dirname}/_events/${dir}/${file}`))(client);
                if(events) events.on();
            });
        });
    }

    async connect(token = this.token) {
     
        if(!token) {
            this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} Tokeni girilmediğinden dolayı bot kapanıyor...`,"error");
            process.exit()
            return;
        }
        if(this.MongoURI) {
            await mongoose.connect(this.MongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(async (a) => {
                this._logger.log("MongoDB Bağlantısı Başarıyla Kuruldu.", "mongodb")
                await this.login(token)
                .then(async a => {
                if(!this.guilds.cache.get(Guild.ID)) console.log(`https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=8&scope=bot%20applications.commands`)
                        _status(this,Guild.botStatus,["dnd"],{on: true,activities: 30000,status: 30000})
                }).catch(err => {
                    this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} Botun tokeni doğrulanamadı. 5 Saniye sonra tekrardan denenecektir...`,"reconnecting")
                    setTimeout(() => {
                        this.login().catch(Approval => {
                            this._logger.log(`${black.bgHex('#D9A384')(this._dirname.toUpperCase())} => Bot tokeni tamamiyle doğrulanamadı.. Bot kapanıyor...`,"error")
                            process.exit()
                        })
                    }, 5000)
                })
            }).catch(err => {
                this._logger.log("MongoDB Bağlantısı Başarısız.", "error")
                this._logger.log(err, "error")

                process.exit();
            })
        }
        Date.prototype.toTurkishFormatDate = function (format) {
            let date = this,
              day = date.getDate(),
              weekDay = date.getDay(),
              month = date.getMonth(),
              year = date.getFullYear(),
              hours = date.getHours(),
              minutes = date.getMinutes(),
              seconds = date.getSeconds();
            let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
            let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
            if (!format) {
              format = "dd MM yyyy - HH:ii:ss";
            };
            format = format.replace("mm", month.toString().padStart(2, "0"));
            format = format.replace("MM", monthNames[month]);
            if (format.indexOf("yyyy") > -1) {
              format = format.replace("yyyy", year.toString());
            } else if (format.indexOf("yy") > -1) {
              format = format.replace("yy", year.toString().substr(2, 2));
            };
            format = format.replace("dd", day.toString().padStart(2, "0"));
            format = format.replace("DD", dayNames[weekDay]);
            if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
            if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
            if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
            return format;
          };
          Array.prototype.chunk = function (chunk_size) {
            let myArray = Array.from(this);
            let tempArray = [];
            for (let index = 0; index < myArray.length; index += chunk_size) {
              let chunk = myArray.slice(index, index + chunk_size);
              tempArray.push(chunk);
            }
            return tempArray;
          };
          Message.prototype.removeToEmoji = function (emojiID) {
            let emoji = this.reactions.cache.get(emojiID);
            if(emoji) return emoji.remove()
           }
         
    }
    
}

module.exports = { Approval }

function _status(client,activities, status, time) {
    if(!time.on) {
        client.user.setActivity(activities[0])
        client.user.setStatus(status[0])
    }  else {
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, time.activities);
    
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, time.status);
    }
}