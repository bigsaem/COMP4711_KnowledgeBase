// /*------------------------------------------------------------------------------------------------------------------
// -- FILE: routes.js
// --
// -- DATE: March 24, 2020
// --
// -- REVISIONS:
// --
// -- DESIGNER:    Justin Cervantes,
// --
// -- PROGRAMMER:  Justin Cervantes,
// --
// -- NOTES:
// -- Redirects traffic to one of six controllers.
// ----------------------------------------------------------------------------------------------------------------------*/

// const express = require('express');
// const accountController = require('../controllers/accountController.js');
// const discussionController = require('../controllers/discussionController.js');
// const messageController = require('../controllers/messageController.js');
// const navigationController = require('../controllers/navigationController.js');
// const profileController = require('../controllers/profileController.js');
// const searchController = require('../controllers/searchController.js');

// const router = express.Router();

// // Account Routes
// router.post('/signout',  accountController.signout);
// router.post('/signin',  accountController.signin);
// router.post('/signup',  accountController.signup);
// router.post('/signup/additional_information',  accountController.signup_additionalInfo);

// /* TODO:

// /user/:userid/home Shows the index page
// /search/?keyword= Display the result from the data retrieved after
// querying with the search keyword
// /search/topic/?topic= Display all the discussions that is related with
// the chosen topic
// /post/create Post a question to timeline with subject, detail
// and topic
// /post/:postid/replies Get all the the replies for post id
// /user/:userid/edit_profile Direct the user to edit the user profile
// /post/:postid/replies/comment Add a new comment to the post
// /user/:userid Loads the profile
// /user/:userid/like Likes the user if not already liked
// /user/:userid/messages Allows you to chat on this page(page 10)
// /user/:userid/messages/send Sends a message to the user and content
// (back to messages page)
// /user/:userid/message Loads a view which allows you to message a
// user(page 8)
// /user/:userid/message/send Sends a message to the user with subject
// and content (back to the profile page)
// /user/:userid/posts

// */

// // Sample routes

// // User logout router
// router.get('/logout', (req,res) => {
//     res.render('login', {login:false});
// })

// // User login router
// router.post('/',  loginController.getAllPeople);

// // Add an artist router
// router.post('/add',  peopleController.addPerson);

// // Search for an artist name
// router.post('/search', peopleController.findPerson);

// // Delete artist
// router.post('/delete', peopleController.deletePerson);

// module.exports = router;
