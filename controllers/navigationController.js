const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");
const likesData = require("../models/likesData");
const messagePostData = require("../models/messagePostData");

exports.getHomeInfo = async (req, res, next) => {
  console.log("i'm in home");
  console.log(req.session.user.userid);

  // TODO: We need a model which will get all unique profile likes
  let postCount = await messagePostData.getPost(req.session.user.userid);
  console.log(postCount.rowCount);
  res.render('home', {name: req.session.user.firstname + " " + req.session.user.lastname, url: req.session.user.imageurl, facts: req.session.user.description});
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
