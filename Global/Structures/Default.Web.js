const { Client, Intents, Permissions } = require('discord.js');
const express = require('express');
const app = express();
const bParser = require("body-parser");
const cParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-discord');
const moment = require('moment');
moment.locale('tr');
const musteri = require("../Database/Musteri");
const { Web, Bots, ID } = require('../Config/Guild').Guild

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use(cParser());
app.set('views', path.join(__dirname, '../Web/_views'));
app.use(express.static(path.join(__dirname, '../Web')));
app.use(session({ secret: 'Approval', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((obj, done) => { done(null, obj) });
const izinler = ["identify", "guilds", "email"];
passport.use(new Strategy({
    clientID: Web.clientID,
    clientSecret: Web.clientSecret,
    callbackURL: Web.callbackURL,
    scope: izinler
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    process.nextTick(() => done(null, profile));
}));
app.get("/login", passport.authenticate("discord", { scope: izinler, }));
app.get('/callback', passport.authenticate("discord", { failureRedirect: '/error' }), async (req, res) => {
    res.redirect('/anasayfa');
});
app.get('/logout', (req, res) => { req.logOut(); return res.redirect('/'); });
app.get('/', async (req, res) => { res.redirect('/login') })

app.get('/anasayfa', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('anasayfa', { user: req.user, bot: client, server: client.guilds.cache.get(ID) });

})

app.get('/panel-login', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('panel-login', { user: req.user, bot: client, server: client.guilds.cache.get(ID) });

})

app.get('/panel-login', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('panel-login', { user: req.user, bot: client })
})
app.get('/panel', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const musteriVerileri = await musteri.findOne({ userID: req.user.id })
    if (musteriVerileri || Bots.devs.some(x => x === req.user.id)) {
        res.render('panel', { user: req.user, bot: client });
    } else {
        res.redirect('/panel-login')
    }
})

app.post("/panel-login", async (req, res) => {
    const sifren = await req.body.password
    if (!req.user) return res.redirect('/login')
    const musteriVerileri = await musteri.findOne({ userID: req.user.id })
    if (Bots.devs.some(x => x === req.user.id) || Web.passwordsForDevs.some(x => x === sifren)) {
        console.log(`${req.user.username} (\`${req.user.email}\`) kişisi [WEB-PANEL] sistemine giriş yaptı!`)
        res.redirect('panel')
    }
    if (sifren == musteriVerileri.password) {
        console.log(`${req.user.username} (\`${req.user.email}\`) kişisi [WEB-PANEL] sistemine giriş yaptı!`)
        res.redirect('panel')
    }
    else {
        res.redirect('/anasayfa')
    }
})

app.listen(80, () => console.log(`[WEB] 80 üzerinden başlatıldı! http://localhost:80/callback`));