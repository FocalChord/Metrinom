const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");
const LOGGER = require("../log/logger");

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
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            Notification.find({ _id: { $in: user.notification } }, (err, notifications) => {
                if (err) {
                    LOGGER.error(err);
                    res.status(400).json({ msg: "error" });
                } else {
                    LOGGER.info(notifications);
                    res.status(200).json(notifications);
                }
            });
        }
    });
});

/**
 * @swagger
 * path:
 *  /notification/{id}:
 *    post:
 *      tags: [Notification]
 *      summary: Creates a new notification for the specific userId
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
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
router.post("/:id", (req, res) => {
    Notification.create(req.body, (err, notification) => {
        if (err) {
            LOGGER.log(err);
            res.status(400).json({ msg: "couldnt create notification" });
        } else {
            LOGGER.log(notification);
            User.findOne({ spotifyUserId: req.params.id }, (err, user) => {
                user.notification.push(notification);
                if (err || user == null) {
                    LOGGER.log(err);
                    res.status(400).json({ msg: "couldnt find user that the notification is for" });
                } else {
                    LOGGER.info(user);
                    User.updateOne({ spotifyUserId: user.spotifyUserId }, user, { upsert: "false" }, (err, user) => {
                        if (err) {
                            LOGGER.log(err);
                            res.status(400).json({ msg: "couldnt add notification to user" });
                        } else {
                            LOGGER.info(user);
                            res.status(200).json({ msg: notification });
                        }
                    });
                }
            });
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
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            LOGGER.info(notifications);
            res.status(200).json(notifications);
        }
    });
});

module.exports = router;
