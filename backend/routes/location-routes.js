/* LOCATION ROUTES IN GENERAL */
const routes = require("express").Router(); 

const locationModel = require('../models/location-model.js');
const peopleModel = require('../models/user-model.js');

/* Gets the names of all the locations */
routes.get('/places', (req,res) => {

    locationModel.find({}).then( items => {
        res.send(items);
    })

});

/* Gets the names of all the people in location */
routes.get('/populace', (req, res) => {

    peopleModel.find({Location: 'req.body.locationID'}).then( people => {
        res.send(people);
    })

})


routes.get('/obj:Name', (req, res) => {

    // req.body is the data passed in
    // res.send({ <DATA HERE >})

    var regex = new RegExp(req.params.Name, 'i');
    return objectModel.find({Name: regex}, function(err,q){
        return res.send(q);
    });

});


module.exports = routes;