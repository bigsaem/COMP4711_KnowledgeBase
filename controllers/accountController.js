const profileData = require("../models/profileData");

exports.signin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let result = profileData.auth(email, password);
  result.then((data) => {
    console.log(data);
    if (data.rows.length == 0) {
      console.log('here?');
      res.render("login", { loginhbs: true, signinFail: true });
    }
    else if (password === data.rows[0].password) {
      console.log('login success');
      res.render('home');
    }
    else{
      res.render("login", { loginhbs: true, signinFail: true });
    }
  });
}

exports.signup = (req, res, next) => {
  for (let key in req.body) {
    if (req.body[key].length == 0) {
      console.log("values empty")
      res.render("login", { loginhbs: true, signupFail: true });
      return;
    }
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

