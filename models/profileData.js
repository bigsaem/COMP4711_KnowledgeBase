var db = require('../db/db');
// Add a single individual to the database
function addProfile(data) {
    let sql = `INSERT INTO profile (username, "password", firstname, lastname, email) VALUES('${data.username}', '${data.password}', '${data.firstname}', '${data.lastname}', '${data.email}')`;
    return db.query(sql);
}

function authUser(email,password){
    let sql = `SELECT * FROM profile where email like '${email}'`;
    return db.query(sql);
}

function getProfileDB(username) {
    let sql = `SELECT * FROM profile where username like '${username}'`;
    return db.query(sql);
}

function editProfileDB(username,firstname,lastname,email) {
    let sql = `UPDATE knowledge_schema.profile SET  firstname='${firstname}', lastname='${lastname}', email='${email}' where username='${username}'`;
    return db.query(sql);
}


module.exports = {
    add : addProfile,
    auth : authUser,
    getProfile: getProfileDB,
    editProfile: editProfileDB,
}