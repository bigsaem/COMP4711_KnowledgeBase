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

  console.log(replyInfo);
  let postData = [
    {
      topic: data.topic,
      subject: data.subject,
      content: data.postdetail,
      timestamp: time,
      imageurl: data.imageurl,
      replies: data.replies,
      postid: data.postid,
    },
  ];

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

  res.render("postpage", {
    posts: postData,
    replies,
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
  let postid = req.params.postid;
  let replydetail = req.body.replydetail;
  let timestamp = req.body.timestamp;
  let userid = req.body.userid; //not sure how this is passed yet

  replyData
    .addReplyPost(replydetail, timestamp, userid, postid)
    .then((data) => {
      console.log("success adding reply", data);
    })
    .catch((err) => {
      console.log("Error adding reply", err);
    });
};
