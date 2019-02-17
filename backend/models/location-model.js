/* Import Packages */
const mongoose = require('mongoose');

/* Define Structure of data for database */
const location = new mongoose.Schema({
    Building:           String,
    Floor:              String,
});

/* Tag it as 'test' */
module.exports = mongoose.model('location', location);