const routes = require("express").Router(); 

const objectModel = require('../models/object-model.js');

routes.get('/obj:Name', (req, res) => {

    // req.body is the data passed in
    // res.send({ <DATA HERE >})

    var regex = new RegExp(req.params.Name, 'i');
    return objectModel.find({Name: regex}, function(err,q){
        return res.send(q);
    });

});


module.exports = routes;