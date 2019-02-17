/* Use Express For App */
const express = require('express');     

/* Login Routs */
const testing = require('./backend/routes/testing.js');

/* MongoDB Connection */
const mongoose = require('mongoose');
const keys = require('./backend/config/keys.js');

/* Create the app */
const app = express();

/* Connect to mongoose */
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true }, () => console.log('Connected to Mongoose') );

/* Allows static access to frontend file */
app.use(express.static('frontend'));

/* Routing */
app.get('/', (req,res)=>res.send("Here!"));
app.use('/this', testing);

/* Open Up Server */
app.listen(8080, () => console.log("Started on 8080"));


