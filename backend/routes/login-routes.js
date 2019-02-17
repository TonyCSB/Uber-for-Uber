/* These routes are routed through '/login' */

/* Import Packages */
const routes = require('express').Router();
const passport = require('passport');

/* For cookies */
const login = require('../util/cookie-loading.js');

/* Routes */
routes.get('/noUser', (req, res) => {
    res.clearCookie('Media Account Key');
    res.send('Not Logged in');
});

routes.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

routes.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    /* Open user */
    login.checkLogin(req, res, (userAccount) => {
    
        res.send(userAccount);
    
    });

});

/* Export */
module.exports = routes;