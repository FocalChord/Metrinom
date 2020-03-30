const express = require("express");

const router = express.Router();

const User = require("../models/user");
// import logger from "../log/logger";

// GET Single user
router.get("/:id", (req, res) => {
    User.findOne({ spotifyUserId: req.params.id }, (err, users) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            // logger.info(users);
            res.status(200).json(users);
        }
    });
});

// GET All users in DATABASE
router.get("/", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: err });
        } else {
            // logger.info(users);
            res.status(200).json(users);
        }
    });
});

// Updates a users information
router.put("/:id", (req, res) => {
    User.updateOne({ spotifyUserId: req.params.id }, req.body, { upsert: "true" }, (err, user) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            // logger.info(users);
            res.status(200).json(user);
        }
    });
});

module.exports = router;
