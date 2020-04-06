const messageRepliesData = require("../models/messageRepliesData");
const email = require("../email/email");

exports.sendMessage = async (req, res, next) => {
  let recipientID = req.params.recipientID;
  let myID = req.session.user.userid;
  let subject = req.body.subject;
  let content = req.body.content;
  let timestamp = Date.now();
  let data = {
    to: recipientID,
    from: myID,
    subject,
    content,
    timestamp,
  };

  await messageRepliesData.post(data).then((data) => {
    res.redirect(
      `/user/${myID}/messages/view/${recipientID}/?subject=${subject}`
    );
  });
};

exports.sendInitMessage = async (req, res, next) => {
  let recipientID = req.params.recipientID;
  let recipientEmail = req.body.recipientEmail;

  let myID = req.session.user.userid;
  let myName = req.session.user.firstname;

  let subject = req.body.subject;
  let content = req.body.content;
  let timestamp = Date.now();

  let data = {
    to: recipientID,
    from: myID,
    subject,
    content,
    timestamp,
  };

  email.sendMail(myName, recipientEmail, content);

  await messageRepliesData.post(data).then((data) => {
    res.redirect(
      `/user/${myID}/messages/view/${recipientID}/?subject=${subject}`
    );
  });
};