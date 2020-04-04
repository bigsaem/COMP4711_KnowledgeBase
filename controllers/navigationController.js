const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");

exports.getHomeInfo = (req, res, next) => {
  console.log("i'm in home");
  console.log(req.session);
  res.render('home');
};

exports.viewMessagesPage = async (req, res, next) => {
  let userID = req.params.userid;
  let data = {
    to: userID
  };

  let messages = await messageRepliesData.getAll(data);

  //for now until we have a view to render
  console.log(messages);
  res.send("got messages");
};

exports.getMessageHistory = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;

  let data = {
    to: userID,
    from: recipientID
  };

  let messages = await messageRepliesData.getOne(data);

  console.log(messages);
};
