const routes = require("express").Router(); 

const objectModel = require('../models/object-model.js');

routes.post('/Item:Name', (req, res) => {

    var regex = new RegExp(req.params.Name, 'i');
    return objectModel.find({Name: regex}, function(err,q){
        return res.send(q);
    });
});



module.exports = routes;