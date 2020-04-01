let db = require('../db/db');


// Add a single individual to the database
function addProfile(data) {
    let sql = `INSERT INTO profile (username, "password", firstname, lastname, email) VALUES('${data.username}', '${data.password}', '${data.firstname}', '${data.lastname}', '${data.email}')`;
    return db.query(sql);
}

function authUser(username,password){
    let sql = `SELECT * FROM profile where username like '${username}'`;
    let db = db.query(sql)

    if(db == null){
        return false;
    }else{
        if(password == db.password){
            return true;
        }
    }
    return false;
}

function getProfileDB(username) {
    let sql = `SELECT * FROM profile where username like '${username}'`;
    return db.query(sql);
}

function editProfileDB(username,firstname,lastname,email) {
    let sql = `UPDATE knowledge_schema.profile SET  firstname='${firstname}', lastname='${lastname}', email='${email}' where username='${username}'`;
    return db.query(sql);
}

function removeProfileByUserName(username) {
    let sql = `DELETE * FROM profile where username like '${username}'`;
    return db.query(sql);
}


module.exports = {
    add : addProfile,
    auth : authUser,
    getProfile: getProfileDB,
    editProfile: editProfileDB,
    removeProfile: removeProfileByUserName,
}