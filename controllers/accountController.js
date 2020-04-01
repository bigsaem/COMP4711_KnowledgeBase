const profileData = require("../models/profileData");

exports.signin = (req, res, next) => {
  if(!emptyFieldCheck(req.body)){
    console.log('request is wrong');
    res.render("login", { loginhbs: true, signinFail: true });
    return;
  }
  let email = req.body.email;
  let password = req.body.password;
  let result = profileData.auth(email, password);
  result.then((data) => {
    if (data.rows.length == 0) {
      res.render("login", { loginhbs: true, signinFail: true });
    }
    else if (password === data.rows[0].password) {
      let promise = profileData.getProfile(email);
      let userObj;
      promise.then((data)=>{
        if(data.rows.length != 0) userObj = data.rows[0];
        req.session.user = userObj;
        console.log(`/user/${userObj.userid}/home`);
        res.redirect(`/user/${userObj.userid}/home`);
      });
    }
    else{
      res.render("login", { loginhbs: true, signinFail: true });
    }
  });
}

exports.signup = (req, res, next) => {
  if(!emptyFieldCheck(req.body)){
    res.render("login", { loginhbs: true, signupFail: true });
    return;
  } 
  console.log(req.body);
  profileData.add(req.body);
  res.render('signup', { signuphbs: true });
}

exports.signup_additionalInfo = (req, res, next) => {
  res.render('signup', { signuphbs: true });
}

exports.signout = (req, res, next) => {
  res.render('signup', { signuphbs: true });
}

function emptyFieldCheck(obj){
  for (let key in obj) {
    if (obj[key].length == 0) {
      console.log("values empty")
      return false;
    }
  }
  return true;
}

function getProfile(email){
  let result = profileData.getProfile(email);
  let user = {}
  result.then((data)=>{
    console.log(data.rows[0]);
    if(data.rows.length != 0) user = data.rows[0];
    console.log(user);
  });
  console.log(user);
  return user;
}