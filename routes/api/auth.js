const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Import environment variables
require("dotenv").config();

// Load User Model
const User = require("../../models/User");

const router = express.Router();

// @route   GET /api/auth/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/auth/test route" });
});

// @route   POST /api/auth/register
// @desc    user registration route
// @access  Public
router.post("/register", (req, res) => {
  // Input Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // search if a user with entered email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.err.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
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

// @route   POST /api/auth/login
// @desc    user registration route
// @access  Public
router.post("/login", (req, res) => {
  // Input Validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.err.email = "User Not Found";
      return res.status(404).json(errors);
    }

    // User found, validate password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // Generate JWT Payload
        const payload = { id: user.id, email: user.email };

        // Generate & Sign Token
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: "1h" },
          (err, token) => {
            res.status(200).json({
              msg: "User Login Successful",
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.err.password = "Password Incorrect";
        return res.status(401).json(errors);
      }
    });
  });
});

// @route   POST /api/auth/protected
// @desc    protected route for testing, returns currently logged in user
// @access  Protected
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
