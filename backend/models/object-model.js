/* Import Packages */
const mongoose = require('mongoose');

/* Define Structure of data for database */
const object = new mongoose.Schema({
    Name:            String,
    Description:     String,
    Owner:           String,
    Price:           Number,
    Location:        String,
});

/* Tag it as 'test' */
module.exports = mongoose.model('object', object);