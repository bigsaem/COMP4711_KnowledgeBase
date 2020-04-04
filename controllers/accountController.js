/*------------------------------------------------------------------------------------------------------------------
-- FILE: accountController.js
--
-- DATE: March 31, 2020
--
-- REVISIONS: 
--
-- DESIGNER:    Sam Lee
--
-- PROGRAMMER:  Sam Lee
--
-- NOTES:
-- This file manages sign in, sign up and sign out with validation.
----------------------------------------------------------------------------------------------------------------------*/
const profileData = require("../models/profileData");

//check if the user is already logged in and if so, redirect to the 'home' page
exports.sessionCheck = (req, res, next) => {
  if (req.session.user == undefined || req.session.user.length == 0) {
    res.render("login", { loginhbs: true });
  } else {
    res.redirect(`/user/${req.session.user.userid}/home`);
  }
}
exports.signin = (req, res, next) => {
  if (!emptyFieldCheck(req.body)) {
    console.log('request is wrong');
    res.render("login", { loginhbs: true, signinFail: "fill all the fields" });
    return;
  }
  let email = req.body.email;
  let password = req.body.password;
  let result = profileData.getProfileByEmail(email);
  result.then((data) => {
    if (data.rows.length == 0) {
      console.log(data.rows);
      res.render("login", { loginhbs: true, signinFail: "login failed" });
    }
    else if (password === data.rows[0].password) {
      let userObj = data.rows[0];
      req.session.user = userObj;
      res.redirect(`/user/${userObj.userid}/home`);
    }
    else {
      res.render("login", { loginhbs: true, signinFail: "login failed" });
    }
  }).catch((e) => { console.log("error occured in login" + e)});
}

exports.signup = (req, res, next) => {
  if (!emptyFieldCheck(req.body)) {
    res.render("login", { loginhbs: true, signupFail: "Fill all the input box" });
    return;
  }
  let result = profileData.getProfileByEmail(req.body.email);
  result.then((data) => {
    if (data.rows.length != 0) {
      res.render("login", { loginhbs: true, signupFail: "That email is not available to use" });
    } else {
      //profileData.add(req.body);
      req.session.user = req.body;
      res.render('signup', { signuphbs: true });
    }
  }).catch((e) => { console.log("error occured in signup " + e); });
}

//i need a model function to add the additional info 
exports.signup_additionalInfo = (req, res, next) => {
  if (!emptyFieldCheck(req.body)) {
    res.render("signup", { signuphbs: true, signupFail: "Fill all the input box" });
    return;
  }
  console.log(req.body);
  let userObj = req.session.user;
  for (let key in req.body) {
    userObj[key] = req.body[key];
  }
  console.log(userObj);
  profileData.add(userObj).then(res=>{
    profileData.getProfileByEmail(userObj.email).then(data=>{
      console.log(data.rows[0]);
      userObj.userid = data.rows[0].userid;
    }).catch((e) => { console.log("error occured in get user id " + e); });
  }).catch((e) => { console.log("error occured in add data " + e); });
  res.redirect(`/user/${userObj.userid}/home`);
}

exports.signout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}

function emptyFieldCheck(obj) {
  for (let key in obj) {
    if (obj[key].length == 0) {
      console.log("values empty")
      return false;
    }
  }
  return true;
}

