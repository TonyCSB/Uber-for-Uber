const routes = require('express').Router();
const testModel = require('../models/testmodel.js');

routes.get('/here', (req, res) => {
    res.send("A!");
});

routes.get('/b', (req, res) => {
    console.log("HERE!");
    new testModel({
        data:"hay!",
        data2:"heee"
    }).save().then(()=>res.send("Saved!"));
});


/* Export */
module.exports = routes;