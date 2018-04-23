const express = require("express");

const router = express.Router();

// test route - GET
router.get("/test", (req, res) => {
  res.json({ msg: "/api/user/test route" });
});

module.exports = router;
