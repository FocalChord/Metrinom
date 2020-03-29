const express = require("express");

const router = express.Router();

const User = require("../models/user");
// require("../log/logger");

// GET All users in DATABASE
router.get("/getAll", (req, res) => {
    User.find().then((users, err) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: "lol" });
        } else {
            // logger.info(users);
            res.status(200).json(users);
        }
    });
});

module.exports = router;
