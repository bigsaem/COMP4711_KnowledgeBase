const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");
const likesData = require("../models/likesData");
const messagePostData = require("../models/messagePostData");

exports.getHomeInfo = async (req, res) => {
  // TODO: We need a model which will get all unique profile likes
  let maxPage = 2;
  let myInfo = req.session.user;
  let userid = myInfo.userid;
  let isItMyProfile = userid == req.params.userid;
  let pageNum = req.params.pagenum==undefined? 0 : req.params.pagenum;
  pageNum = pageNum > maxPage? 2:pageNum; 
  let next = pageNum != maxPage? true:false; //for next or prev page button activation
  let prev = pageNum != 0? true:false; 
  if(!isItMyProfile){
    res.redirect(`/user/${myInfo.userid}/home`);
    return;
  }
  let myPosts = await messagePostData.getPost(userid);
  let likeCount = await likesData.getnumlikes(userid);
  let latestPosts;
  if(pageNum == 2){
    latestPosts =await messagePostData.getLatestPosts(1, pageNum*2);
  } else {
    latestPosts = await messagePostData.getLatestPosts(2, pageNum*2);
  }
  console.log(latestPosts.rows);
  likeCount = likeCount.rows[0].count;
  res.render('home', 
  {
    loggedIn: true, 
    name: myInfo.firstname + " " + myInfo.lastname, 
    url: myInfo.imageurl, 
    facts: myInfo.description,
    posts: myPosts.rowCount,
    likes: likeCount,
    myProfile:isItMyProfile,
    userid:userid, 
    latestPosts:latestPosts,
    prev:prev,
    next:next
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
