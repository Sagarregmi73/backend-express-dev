const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { createTokens } = require("../jwt");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/register", (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next({
      message: "please fill form",
      status: 401,
    });
  }
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });

    newUser.save((err) => {
      if (!err) {
        res.status(201).send("successfully registered");
        next();
      } else {
        next({
          message: "email already used",
          status: 401,
        });
      }
    });
  });
});

router.post("/login", (req, res, next) => {
  const user = User.findOne({ email: req.body.email }, (err, userFound) => {
    if (userFound) {
      bcrypt.compare(
        req.body.password,
        userFound.password,
        function (err, result) {
          // result == true
          if (result === true) {
            const accessToken = createTokens(user);
            res.cookie("access-Token", accessToken, {
              maxAge: 60 * 60 * 24 * 30,
              httpOnly: true,
            });
            res.status(201).send("successfully logged in");
            next();
          } else {
            next({
              message: "user not found",
              status: 401,
            });
          }
        }
      );
    } else {
      next({
        message: "user not found",
        status: 401,
      });
    }
  });
});

module.exports = router;
