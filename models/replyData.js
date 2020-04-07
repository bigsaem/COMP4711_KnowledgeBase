let db = require('../db/db');

function addReplyPost(replydetail,timestamp,userid,postid) {
    let sql = `INSERT INTO reply (replydetail, "timestamp","userid","postid") VALUES('${replydetail}', '${timestamp}','${userid}','${postid}')`;
    return db.query(sql);
}

function getReplyPost(postId) {
    let sql = `SELECT * FROM reply where postid = '${postId}'`;
    return db.query(sql);
}


module.exports = {
    addReply : addReplyPost,
    getReply : getReplyPost,
}