const { Client, Intents, Permissions } = require('discord.js');
const express = require('express');
const app = express();
const bParser = require("body-parser");
const cParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const {ID} = require("../../Global/Config/Guild").Guild
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-discord');
const moment = require('moment');
moment.locale('tr');
const musteri = require("../../Global/Database/Musteri")
const guildMessageStat = require("../../Global/Database/Stats/Message/messageGuild")
const guildVoiceStat = require("../../Global/Database/Stats/Voice/voiceGuild")
const messageUser = require("../../Global/Database/Stats/Message/messageUser");
const voiceUser = require('../../Global/Database/Stats/Voice/voiceUser');
app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use(cParser());
app.set('views', path.join(__dirname, 'Web'));
app.use(express.static(path.join(__dirname, 'Web')));
app.use(session({ secret: 'Approval', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((obj, done) => { done(null, obj) });
const izinler = ["identify", "guilds","email"];
const url = "http://localhost:80/"
passport.use(new Strategy({
    clientID: "1066827934775648308",
    clientSecret: "mIyCtt3gUzyBeV6HqqXnV6R2auEMgTho",
    callbackURL: url+"callback",
    scope: izinler
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));
app.get("/login", passport.authenticate("discord", { scope: izinler, }));
app.get('/callback', passport.authenticate("discord", { failureRedirect: '/error' }), async (req, res) => {
res.redirect('/anasayfa');
console.log(`${req.user.username} (\`${req.user.email}\`) kişisi [WEB] sistemine giriş yaptı!`)
});
app.get('/logout', (req, res) => { req.logOut(); return res.redirect('/'); });
app.get('/', async (req, res) => { res.redirect('/login') })
app.get('/error', async (req, res) => { res.render('hata', { user: req.user, bot: client }); })
app.get('/panelerror', async (req, res) => { res.render('panelhata', {user: req.user, bot: client }); });
app.get('/sunucudayok', async (req, res) => { res.render('sunucudayok', {user: req.user, bot: client,url:url }); });
app.get('/anasayfa', async (req, res) => {
if(!req.user) return res.redirect('/login')
res.render('anasayfa', {user: req.user,bot: client})})
app.get('/panel', async (req, res) => {
if(!req.user) return res.redirect('/login')
const musteriVerileri = await musteri.findOne({userID:req.user.id})
if(musteriVerileri) {
const guild = client.guilds.cache.get(ID)
res.render('panel', { user: req.user, bot: client,url:url,sunucum:guild }); 
} else {
res.redirect('/anasayfa')
}
})
app.get('/server/:serverID', async (req, res) => {
    if(!req.user) return res.redirect('/login')
    const musteriVerileri = await musteri.findOne({userID:req.user.id})
    if(musteriVerileri) {
    const serverID = req.params.serverID;
    const guild = client.guilds.cache.get(serverID)
    if(guild) {
        const sunucum = client.guilds.cache.get(ID)
        const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
        const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})

    res.render('server', {
         user: req.user,
          bot: client,
          sunucu:guild,
          url:url,
          sunucum : sunucum,
          dailyMessage:guildMessage ? guildMessage.dailyStat:0,
          dailyVoice:guildVoice ? guildVoice.dailyStat:0
        }); 
    } else {
        res.redirect('/sunucudayok')
    }
    } else {
    res.redirect('/anasayfa')
    }
    })
    app.get('/settings/roller', async (req, res) => {
        if(!req.user) return res.redirect('/login')
        const musteriVerileri = await musteri.findOne({userID:req.user.id})
        if(musteriVerileri) {
        const guild = client.guilds.cache.get(ID)
        if(guild) {
            const sunucum = client.guilds.cache.get(ID)
            const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
            const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
    
        res.render('settings/roller', {
             user: req.user,
              bot: client,
              sunucu:guild,
              url:url,
              sunucum : sunucum,
              dailyMessage:guildMessage ? guildMessage.dailyStat:0,
              dailyVoice:guildVoice ? guildVoice.dailyStat:0
            }); 
        } else {
            res.redirect('/sunucudayok')
        }
        } else {
        res.redirect('/anasayfa')
        }
        })
        app.get('/settings/kanallar', async (req, res) => {
            if(!req.user) return res.redirect('/login')
            const musteriVerileri = await musteri.findOne({userID:req.user.id})
            if(musteriVerileri) {
            const guild = client.guilds.cache.get(ID)
            if(guild) {
                const sunucum = client.guilds.cache.get(ID)
                const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
                const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
        
            res.render('settings/kanallar', {
                 user: req.user,
                  bot: client,
                  sunucu:guild,
                  url:url,
                  sunucum : sunucum,
                  dailyMessage:guildMessage ? guildMessage.dailyStat:0,
                  dailyVoice:guildVoice ? guildVoice.dailyStat:0
                }); 
            } else {
                res.redirect('/sunucudayok')
            }
            } else {
            res.redirect('/anasayfa')
            }
            })
    app.get('/top/message', async (req, res) => {
        if(!req.user) return res.redirect('/login')
        const musteriVerileri = await musteri.findOne({userID:req.user.id})
        if(musteriVerileri) {
        const serverID = req.params.serverID;
        const guild = client.guilds.cache.get(ID)
        if(guild) {
            const sunucum = client.guilds.cache.get(ID)
            const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
            const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
            const messageUsersData = await messageUser.find({ guildID: sunucum.id })
            var top100 =[];
            messageUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> sunucum.members.cache.get(x.userID)).forEach((data,index) => {
            top100.push({number:index+1,userID:data.userID,length:data.totalStat})    
            });
        res.render('top/message', {
             user: req.user,
              bot: client,
              sunucu:guild,
              url:url,
              sunucum : sunucum,
              dailyMessage:guildMessage ? guildMessage.dailyStat:0,
              dailyVoice:guildVoice ? guildVoice.dailyStat:0,
              top100
            }); 
        } else {
            res.redirect('/sunucudayok')
        }
        } else {
        res.redirect('/anasayfa')
        }
        })
    app.get('/top/voice', async (req, res) => {
            if(!req.user) return res.redirect('/login')
            const musteriVerileri = await musteri.findOne({userID:req.user.id})
            if(musteriVerileri) {
            const serverID = req.params.serverID;
            const guild = client.guilds.cache.get(ID)
            if(guild) {
                const sunucum = client.guilds.cache.get(ID)
                const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
                const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
                const messageUsersData = await voiceUser.find({ guildID: sunucum.id })
                var top100 =[];
                messageUsersData.sort((a,b)=> b.totalStat - a.totalStat).filter(x=> sunucum.members.cache.get(x.userID)).forEach((data,index) => {
                top100.push({number:index+1,userID:data.userID,length:sureCevir(data.totalStat)})    
                });
            res.render('top/invite', {
                 user: req.user,
                  bot: client,
                  sunucu:guild,
                  url:url,
                  sunucum : sunucum,
                  dailyMessage:guildMessage ? guildMessage.dailyStat:0,
                  dailyVoice:guildVoice ? guildVoice.dailyStat:0,
                  top100
                }); 
            } else {
                res.redirect('/sunucudayok')
            }
            } else {
            res.redirect('/anasayfa')
            }
    })
    app.get('/top/invite', async (req, res) => {
        if(!req.user) return res.redirect('/login')
        const musteriVerileri = await musteri.findOne({userID:req.user.id})
        if(musteriVerileri) {
        const serverID = req.params.serverID;
        const guild = client.guilds.cache.get(ID)
        if(guild) {
            const sunucum = client.guilds.cache.get(ID)
            const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
            const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
            const inviter =  require("../../Global/Database/invite/inviteSchema")
            let data = await inviter.find({ guildID: sunucum.id });
           var top100 =[];
           data.filter(data=>data.total > 0 && sunucum.members.cache.get(data.userID)).sort((a,b)=>b.total - a.total).forEach((data,index) => {
            top100.push({number:index+1,userID:data.userID,length:data.total})    
            });
        res.render('top/invite', {
             user: req.user,
              bot: client,
              sunucu:guild,
              url:url,
              sunucum : sunucum,
              dailyMessage:guildMessage ? guildMessage.dailyStat:0,
              dailyVoice:guildVoice ? guildVoice.dailyStat:0,
              top100
            }); 
        } else {
            res.redirect('/sunucudayok')
        }
        } else {
        res.redirect('/anasayfa')
        }
        })
        app.get('/top/level', async (req, res) => {
            if(!req.user) return res.redirect('/login')
            const musteriVerileri = await musteri.findOne({userID:req.user.id})
            if(musteriVerileri) {
            const serverID = req.params.serverID;
            const guild = client.guilds.cache.get(ID)
            if(guild) {
                const User = require("../../Global/Database/Users")
    const authorData = await User.find();
                const sunucum = client.guilds.cache.get(ID)
                const guildMessage = await guildMessageStat.findOne({guildID:sunucum.id})
                const guildVoice = await guildVoiceStat.findOne({guildID:sunucum.id})
                const messageUsersData = await messageUser.find({ guildID: sunucum.id })
                var top100 =[];
                const data = authorData.filter(data=> sunucum.members.cache.get(data.userID) && data.xp > 1).sort((a,b)=> b.lvl - a.lvl).forEach((data,index) => {
                top100.push({number:index+1,userID:data.userID,lvl:data.lvl,xp:data.xp})    
                });
            res.render('top/level', {
                 user: req.user,
                  bot: client,
                  sunucu:guild,
                  url:url,
                  sunucum : sunucum,
                  dailyMessage:guildMessage ? guildMessage.dailyStat:0,
                  dailyVoice:guildVoice ? guildVoice.dailyStat:0,
                  top100
                }); 
            } else {
                res.redirect('/sunucudayok')
            }
            } else {
            res.redirect('/anasayfa')
            }
            })
    app.get('/profil/:userID', async (req, res) => {
        if(!req.user) return res.redirect('/login')
        const musteriVerileri = await musteri.findOne({userID:req.user.id})
        if(musteriVerileri) {
        const userID = req.params.userID;
        const user = client.users.cache.get(userID)
        if(user) {
            const sunucum = client.guilds.cache.get(ID)

        res.render('profil', { user: req.user, bot: client,member:user,url:url,sunucum:sunucum }); 
        } else {
            res.redirect('/anasayfa')
        }
        } else {
        res.redirect('/anasayfa')
        }
        })
app.get('/auth', async (req, res) => {
if(!req.user) return res.redirect('/login')
const musteriVerileri = await musteri.findOne({userID:req.user.id})
if(musteriVerileri) {res.render('auth', {user: req.user,bot: client})} else {res.redirect('/anasayfa')}
})

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

app.post("/auth",async (req, res)=>{
const sifren = await req.body.password
if(!req.user) return res.redirect('/login')
const musteriVerileri = await musteri.findOne({userID:req.user.id})
if(sifren == musteriVerileri.password){
console.log( `${req.user.username} (\`${req.user.email}\`) kişisi [WEB-PANEL] sistemine giriş yaptı!`)
res.redirect('panel') 
}
else {
res.redirect('/anasayfa') 
}
})
app.post("/settings/roller",async(req,res)=>{
console.log(await req.body)
})
app.listen(80, () => console.log(`[WEB] 80 üzerinden başlatıldı! http://localhost:80/callback`));


function secretOluştur(length) { var result           = ''; var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; var charactersLength = characters.length; for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); } return result; }