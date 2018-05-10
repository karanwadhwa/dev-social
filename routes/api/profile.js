const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");
const validateExpInput = require("../../validation/experience");
const validateEduInput = require("../../validation/education");

// Load Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const router = express.Router();

// @route   GET /api/profile
// @desc    gets currently logged in users profile
// @access  Protected
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
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
    const { errors, isValid } = validateProfileInput(req.body);
    // check validation
    if (!isValid) return res.status(400).json(errors);

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

// @route   GET /api/profile/handle=:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle=:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user.";
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET /api/profile/user_id=:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user_id=:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user.";
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(errors =>
      res
        .status(404)
        .json({ ...errors, noprofile: "There is no profile for this user" })
    );
});

// @route   GET /api/profile/all
// @desc    Get profiles of all users
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }

      res.status(200).json(profiles);
    })
    .catch(errors =>
      res.status(404).json({ ...errors, noprofile: "There are no profiles" })
    );
});

// @route   POST /api/profile/exp
// @desc    Add experience to user profile
// @access  Private
router.post(
  "/exp",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //
    const { errors, isValid } = validateExpInput(req.body);
    // check validation
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add experience to array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

// @route   POST /api/profile/edu
// @desc    Add education info to user profile
// @access  Private
router.post(
  "/edu",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Input Validation
    const { errors, isValid } = validateEduInput(req.body);
    // check validation
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        major: req.body.major,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add experience to array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

// @route   DELETE /api/profile/exp=:exp_id
// @desc    Delete experience from user profile
// @access  Private
router.delete(
  "/exp=:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get index of exp entry from users experience array
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice the requested exp out of the array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(res.json(profile));
      })
      .catch(errors => res.status(400).json(errors));
  }
);

// @route   DELETE /api/profile/edu=:edu_id
// @desc    Delete education from user profile
// @access  Private
router.delete(
  "/edu=:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get index of exp entry from users experience array
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice the requested exp out of the array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(res.json(profile));
      })
      .catch(errors => res.status(400).json(errors));
  }
);

module.exports = router;
