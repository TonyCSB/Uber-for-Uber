/* Import Packages */
const mongoose = require('mongoose');

/* Define Structure of data for database */
const user = new mongoose.Schema({
    OAuthID:           String,
    Objects:           [String],
    Name:              String,
    Location:          String,

});

/* Tag it as 'test' */
module.exports = mongoose.model('user', user);

