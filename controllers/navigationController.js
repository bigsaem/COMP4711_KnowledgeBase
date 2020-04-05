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
  res.render("home", {
    name: req.session.user.firstname + " " + req.session.user.lastname,
    url: req.session.user.imageurl,
    facts: req.session.user.description
  });
};

exports.viewMessagesPage = async (req, res, next) => {
  let userID = req.params.userid;
  let subject;
  let data = {
    userid: userID
  };

  let messages = await messageRepliesData.getAll(data);

  let messageHeader = handleMessageHeader(messages, userID);

  let messageDate;
  if (messages.length > 0) {
    subject = messages[0].subject;
    let info = {
      to: messages[0].userid,
      userid: userID,
      subject
    };
    messageDate = await handleConversation(info);
  }

  res.render("messagespage", {
    messageHeader,
    messageDate,
    userID,
    recipientID: messages[0].userid,
    subject
  });
};

exports.getMessageHistory = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;
  let subject = req.query.subject;

  let info = {
    to: recipientID,
    userid: userID,
    subject
  };
  let messages = await messageRepliesData.getAll(info);

  let messageHeader = handleMessageHeader(messages, userID);

  let messageDate = await handleConversation(info);

  res.render("messagespage", {
    messageHeader,
    messageDate,
    userID,
    recipientID,
    subject
  });
};

exports.sendMessage = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;
  let subject = req.body.subject;
  let content = req.body.response;
  let timestamp = Date.now();

  let data = {
    to: recipientID,
    from: userID,
    subject,
    content,
    timestamp
  };

  await messageRepliesData.post(data).then(data => {
    console.log("success writing to db", data);
    res.redirect(
      `/user/${userID}/messages/view/${recipientID}/?subject=${subject}`
    );
  });
};

let handleMessageHeader = (messages, userID) => {
  let messageHeader = [];

  messages.forEach(message => {
    let subject = message.subject;
    let to = message.firstname + " " + message.lastname;
    let lastMessagedDate = message.lastmessagetime.toDateString();
    let imageURL = message.imageurl;
    let convoURL = `/user/${userID}/messages/view/${message.userid}/?subject=${subject}`;

    messageHeader.push({
      subject,
      to,
      lastMessagedDate,
      imageURL,
      convoURL
    });
  });

  return messageHeader;
};

let handleConversation = async info => {
  let messageHistory = await messageRepliesData.getOne(info);

  console.log(messageHistory);
  let messageGroups = messageHistory.reduce((messageGroups, data) => {
    let date = data.timestamp.toDateString();
    if (!messageGroups[date]) {
      messageGroups[date] = [];
    }
    let messageInfo = {
      sender: data.firstname + " " + data.lastname,
      time: data.timestamp.toTimeString().split(" ")[0],
      content: data.content,
      imageURL: data.imageurl
    };
    messageGroups[date].push(messageInfo);
    return messageGroups;
  }, {});

  let messageDate = Object.keys(messageGroups).map(date => {
    return {
      date,
      data: messageGroups[date]
    };
  });
  return messageDate;
};
