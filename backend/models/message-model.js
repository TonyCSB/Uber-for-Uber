/* Import Packages */
const mongoose = require('mongoose');

/* Define Structure of data for database */
const messages = new mongoose.Schema({
    SendID:             String,
    ReceiverID:         String,
    Text:               String,
});

/* Tag it as 'test' */
module.exports = mongoose.model('message', message);