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
    let sql =
        `INSERT INTO profile (password, firstname, lastname, email, imageurl, description, country, dateofbirth)
     VALUES('${data.password}', '${data.firstname}', '${data.lastname}', '${data.email}', '${data.imageurl}', '${data.description}', '${data.country}', '${data.dateofbirth}')`;
    console.log(sql);
    return db.query(sql);
}

function getProfileById(userid) {
    let sql = `SELECT * FROM profile where userid = ${userid}`;
    return new Promise((resolve, reject) => {
        db.query(sql)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
function getProfileByEmail(email) {
    let sql = `SELECT * FROM profile where email = '${email}'`;
    return db.query(sql);
}

function editProfileDB(user, userid) {
    let sql = `UPDATE profile SET firstname='${user.firstname}', lastname='${user.lastname}', imageurl = '${user.imageurl}', description = '${user.description}', country = '${user.country}', dateofbirth = '${user.dateofbirth}'  where userid=${userid}`;
    return db.query(sql);
}

function removeProfileByUserName(userid) {
    let sql = `DELETE * FROM profile where userid = ${userid}`;
    return db.query(sql);
}


module.exports = {
    loggedIn: true,
    add: addProfile,
    getProfileById: getProfileById,
    getProfileByEmail: getProfileByEmail,
    editProfile: editProfileDB,
    removeProfile: removeProfileByUserName,
}