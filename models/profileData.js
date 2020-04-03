var db = require('../db/db');
/*------------------------------------------------------------------------------------------------------------------
-- FILE: profileData.js
--
-- DATE: March 24, 2020
--
-- REVISIONS: Sam Lee, 2020-03-31, changed the code to use email instead of userid and return a promise object.
--            Sam Lee, 2020-04-02, changed edit profile to accept an object
--
-- DESIGNER:    Jameson Cheong
--
-- PROGRAMMER:  Jameson Cheong, Sam Lee
--
-- NOTES:
-- Configuration file as well as entry point for the web application.
----------------------------------------------------------------------------------------------------------------------*/
// Add a single individual to the database
function addProfile(data) {
    let sql = `INSERT INTO profile (username, "password", firstname, lastname, email) VALUES('${data.username}', '${data.password}', '${data.firstname}', '${data.lastname}', '${data.email}')`;
    return db.query(sql);
}

function authUser(email,password){
    let sql = `SELECT * FROM profile where email like '${email}'`;
    return db.query(sql);
}

function getProfileDB(userid) {
    let sql = `SELECT * FROM profile where userid like '${userid}'`;
    return db.query(sql);
}

function editProfileDB(user, userid) {
    let sql = `UPDATE knowledge_schema.profile SET  firstname='${user.firstname}', lastname='${user.lastname}',  where userid='${userid}'`;
    return db.query(sql);
}

function removeProfileByUserName(userid) {
    let sql = `DELETE * FROM profile where username like '${userid}'`;
    return db.query(sql);
}


module.exports = {
    add : addProfile,
    auth : authUser,
    getProfile: getProfileDB,
    editProfile: editProfileDB,
    removeProfile: removeProfileByUserName,
}