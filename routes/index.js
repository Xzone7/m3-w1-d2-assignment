const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Registration = require('../models/Registration'); 
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd')
});

router.get("/", basic.check((req, res) => {
  res.render("form", { title: "Registration form" });
}));

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter a email"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => {
          console.log("document saved successfully");
          res.send("Thank you for your registration!");
        })
        .catch(err => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        })
    } else {
      res.render("form", { title: "Registration form", errors: errors.array(), data: req.body});
    }
  }
);

router.get("/registrations", (req, res) => {
  Registration.find()
    .then(registrations => {
      res.render("index", { title: "Listing registrations", registrations });
    })
    .catch(err => {
      console.error(err);
      res.send("Sorry! Something went wrong.")
    })
});

module.exports = router;
