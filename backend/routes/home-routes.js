const routes = require("express").Router(); 

/* For cookies */
const login = require('../util/cookie-loading.js');
const passport = require('passport');

/* Gets the names of all the locations */
routes.get('/', (req,res) => {

    login.checkLogin(req, res, (userAccount) => {
        res.render('index.ejs');
    });

});

/* Get user info on load */
routes.post('/getUserInfo', (req, res) => {

    login.checkLogin(req, res, (userAccount) => {
        passport.deserializeUser(userAccount, (n, user) => {
            res.send({
                name: user.Name
            });
        });
    });

});

module.exports = routes;