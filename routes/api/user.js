const express = require("express");

const router = express.Router();

// @route   GET /api/user/test
// @desc    test route, nothing functional
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/api/user/test route" });
});

module.exports = router;
