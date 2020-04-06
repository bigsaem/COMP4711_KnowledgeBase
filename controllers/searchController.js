const messagePostData = require("../models/messagePostData");

exports.searchKeyword = async (req, res, next) => {
  let keyword = req.query.keyword;
  let posts = await messagePostData.getsubject(keyword);

  res.render('searchpage',{loggedIn:true,postsData: posts.rows});
};

exports.searchTopic = async (req, res, next) => {
  let topic = req.query.topic;
  let posts = await messagePostData.getTopic(topic);
  res.render('searchpage',{loggedIn:true,postsData: posts.rows});
};
