const express = require("express");

const router = express.Router();

// @route   GET /api/post/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/post/test route" });
});

module.exports = router;
