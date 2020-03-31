const profileData = require("../models/profileData");

exports.signin = (req, res, next) => {
  res.render('signup', { signuphbs: true });
}

exports.signup = (req, res, next) => {

  res.render('signup', { signuphbs: true });

}

exports.signup_additionalInfo = (req, res, next) => {
  res.render('signup', { signuphbs: true });
}

exports.signout = (req, res, next) => {
  res.render('signup', { signuphbs: true });
}

