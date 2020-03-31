const profileData = require("../models/profileData");

exports.signup = (req, res, next) => {
  let username = req.query.username;
  let password = req.query.password;
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let email = req.query.email;

  let data = {
    username,
    password,
    firstname,
    lastname,
    email
  };
  profileData.add(data);
};
