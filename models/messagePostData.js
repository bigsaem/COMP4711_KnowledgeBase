let db = require("../db/db");

function addMessagePost(data) {
  let sql = `INSERT INTO messagepost (topic, subject, postdetail, timestamp, userid) 
              VALUES( '${data.topic}', 
                      $1, 
                      $2, 
                      to_timestamp(${data.timestamp / 1000}),
                      '${data.userid}')
            `;
  return db.query(sql, [data.subject, data.postdetail]);
}

function getMessagePost(userid) {
  let sql = `
      SELECT profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, COUNT(replyid) as replies, imageurl
      FROM messagepost 
      LEFT JOIN reply
      ON reply.postid = messagepost.postid
      LEFT JOIN profile
      ON messagepost.userid = profile.userid
      WHERE messagepost.userid = ${userid}
      GROUP BY profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, imageurl
  `;
  return db.query(sql);
}

function getPostById(postid) {
  let sql = `
        SELECT profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, COUNT(replyid) as replies, imageurl
        FROM messagepost 
        LEFT JOIN reply
        ON reply.postid = messagepost.postid
        LEFT JOIN profile
        ON messagepost.userid = profile.userid
        WHERE messagepost.postid = ${postid}
        GROUP BY profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, imageurl
            `;
  return db.query(sql);
}

function getTopicPost(topic) {
  // let sql = `SELECT * FROM messagepost where topic like '${topic}'`;
  let sql = ` SELECT profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, COUNT(replyid) as replies, imageurl
              FROM messagepost 
              LEFT JOIN reply
              ON reply.postid = messagepost.postid
              LEFT JOIN profile
              ON messagepost.userid = profile.userid
              WHERE topic like '${topic}'
              GROUP BY profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, imageurl`;
  return db.query(sql);
}
//category
function getSubjectPost(subject) {
  let sql = ` SELECT profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, COUNT(replyid) as replies, imageurl
              FROM messagepost 
              LEFT JOIN reply
              ON reply.postid = messagepost.postid
              LEFT JOIN profile
              ON messagepost.userid = profile.userid
              WHERE subject like $1
              GROUP BY profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, imageurl`;
  return db.query(sql, ["%" + subject + "%"]);
}

function getLatestPosts(limit, offset) {
  let sql = ` SELECT profile.userid, messagepost.postid, messagepost.userid, topic, subject, postdetail, messagepost.timestamp, COUNT(replyid) as replies, imageurl
              FROM messagepost 
              LEFT JOIN reply
              ON reply.postid = messagepost.postid
              LEFT JOIN profile
              ON messagepost.userid = profile.userid
              GROUP BY profile.userid, messagepost.postid, topic, subject, postdetail, messagepost.timestamp, imageurl
              ORDER BY postid DESC LIMIT ${limit} OFFSET ${offset}
            `;
  return new Promise((resolve, reject) => {
    db.query(sql)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  addPost: addMessagePost,
  getPost: getMessagePost,
  getTopic: getTopicPost,
  getsubject: getSubjectPost,
  getPostId: getPostById,
  getLatestPosts: getLatestPosts,
};
