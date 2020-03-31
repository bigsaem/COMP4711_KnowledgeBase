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

let express = require('express')
let bodyParser = require('body-parser')
let path = require('path');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let routes = require('./routes/routes');
app.use(express.static(path.join(__dirname, 'public')));



/* TODO: This should take us to a controller which checks if we're logged in,  
   if not, renders the login view, else home view */

app.get('/', (req, res) => {
    res.render('login', { loginhbs: true, signuphbs: false });
})


////////////
// SERVER //
////////////

app.use(routes);
app.listen(80);