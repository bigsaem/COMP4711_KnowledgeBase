const messagePostData = require("../models/messagePostData");
const replyData = require("../models/replyData");

exports.searchKeyword = async (req, res, next) => {
  let keyword = req.query.keyword;
  let posts = (await messagePostData.getsubject(keyword)).rows;
  let allPost = await handlePostData(posts);
  console.log(allPost.rows);
  res.render("searchpage", { loggedIn: true, postsData: allPost });
};

exports.searchTopic = async (req, res, next) => {
  let topic = req.query.topic;
  let posts = (await messagePostData.getTopic(topic)).rows;
  let allPost = await handlePostData(posts);
  res.render("searchpage", { loggedIn: true, postsData: allPost });
};

let handlePostData = async (posts) => {
  let allPosts = [];
  posts.forEach(async (data) => {
    let replyInfo = (await replyData.getReply(data.postid)).rows;
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

    let postData = {
      topic: data.topic,
      subject: data.subject,
      content: data.postdetail,
      timestamp: time,
      imageurl: data.imageurl,
      replies: data.replies,
      postid: data.postid,
      replyDetail: replies,
      userid: data.userid,
    };
    allPosts.push(postData);
  });
  return allPosts;
};
