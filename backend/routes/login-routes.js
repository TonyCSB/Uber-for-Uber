/* These routes are routed through '/login' */

/* Import Packages */
const routes = require('express').Router();
const passport = require('passport');

/* For cookies */
const login = require('../util/cookie-loading.js');

/* Routes */
routes.get('/noUser', (req, res) => {
    res.clearCookie('Media Account Key');
    res.render('views/login/login.ejs');
});

routes.get('/setupUser', (req, res) => {
    res.render('views/login/chooseDorm.ejs');
});



routes.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

routes.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/login/setupUser');
});

/* Export */
module.exports = routes;