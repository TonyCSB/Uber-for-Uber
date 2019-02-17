const routes = require("express").Router(); 

const objectModel = require('../models/object-model.js');
const userModel = require('../models/user-model.js')

/* For cookies */
const login = require('../util/cookie-loading.js');

routes.get('/item/:Name.:Description.:Price', (req, res) => {

    const owner = "";

    login.checkLogin(req, res, (userAccount) => {
    
        owner = userAccount._id;
    
    });

    new objectModel({
        Name:            req.params.Name,
        Description:     req.params.Description,
        Owner:           owner,
        Price:           req.params.Price,
    }).save().then(()=>res.send("Saved!"));

    userModel.findOneAndUpdate({_id: owner});

});


module.exports = routes;