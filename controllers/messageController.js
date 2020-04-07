const messageRepliesData = require("../models/messageRepliesData");
const profileData = require("../models/profileData");

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

exports.viewSendMessagePage = async (req, res, next) => {
  let myID = req.session.user.userid;
  let recipientID = req.params.userid;
  let profile = await profileData.getProfileById(recipientID);
  profile = profile.rows[0];
  let url = profile.imageurl;
  let recipientName = profile.firstname + " " + profile.lastname;
  let recipientEmail = profile.email;

  res.render("message", {
    loggedIn: true,
    myID,
    recipientID,
    url,
    recipientEmail,
    recipientName,
  });
};
exports.viewMessagesPage = async (req, res, next) => {
  let userID = req.params.userid;
  let subject;
  let data = {
    userid: userID,
  };
  let messages = await messageRepliesData.getAll(data);
  messages = messages.rows;
  let messageHeader = handleMessageHeader(messages, userID);

  let messageDate;
  if (messages.length > 0) {
    subject = messages[0].subject;
    let info = {
      to: messages[0].userid,
      userid: userID,
      subject,
    };
    messageDate = await handleConversation(info);
    res.render("messagespage", {
      loggedIn: true,
      messageHeader,
      messageDate,
      messages: true,
      userID,
      recipientID: messages[0].userid,
      subject: encodeURI(subject),
    });
  } else {
    res.render("messagespage", {
      loggedIn: true,
      messages: false,
      messageHeader,
      userID,
      subject: encodeURI(subject),
    });
  }
};

exports.getMessageHistory = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;
  let subject = req.query.subject;

  let info = {
    to: recipientID,
    userid: userID,
    subject: decodeURI(subject),
  };
  let messages = await messageRepliesData.getAll(info);
  messages = messages.rows;
  let messageHeader = handleMessageHeader(messages, userID);

  let messageDate = await handleConversation(info);

  res.render("messagespage", {
    loggedIn: true,
    messages: true,
    messageHeader,
    messageDate,
    userID,
    recipientID,
    subject,
  });
};

let handleMessageHeader = (messages, userID) => {
  let messageHeader = [];

  for (message of messages) {
    let subject = message.subject;
    let to = message.firstname + " " + message.lastname;
    let lastMessagedDate = message.lastmessagetime.toDateString();
    let imageURL = message.imageurl;
    let convoURL = `/user/${userID}/messages/view/${
      message.userid
    }/?subject=${encodeURI(subject)}`;

    messageHeader.push({
      subject,
      to,
      lastMessagedDate,
      imageURL,
      convoURL,
    });
  }

  return messageHeader;
};

let handleConversation = async (info) => {
  let messageHistory = await messageRepliesData.getOne(info);
  let messageGroups = messageHistory.reduce((messageGroups, data) => {
    let date = data.timestamp.toDateString();
    if (!messageGroups[date]) {
      messageGroups[date] = [];
    }
    let messageInfo = {
      sender: data.firstname + " " + data.lastname,
      time: data.timestamp.toTimeString().split(" ")[0],
      content: data.content,
      imageURL: data.imageurl,
    };
    messageGroups[date].push(messageInfo);
    return messageGroups;
  }, {});

  let messageDate = Object.keys(messageGroups).map((date) => {
    return {
      date,
      data: messageGroups[date],
    };
  });
  return messageDate;
};
