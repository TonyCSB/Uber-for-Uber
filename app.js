/* Use Express For App */
const express = require('express');     

/* Routes */
const loginRoutes = require('./backend/routes/login-routes.js');
const homeRoutes = require('./backend/routes/home-routes.js');

/* Passport Setup */
const passport = require('passport');
const passportConfig = require('./backend/config/passport.js');

/* MongoDB Connection */
const mongoose = require('mongoose');
const keys = require('./backend/config/keys.js');

/* Cookie Setup */
const cookies = require('cookie-session');
const bodyParser = require('body-parser');

/* Create the app */
const app = express();

/* Passport */
app.use(cookies({
    name: 'Media Account Key',
    keys: [keys.session.cookieKey],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

/* Connect to mongoose */
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true }, () => console.log('Connected to Mongoose') );

/* Allows static access to frontend file */
app.set('views', './frontend');
app.set('view engine', 'ejs');
app.use(express.static('frontend'));

/* Routing */
app.use('/login', loginRoutes);
app.use('/home', homeRoutes);
app.get('/', (req,res) => {res.redirect('/home')})

/* Open Up Server */
app.listen(8080, () => console.log("Started on 8080"));


