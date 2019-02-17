const routes = require('express').Router();

routes.get('/here', (req, res) => {
    res.send("A!");
});

routes.get('/b', (req, res) => {
    res.send("B!");
});


/* Export */
module.exports = routes;