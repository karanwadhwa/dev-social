const express = require("express");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../models/User");

const router = express.Router();

// @route   GET /api/auth/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/auth/test route" });
});

// @route   POST /api/auth/test
// @desc    user registration route
// @access  Public
router.post("/register", (req, res) => {
  // search if a user with entered email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) return res.status(400).json({ msg: "email already exists" });
    else {
      // generate new User object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password
      });

      // hash password before storing user to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
