/*------------------------------------------------------------------------------------------------------------------
-- FILE: index.js
--
-- DATE: March 24, 2020
--
-- REVISIONS:
--
-- DESIGNER:    Justin Cervantes,
--
-- PROGRAMMER:  Justin Cervantes,
--
-- NOTES:
-- Configuration file as well as entry point for the web application.
----------------------------------------------------------------------------------------------------------------------*/

////////////
// CONFIG //
////////////

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require('client-sessions');
const expressHbs = require("express-handlebars");
const app = express();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const searchRoute = require("./routes/searchRoute");
const postRoute = require("./routes/postRoute");

app.use(express.json());

//session object added
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// To install: npm install express-handlebars
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoute);
app.use(userRoute);
app.use(searchRoute);
app.use(postRoute);

//session check applied
app.get("/", (req, res) => {
  if (req.session.user == undefined || req.session.user.userid == undefined) {
    req.session.destroy();
    res.render("login");
  } else {
    res.redirect(`/user/${req.session.user.userid}/home`);
  }
  //res.render("login");
});


app.get('/message', (req, res) => {
  res.render('message', { messagehbs: true });
})

app.get('/:userid/messages', (req, res) => {
  res.render('messagespage', { messagespagehbs: true });
})
////////////
// SERVER //
////////////

app.listen(process.env.PORT || 80);
console.log("node server is running on port 80");
