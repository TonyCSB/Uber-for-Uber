/* Import Packages */
const mongoose = require('mongoose');

/* Define Structure of data for database */
const testSchema = new mongoose.Schema({
    data:           String,
    data2:           String
});

/* Tag it as 'test' */
module.exports = mongoose.model('test', testSchema);