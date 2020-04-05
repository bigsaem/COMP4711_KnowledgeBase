let db = require("../db/db");

function addReplyPost(replydetail, timestamp, userid, postid) {
  let sql = `INSERT INTO reply (replydetail, "timestamp","userid","postid") VALUES('${replydetail}', '${timestamp}','${userid}','${postid}')`;
  return db.query(sql);
}

function getReplyPost(postId) {
  let sql = `
            SELECT replydetail, timestamp, imageurl, firstname, lastname
            FROM reply
            LEFT JOIN profile
            ON reply.userid = profile.userid
            WHERE postid = ${postId}
            ORDER BY timestamp ASC
            `;
  return db.query(sql);
}

module.exports = {
  addReply: addReplyPost,
  getReply: getReplyPost,
};
