const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");
const LOGGER = require("../common/logger");

/**
 * @swagger
 * path:
 *  /notification/:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: [Notification]
 *      summary: Get all notifications for a user
 *      responses:
 *        "200":
 *          description: An array of notification objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 *
 */
router.get("/", (req, res) => {
    const { authorization } = req.headers;
    User.findOne({ spotifyUserId: authorization }, (err, user) => {
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
 *      security:
 *        - ApiKeyAuth: []
 *      tags: [Notification]
 *      summary: Creates a new notification for the specific userId
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Spotify Id of the person the notification is for
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
    const { authorization } = req.headers;
    req.body.fromUser = authorization;
    Notification.create(req.body, (err, notification) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "couldnt create notification" });
        } else {
            LOGGER.info(notification);
            User.findOne({ spotifyUserId: req.params.id }, (err, user) => {
                user.notification.push(notification);
                if (err || user == null) {
                    LOGGER.log(err);
                    res.status(400).json({ msg: "couldnt find user that the notification is for" });
                } else {
                    LOGGER.info(user);
                    User.updateOne({ spotifyUserId: user.spotifyUserId }, user, { upsert: "false" }, (err, user) => {
                        if (err) {
                            LOGGER.error(err);
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
 *      security:
 *        - ApiKeyAuth: []
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
    const { authorization } = req.headers;
    User.findOne({ spotifyUserId: authorization }, (err, user) => {
        if (err || user == null || user == undefined) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            for (let i = 0; i < user.notification.length; i++) {
                if (user.notification[i].equals(req.params.id)) {
                    console.log(req.params.id);
                    user.notification.splice(i, 1);
                    console.log(user.notification);
                }
            }
            user.notification;
            User.updateOne({ spotifyUserId: authorization }, user, { upsert: "false" }, (err, user) => {
                if (err) {
                    LOGGER.error(err);
                    res.status(400).json({ msg: "couldnt add notification to user" });
                }
            });
            Notification.findOneAndRemove({ _id: req.params.id }, (err, notifications) => {
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

module.exports = router;
