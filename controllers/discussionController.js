const messagePostData = require("../models/messagePostData");
const replyData = require("../models/replyData");

exports.viewCreatePage = (req, res, next) => {
  console.log("viewCreatePage");
};

exports.createPost = async (req, res, next) => {
  let topic = req.body.topic;
  let subject = req.body.subject;
  let postdetail = req.body.postdetail;
  let timestamp = Date.now();
  let userid = req.body.userid; //not sure how this would be passed yet

  let data = {
    topic: topic,
    subject: subject,
    postdetail: postdetail,
    timestamp: timestamp,
    userid: userid
  };

  console.log(data);

  await messagePostData
    .addPost(data)
    .then(() => {
      console.log("post successfully added");
      res.send("ok");
    })
    .catch(err => {
      console.log("Error adding post", err);
    });
};

exports.deletePost = (req, res, next) => {
  // dont know if this is needed yet
  console.log("deletePost");
};

exports.getPost = (req, res, next) => {
  // let postid = req.params.postid;

  // messagePostData.getMessagePost(postid)
  // .then(data => {

  // })
  //Need another function to get one singular post in model
  console.log("getPost");
};

exports.getAllPosts = (req, res, next) => {
  let userid = req.params.userid;

  messagePostData
    .getPost(userid)
    .then(data => {
      res.send("success", data);
    })
    .catch(err => {
      console.log("Error getting all posts", err);
    });
};

exports.getAllReplies = (req, res, next) => {
  let postid = req.params.postid;

  replyData
    .getReplyPost(postid)
    .then(data => {
      console.log("success adding reply", data);
    })
    .catch(err => {
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
    .then(data => {
      console.log("success adding reply", data);
    })
    .catch(err => {
      console.log("Error adding reply", err);
    });
};
