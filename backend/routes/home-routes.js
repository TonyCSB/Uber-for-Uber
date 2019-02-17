/* These routes are routed through '/home' */

const routes = require("express").Router(); 

/* For cookies */
const login = require('../util/cookie-loading.js');

/* Database Access */
const passport = require('passport');
const objects = require('../models/object-model.js');

/* Gets the names of all the locations */
routes.get('/', (req,res) => {

    login.checkLogin(req, res, (userAccount) => {
        res.render('views/index.ejs');
    });

});

/* Get current profile */
routes.post('/getUserProfile', (req, res) => {

    login.checkLogin(req, res, (userAccount) => {
        passport.deserializeUser(userAccount, (n, user) => {
            res.send({
                name: user.Name
            });
        });
    });

});
routes.post('/getAllItems', (req, res) => {

    login.checkLogin(req, res, (userAccount) => {
        passport.deserializeUser(userAccount, (n, user) => {

            objects.find({Location: user.Location}).then(objects => {

                var sendData = [];

                objects.forEach((v,i)=>{
                    sendData.push({
                        Name: v.Name,
                        Price: v.Price
                    });
                });

                console.log(sendData);
                res.send(sendData);

            })

        });
    });

});


/* Set data */
routes.post('/setUserDorm', (req, res) => {

    login.checkLogin(req, res, (userAccount) => {
        passport.deserializeUser(userAccount, (n, user) => {
            
            user.Location = req.body.Location;
            user.save().then( () => res.send('saved'));

        });
    });

});

module.exports = routes;