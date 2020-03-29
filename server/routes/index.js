const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.get("/", (req, res) => {
    res.send("Hello Worldsss");
});

module.exports = router;
