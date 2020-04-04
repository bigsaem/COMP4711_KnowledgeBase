const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");
const likesData = require("../models/likesData");
const messagePostData = require("../models/messagePostData");

exports.getHomeInfo = async (req, res, next) => {
  // TODO: We need a model which will get all unique profile likes
  let userid = req.session.user.userid;
  let myprofile = userid == req.params.userid;
  console.log(userid, req.params.userid, myprofile);
  if(!myprofile){
    res.redirect(`/user/${req.session.user.userid}/home`);
    return;
  }
  let postCount = await messagePostData.getPost(userid);
  let likeCount = await likesData.getnumlikes(userid);
  likeCount = likeCount.rows[0].count;
  res.render('home', 
  {
    loggedIn: true, 
    name: req.session.user.firstname + " " + req.session.user.lastname, 
    url: req.session.user.imageurl, 
    facts: req.session.user.description,
    posts: postCount.rowCount,
    likes: likeCount,
    myProfile:myprofile,
    userid:userid, 
  });
};

exports.viewMessagesPage = async (req, res, next) => {
  let userID = req.params.userid;
  let data = {
    to: userID
  };

  let messages = await messageRepliesData.getAll(data);

  //for now until we have a view to render
  console.log(messages);
  res.send("got messages");
};

exports.getMessageHistory = async (req, res, next) => {
  let userID = req.params.userid;
  let recipientID = req.params.recipientid;

  let data = {
    to: userID,
    from: recipientID
  };

  let messages = await messageRepliesData.getOne(data);

  console.log(messages);
};

exports.editProfilePage = async(req, res, next) =>{
  
  console.log(req.session.user);
  res.render('editprofile', {userObj: req.session.user});
}