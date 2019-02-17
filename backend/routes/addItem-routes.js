const routes = require("express").Router(); 

const objectModel = require('../models/object-model.js');
const userModel = require('../models/user-model.js')

/* For cookies */
const login = require('../util/cookie-loading.js');

routes.post('/item/:Name.:Description.:Price', (req, res) => {

    login.checkLogin(req, res, (userAccount) => {
        
        const owner = userAccount._id;

        const object = new objectModel({
            Name:            req.params.Name,
            Description:     req.params.Description,
            Owner:           owner,
            Price:           req.params.Price,
        }).save().then(()=>res.send("Saved!"));

        userModel.findOneAndUpdate({_id: owner}, {$push: { "Objects": object._id }});
    
    });

});


module.exports = routes;