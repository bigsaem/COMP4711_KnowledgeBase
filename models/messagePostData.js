let db = require("../db/db");

function addMessagePost(data) {
  let sql = `INSERT INTO messagepost (topic, subject, postdetail, timestamp, userid) VALUES('${
    data.topic
  }', '${data.subject}', '${data.postdetail}', to_timestamp(${data.timestamp /
    1000}),'${data.userid}')`;
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

function getLatestPosts(limit, offset) {
  let sql = `SELECT * FROM messagepost ORDER BY postid DESC LIMIT ${limit} OFFSET ${offset}`;
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

module.exports = {
    addPost : addMessagePost,
    getPost : getMessagePost,
    getTopic : getTopicPost,
    getsubject : getSubjectPost,
    getPostId : getPostById,
    getLatestPosts : getLatestPosts
}
