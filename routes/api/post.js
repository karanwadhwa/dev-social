const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const User = require("../../models/User");
const Post = require("../../models/Post");

const router = express.Router();

// @route   GET /api/post/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/post/test route" });
});

// @route   POST /api/post/
// @desc    create post
// @access  Protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      user: req.user.id,
      body: req.body.body,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.status(201).json(post));
  }
);

module.exports = router;
