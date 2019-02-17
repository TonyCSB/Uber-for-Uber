const passport = require('passport');

module.exports = {
    checkLogin : (req,res, callback) => {

        //Do you have a saved cookie?
        if (req.session.passport == undefined)
            //No saved cookie, go to login
            res.redirect('/login/noUser');

        //You Do? well load it and send it back
        else{
            passport.deserializeUser(req.session.passport.user, (n, userAccount) => {
                callback(userAccount);
            });
        }
    }
}