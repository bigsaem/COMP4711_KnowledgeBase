/*------------------------------------------------------------------------------------------------------------------
-- FILE: profileController.js
--
-- DATE: Apr 2, 2020
--
-- REVISIONS: 
--
-- DESIGNER:    Sam Lee
--
-- PROGRAMMER:  Sam Lee
--
-- NOTES:
-- This file manages get, edit profile and see all the dicussions and add likes or cancel
----------------------------------------------------------------------------------------------------------------------*/
const profileData = require("../models/profileData");
const messagePostData = require("../models/messagePostData");
const likesData = require("../models/likesData");
const messageRepliesData = require("../models/messageRepliesData");
//i need handle bar variables to render a page



exports.getAllPosts = (req, res, next) => {
  let userid = req.params.userid;
  messagePostData.getPost(userid).then(data => {
    console.log("succecss getting posts", data.rows);
    res.send(data.rows);
  });
};

exports.editProfile = (req, res, next) => {
  if(req.body == undefined || req.body.length == 0){
    return;
  } 
  profileData.editProfile(req.body, req.params.userid).then(data=>{
    
    for(let key in req.body){
      req.session.user[key] = req.body[key];
    }
    console.log(req.session.user);
    res.redirect(`/user/${req.session.userid}/home`);
  }).catch((e) => { console.log("error occured in edit profile " + e); });
};



exports.addLike = (req, res, next) => {
  let userid = req.params.userid;
  let myid = req.session.user.userid;
  likesData.add(userid, myid).then(data => {
    res.redirect(`/user/${userid}`);
  });
};

exports.removeLike = (req, res, next) => {
  let userid = req.params.userid;
  let myid = req.session.user.userid;
  console.log(userid, myid);
  likesData.delete(userid, myid).then(data => {
    res.redirect(`/user/${userid}`);
  });
};
