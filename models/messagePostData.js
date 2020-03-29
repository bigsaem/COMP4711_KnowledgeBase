let db = require('../db/db');

function addMessagePost(data) {
    let sql = `INSERT INTO messagepost (topic, subject, postdetail, "timestamp","userid") VALUES('${data.topic}', '${data.subject}', '${data.postdetail}', '${data.timestamp}','${data.userid}')`;
    return db.query(sql);
}

function getMessagePost(userid) {
    let sql = `SELECT * FROM knowledge_schema.messagepost where userid = '${userid}'`;
    return db.query(sql);
}


module.exports = {
    addPost : addMessagePost,
    getPost : getMessagePost,
}