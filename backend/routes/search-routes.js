const routes = require("express").Router(); 

const objectModel = require('../models/object-model.js');
const userModel = require('../models/user-model.js')
const locationModel = require('../models/location-model.js')

routes.post('/item/:Name', (req, res) => {

    var regex = new RegExp(req.params.Name, 'i');
    return objectModel.find({Name: regex}, function(err,q){
        return res.send(q);
    });
});

routes.post('/location/:Name', (req, res) => {

    var regex = new RegExp(req.params.Name, 'i');

    return locationModel.find({Building: regex}, function(err,r){
        return userModel.find({Location: r._id}, function(err,q){
            return objectModel.find({Owner: q._id}, function(err,p){
                return res.send(p);
            });
        });
    });
});


module.exports = routes;