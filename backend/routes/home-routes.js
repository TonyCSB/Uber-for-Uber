/* These routes are routed through '/home' */

const routes = require("express").Router();

/* For cookies */
const login = require("../util/cookie-loading.js");

/* Database Access */
const passport = require("passport");
const objects = require("../models/object-model.js");

/* Gets the names of all the locations */
routes.get("/", (req, res) => {
  login.checkLogin(req, res, userAccount => {
    res.render("views/index.ejs");
  });
});

/* Get current profile */
routes.post("/getUserProfile", (req, res) => {
  login.checkLogin(req, res, userAccount => {
    passport.deserializeUser(userAccount, (n, user) => {
      res.send({
        name: user.Name,
        location: user.Location
      });
    });
  });
});

routes.post("/getAllItems", (req, res) => {
  login.checkLogin(req, res, userAccount => {
    passport.deserializeUser(userAccount,(n, user) => {
      objects.find({ Location: user.Location }).then(object => {
        var sendData = [];

        object.forEach((v, i) => {
          sendData.push({
            Name: v.Name,
            Price: v.Price
          });
        });

        res.send(sendData);
      });
    });
  });
});

/* Set data */
routes.post("/setUserDorm", (req, res) => {
  login.checkLogin(req, res, userAccount => {
    passport.deserializeUser(userAccount, (n, user) => {
      user.Location = req.body.Location;
      user.save().then(() => res.send("saved"));
    });
  });
});

routes.post("/removeMyItems", (req, res) => {

    login.checkLogin(req, res, userAccount => {
        passport.deserializeUser(userAccount, (n, user) => {
          objects.deleteMany({Owner:user._id}, a => {
              res.send(a);
          });
        });
    });
});

routes.post("/newItem", (req, res) => {
  /* Example input
        Name:
        Description:
        Price:
    */

  login.checkLogin(req, res, userAccount => {
    passport.deserializeUser(userAccount, (n, user) => {
      new objects({
        Name: req.body.Name,
        Description: req.body.Description,
        Owner: user._id,
        Price: req.body.Price,
        Location: user.Location
      })
        .save()
        .then(res.send("saved"));
    });
  });
});

module.exports = routes;
