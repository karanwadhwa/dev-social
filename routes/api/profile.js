const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const router = express.Router();

// @route   GET /api/profile/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/profile/test route" });
});

// @route   GET /api/profile
// @desc    gets currently logged in users profile
// @access  Protected
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST /api/profile
// @desc    create and update user profile
// @access  Protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // skills come in as csv, hence need to be split into an array.
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    // social fields
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.github) profileFields.social.github = req.body.github;
    if (req.body.gitlab) profileFields.social.gitlab = req.body.gitlab;
    if (req.body.bitbucket) profileFields.social.bitbucket = req.body.bitbucket;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update profile since it already exists
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      } else {
        // Create Profile
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.err.handle = "That handle is unavailable";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then(profile => res.status(201).json(profile));
        });
      }
    });
  }
);

module.exports = router;
