

/*------------------------------------------------------------------------------------------------------------------
-- FILE: index.js
--
-- DATE: March 24, 2020
--
-- REVISIONS: Sam Lee, 2020-04-01, session module implmented with session object.
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

let express = require('express')
let bodyParser = require('body-parser')
let path = require('path');
const session = require('client-sessions');
let app = express();
app.use(express.json());
let fs = require("fs");
let util = require('util');

// To install: npm install express-handlebars
const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

//session ojbect
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let routes = require('./routes/routes');
app.use(express.static(path.join(__dirname, 'public')));



/* TODO: This should take us to a controller which checks if we're logged in,  
   if not, renders the login view, else home view */

app.get('/', (req, res) => {
    res.render('login', { loginhbs: true });
})

app.get('/profile', (req, res) => {
    res.render('partials/userprofile', { userprofilehbs: true });
})

app.get('/message', (req, res) => {
    res.render('message', { messagehbs: true });
})

app.get('/messages', (req, res) => {
    res.render('messagespage', { messagespagehbs: true });
})

////////////
// SERVER //
////////////

app.use(routes);
app.listen(80);