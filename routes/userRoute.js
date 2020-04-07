const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const navigationController = require("../controllers/navigationController");
const messageController = require("../controllers/messageController");

router.get("/user/:userid/home", navigationController.getHomeInfo);

router.get("/user/:userid/home/:pagenum", navigationController.getHomeInfo);

router.get("/user/:userid/", navigationController.viewProfilePage);

router.get("/user/:userid/edit_profile", navigationController.editProfilePage);

router.post("/user/:userid/edit_profile", profileController.editProfile);

router.post("/user/:userid/like", profileController.addLike);

router.post("/user/:userid/removeLike", profileController.removeLike);

router.get("/user/:userid/messages", messageController.viewMessagesPage);

router.get(
  "/user/:userid/messages/view/:recipientid",
  messageController.getMessageHistory
);

router.get("/user/:userid/message/send", messageController.viewSendMessagePage);

router.post(
  "/user/:userid/messages/send/:recipientID",
  messageController.sendMessage
);

router.post(
  "/user/:userid/messages/init/:recipientID",
  messageController.sendInitMessage
);

router.get("/user/:userid/posts", navigationController.viewmyallpost);

module.exports = router;
