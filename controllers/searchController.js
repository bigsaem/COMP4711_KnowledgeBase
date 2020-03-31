const messagePostData = require("../models/messagePostData");

exports.searchKeyword = async (req, res, next) => {
  let keyword = req.query.params.keyword;
  let posts = await messagePostData.getSubjectPost(keyword);

  console.log(posts);
};

exports.searchTopic = async (req, res, next) => {
  let topic = req.query.params.topic;
  let posts = await messagePostData.getTopicPost(topic);

  console.log(posts);
};
