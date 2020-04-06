const messageRepliesData = require("../models/messageRepliesData");
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
  