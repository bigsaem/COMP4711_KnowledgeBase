let db = require('../db/db');

function addMessagePost(data) {
    let sql = `INSERT INTO messagepost (topic, subject, postdetail, "timestamp","userid") VALUES('${data.topic}', '${data.subject}', '${data.postdetail}', '${data.timestamp}','${data.userid}')`;
    return db.query(sql);
}

function getMessagePost(userid) {
    let sql = `SELECT * FROM messagepost where userid = '${userid}'`;
    return db.query(sql);
}

function getPostById(postid) {
    let sql = `SELECT * FROM messagepost where postid = '${postid}'`;
    return db.query(sql);
}

function getTopicPost(topic) {
    let sql = `SELECT * FROM messagepost where topic like '${topic}'`;
    return db.query(sql);
}
//category
function getSubjectPost(subject) {
    let sql = `SELECT * FROM messagepost where subject like '${subject}'`;
    return db.query(sql);
}

module.exports = {
    addPost : addMessagePost,
    getPost : getMessagePost,
    getTopic : getTopicPost,
    getsubject : getSubjectPost,
    getPostId : getPostById,
}