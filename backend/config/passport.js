/* Packages */
const passport = require('passport');
const google = require('passport-google-oauth20');

/* Scripts */
const keys = require('./keys.js');
const userModel = require('../models/user-model.js');

//Serialize and deserialize users
passport.serializeUser((user,done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) =>{
    userModel.findById(id).then((user)=>{
        done(null, user);
    });
});

//Set up how the google template will be used
passport.use( new google({	

    callbackURL: 'http://localhost:8080/login/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {
    
    //Try to find existing value
    userModel.findOne({OAuthID: profile.id}).then((currentUser) =>{

        //It exists!
        if (currentUser){
            done(null, currentUser);
        }
        //It doesnt, make new
        else{   
            new userModel({
                OAuthID: profile.id,
                Name: profile.name.givenName + ' ' + profile.name.familyName,
                Location: profile.location
            }).save().then((newUser) => {
                done(null, newUser);
            })
        }
    })

}));