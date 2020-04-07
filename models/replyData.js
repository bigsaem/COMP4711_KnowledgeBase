let db = require("../db/db");

function addReplyPost(replydetail, timestamp, userid, postid) {
  let sql = `
            INSERT INTO reply (replydetail, "timestamp","userid","postid") 
            VALUES($1, to_timestamp(${timestamp / 1000}),
            '${userid}','${postid}')
            `; 
  return db.query(sql, [replydetail]);
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
