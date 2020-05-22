const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user-route"));
router.use("/spotify", require("./spotify-route"));

module.exports = router;
