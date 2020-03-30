const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");

/**
 * @swagger
 * path:
 *  /notification/{id}:
 *    get:
 *      tags: [Notification]
 *      summary: Get all notifications for a user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "200":
 *          description: An array of notification objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 *
 */
router.get("/:id", (req, res) => {
    User.findOne({ spotifyUserId: req.params.id }, (err, user) => {
        if (err || user == null) {
            res.status(400).json({ msg: "error" });
        } else {
            Notification.find({ _id: { $in: user.notification } }, (err, notifications) => {
                if (err) {
                    // logger.error(err);
                    res.status(400).json({ msg: "error" });
                } else {
                    // logger.info(notifications);
                    res.status(200).json(notifications);
                }
            });
        }
    });
});

/**
 * @swagger
 * path:
 *  /user/:
 *    post:
 *      tags: [Notification]
 *      summary: Creates a new notification
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      responses:
 *        "200":
 *          description: A Notification schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 */
router.post("/", (req, res) => {
    Notification.create(req.params.body, (err, notifications) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            // logger.info(notifications);
            res.status(200).json(notifications);
        }
    });
});
/**
 * @swagger
 * path:
 *  /notification/{id}:
 *    delete:
 *      tags: [Notification]
 *      summary: Deletes a notification
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Object id of the notification
 *      responses:
 *        "200":
 *          description: Deleted object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 *
 */
router.delete("/:id", (req, res) => {
    Notification.findOneAndRemove({ _id: req.params.id }, (err, notifications) => {
        if (err) {
            // logger.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            // logger.info(notifications);
            res.status(200).json(notifications);
        }
    });
});

module.exports = router;
