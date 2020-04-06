const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");
const likesData = require("../models/likesData");
const messagePostData = require("../models/messagePostData");

exports.getHomeInfo = async (req, res) => {
  // TODO: We need a model which will get all unique profile likes
  let myInfo = req.session.user;
  let myid = myInfo.userid;
  let isItMyProfile = myid == req.params.userid;
  if (!isItMyProfile) {
    res.redirect(`/user/${myid}/home`);
    return;
  }
  let maxPage = 2;

  let pageNum =
    req.params.pagenum == undefined ? 0 : parseInt(req.params.pagenum);
  pageNum = pageNum > maxPage ? 2 : pageNum;
  let next = pageNum != maxPage ? true : false; //for next or prev page button activation
  let prev = pageNum != 0 ? true : false;
  let myPosts = await messagePostData.getPost(myid);
  let messages = await messageRepliesData.getAll({ userid: req.session.user });
  let likeCount = await likesData.getnumlikes(myid);
  let latestPosts;
  if (pageNum == 2) {
    latestPosts = await messagePostData.getLatestPosts(1, pageNum * 2);
  } else {
    latestPosts = await messagePostData.getLatestPosts(2, pageNum * 2);
  }

  likeCount = likeCount.rows[0].count;
  latestPosts.rows.forEach((post) => {
    post.timestamp = post.timestamp.toDateString();
  });

  res.render("home", {
    loggedIn: true,
    name: myInfo.firstname + " " + myInfo.lastname,
    url: myInfo.imageurl,
    facts: myInfo.description,
    postCount: myPosts.rowCount,
    messageCount: messages.rowCount,
    likes: likeCount,
    myProfile: isItMyProfile,
    userid: myid,
    latestPosts: latestPosts,
    prev: prev,
    next: next,
    prevPage: pageNum - 1,
    nextPage: pageNum + 1,
    posts: latestPosts.rows,
  });
};

exports.viewProfilePage = async (req, res, next) => {
  let userid = req.params.userid;
  let myUserid = req.session.user.userid;
  let notMyProfile = myUserid != userid;
  let profile = await profileData.getProfileById(userid);
  let likes = await likesData.getLikes(userid);
  let posts = await messagePostData.getPost(userid);
  let messages = await messageRepliesData.getAll({ userid });
  let liked = false;
  profile = profile.rows[0];
  posts.rows.forEach((post) => {
    post.timestamp = post.timestamp.toDateString();
  });
  if (notMyProfile) {
    for (let i in likes.rows) {
      if (likes.rows[i].owner == myUserid) liked = true;
    }
  }
  res.render("partials/userprofile", {
    messageCount: messages.rowCount,
    loggedIn: true,
    userObj: profile,
    likes: likes.rowCount,
    posts: posts.rows,
    postCount: posts.rowCount,
    notMyProfile: notMyProfile,
    liked: liked,
  });
};
exports.viewSendMessagePage = async (req, res, next) => {
  let myID = req.session.user.userid;
  let recipientID = req.params.userid;
  let profile = await profileData.getProfileById(recipientID);
  profile = profile.rows[0];
  let url = profile.imageurl;
  res.render("message", {
    loggedIn: true,
    myID,
    recipientID,
    url,
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
      userID,
      recipientID: messages[0].userid,
      subject: encodeURI(subject),
    });
  } else {
    res.render("messagespage", {
      loggedIn: true,
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
    messageHeader,
    messageDate,
    userID,
    recipientID,
    subject,
  });
};

exports.sendMessage = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;
  let subject = decodeURI(req.body.subject);
  let content = req.body.response;
  let timestamp = Date.now();

  let data = {
    to: recipientID,
    from: userID,
    subject,
    content,
    timestamp,
  };

  await messageRepliesData.post(data).then((data) => {
    // console.log("success writing to db", data);
    res.redirect(
      `/user/${userID}/messages/view/${recipientID}/?subject=${subject}`
    );
  });
};

let handleMessageHeader = (messages, userID) => {
  let messageHeader = [];

  messages.forEach((message) => {
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
  });

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

exports.editProfilePage = async (req, res, next) => {
  res.render("editprofile", {
    loggedIn: true,
    userObj: req.session.user,
  });
};
