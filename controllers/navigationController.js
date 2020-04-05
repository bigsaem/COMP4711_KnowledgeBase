const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");
const likesData = require("../models/likesData");
const messagePostData = require("../models/messagePostData");

exports.getHomeInfo = async (req, res, next) => {
  // TODO: We need a model which will get all unique profile likes
  let myInfo = req.session.user;
  let userid = myInfo.userid;
  let isItMyProfile = userid == req.params.userid;
  if(!isItMyProfile){
    res.redirect(`/user/${myInfo.userid}/home`);
    return;
  }
  let postCount = await messagePostData.getPost(userid);
  let likeCount = await likesData.getnumlikes(userid);
  likeCount = likeCount.rows[0].count;
  res.render('home', 
  {
    loggedIn: true, 
    name: myInfo.firstname + " " + myInfo.lastname, 
    url: myInfo.imageurl, 
    facts: myInfo.description,
    posts: postCount.rowCount,
    likes: likeCount,
    myProfile:isItMyProfile,
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
  res.render('editprofile', {userObj: req.session.user});
}

exports.viewProfilePage = async(req, res, next) =>{
  res.render('editprofile', {userObj: req.session.user});
}
