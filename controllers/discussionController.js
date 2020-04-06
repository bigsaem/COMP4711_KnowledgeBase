const messagePostData = require("../models/messagePostData");
const replyData = require("../models/replyData");

exports.viewCreatePage = (req, res, next) => {
  console.log("viewCreatePage");
};

exports.createPost = async (req, res, next) => {
  let data = req.body;
  data.timestamp = Date.now();
  data.userid = req.session.user.userid;
  console.log(data);
  await messagePostData
    .addPost(data)
    .then(() => {
      console.log("post successfully added");
      res.redirect(`/user/${data.userid}/home`);
    })
    .catch((err) => {
      console.log("Error adding post", err);
    });
};

exports.deletePost = (req, res, next) => {
  // dont know if this is needed yet
  console.log("deletePost");
};

exports.getPost = async (req, res, next) => {
  let postid = req.params.postid;
  let data = (await messagePostData.getPostId(postid)).rows[0];
  let replyInfo = (await replyData.getReply(postid)).rows;
  let time = data.timestamp.toDateString();

  let replies = [];
  replyInfo.forEach((reply) => {
    let time = reply.timestamp.toDateString();
    replies.push({
      replydetail: reply.replydetail,
      timestamp: time,
      imageurl: reply.imageurl,
      name: reply.firstname + " " + reply.lastname,
    });
  });

  let postData = [
    {
      topic: data.topic,
      subject: data.subject,
      content: data.postdetail,
      timestamp: time,
      imageurl: data.imageurl,
      replies: data.replies,
      postid: data.postid,
      replyDetail: replies,
    },
  ];
  res.render("postpage", {
    loggedIn: true,
    posts: postData
  });
};

exports.getAllPosts = (req, res, next) => {
  let userid = req.params.userid;

  messagePostData
    .getPost(userid)
    .then((data) => {
      res.send("success", data);
    })
    .catch((err) => {
      console.log("Error getting all posts", err);
    });
};

exports.getAllReplies = (req, res, next) => {
  let postid = req.params.postid;

  replyData
    .getReplyPost(postid)
    .then((data) => {
      console.log("success adding reply", data);
    })
    .catch((err) => {
      console.log("Error adding reply", err);
    });
};

exports.addComment = (req, res, next) => {
  console.log(req);
  let postid = req.params.postid;
  let replydetail = req.body.replydetail;
  let timestamp = Date.now();
  let userid =  req.session.user.userid;

  replyData
    .addReply(replydetail, timestamp, userid, postid)
    .then((data) => {
      res.redirect(req.headers.referer); //go back to the previous page
    })
    .catch((err) => {
      console.log("Error adding reply", err);
    });
};
