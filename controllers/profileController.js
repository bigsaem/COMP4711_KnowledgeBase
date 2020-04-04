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
//i need handle bar variables to render a page
exports.getProfile = (req, res, next) => {
  let userid = req.params.userid;
  profileData.getProfile(userid).then(data => {
    res.send(data.rows[0]);
  });
};
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

exports.checkLike = (req, res, next) => {
  let userid = req.params.userid;
  likesData.add(userid, req.session.userid).then(data => {
    
  });
};

exports.addLike = (req, res, next) => {
  let userid = req.params.userid;
  likesData.add(userid, req.session.userid).then(data => {
    res.redirect(`/user/${userid}`);
  });
};

exports.removeLike = (req, res, next) => {
  let userid = req.params.userid;
  likesData.delete(userid, req.session.userid).then(data => {
    res.redirect(`/user/${userid}`);
  });
};
