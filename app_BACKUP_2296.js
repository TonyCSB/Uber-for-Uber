/* Use Express For App */
const express = require('express');     

/* Routes */
const loginRoutes = require('./backend/routes/login-routes.js');
const locationRoutes = require('./backend/routes/location-routes.js');
const searchRoutes = require('./backend/routes/search-routes.js');
<<<<<<< HEAD
const homeRoutes = require('./backend/routes/home-routes.js');
=======
const addRoutes = require('./backend/routes/addItem-routes')
>>>>>>> 0597b5dda7b264bb553e3fb0db08db39d6871fc8

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

/* Connect to mongoose */
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true }, () => console.log('Connected to Mongoose') );

/* Allows static access to frontend file */
app.set('views', './frontend');
app.set('view engine', 'ejs');
app.use(express.static('frontend'));

/* Routing */
app.use('/login', loginRoutes);
app.use('/search', searchRoutes);
app.use('/add', addRoutes)
app.use('/location', locationRoutes);
app.use('/home', homeRoutes);
app.get('/', (req,res) => {res.redirect('/home')})

/* Open Up Server */
app.listen(8080, () => console.log("Started on 8080"));

