const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const validatePostInput = require("../../validation/post");

// Load Models
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

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
    const { errors, isValid } = validatePostInput(req.body);

    // check Validation
    if (!isValid) res.status(400).json(errors);

    const newPost = new Post({
      user: req.user.id,
      body: req.body.body,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.status(201).json(post));
  }
);

// @route   GET /api/post
// @desc    get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.status(200).json(posts))
    .catch(errors =>
      res.status(404).json({ ...errors, nopost: "No posts were found" })
    );
});

// @route   GET /api/post/id=:id
// @desc    find post by id
// @access  Public
router.get("/id=:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(errors =>
      res.status(404).json({ ...errors, nopost: "Invalid Post id" })
    );
});

// @route   DELETE /api/post/id=:id
// @desc    delete post by id
// @access  Protected
router.delete(
  "/id=:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // check if post user id matches with logged in users id
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            unauthorized: "You are not authorized to delete this post"
          });
        }
        // user authenticated, delete post
        post.remove().then(res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ ...err, nopost: "Invalid Post id" })
      );
  }
);

// @route   POST /api/post/like/id=:id
// @desc    Like post - add user id to like array
// @access  Protected
router.post(
  "/like/id=:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // .filter will map through all items in like array
        // and return [] of like objs where like.user.id === req.user.id
        // if the user has already liked the length of this array will be 1 else 0
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ nolike: "User has already liked this post" });
        }

        // if the user.id isnt present in the likes array add to it
        post.likes.push({ user: req.user.id });

        // save
        post.save().then(post => res.status(201).json(post));
      })
      .catch(errors =>
        res.status(404).json({ ...errors, nopost: "Invalid Post id" })
      );
  }
);

// @route   DELETE /api/post/like/id=:id
// @desc    Remove like from post - remove user id from like array
// @access  Protected
router.delete(
  "/unlike/id=:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // .filter will map through all items in like array
        // and return [] of like objs where like.user.id === req.user.id
        // if the user has already liked the length of this array will be 1 else 0
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ nolike: "User hasn't liked this post" });
        }

        // remove user from likes array
        // get remove index - index of the user in likes array
        const removeIndex = post.likes
          .map(user => user.id.toString())
          .indexOf(req.user.id);
        // map through all users in likes array and get [] of user ids
        // .indexOf to this array returns the index of req.user.id
        // splice this user out of the likes array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(errors =>
        res.status(404).json({ ...errors, nopost: "Invalid Post id" })
      );
  }
);

module.exports = router;
