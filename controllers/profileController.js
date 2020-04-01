const profileData = require("../models/profileData");
const messagePostData = require("../models/messagePostData");

exports.getAllPosts = (req, res, next) => {
  let userid = req.params.userid;

  messagePostData.getPost(userid).then(data => {
    console.log("succecss getting posts", data.rows);
    res.send(data.rows);
  });
};
