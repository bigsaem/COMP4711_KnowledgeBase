const db = require("../db/db");
const table = "messagereply";

let postMessage = data => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          INSERT INTO ${table}
              (subject, content, "timestamp", "to", "from")
          VALUES
             ('${data.subject}',
              '${data.content}', 
              to_timestamp(${data.timestamp / 1000}),
              '${data.to}',
              '${data.from}');
      `
    )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

let getConversation = data => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          SELECT * FROM ${table} 
          LEFT JOIN profile
          ON ${table}.to = profile.userid
          WHERE ((${table}.to = ${data.to} AND ${table}.from = ${data.userid})
          OR (${table}.to = ${data.userid} AND ${table}.from = ${data.to}))
          AND subject = '${data.subject}'
          ORDER BY ${table}.timestamp ASC
      `
    )
      .then(data => {
        resolve(data.rows);
      })
      .catch(err => {
        reject(err);
      });
  });
};

let getAllConversationHeader = data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT subject, MAX(timestamp) as lastMessageTime, imageurl, firstname, lastname, userid
      FROM ${table}
      INNER JOIN profile
      ON ${table}.to = profile.userid AND ${table}.from = ${data.userid}
      OR ${table}.from = profile.userid AND ${table}.to = ${data.userid}
      GROUP BY subject, imageurl, firstname, lastname, userid
      ORDER BY lastMessageTime DESC
      `
    )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  post: postMessage,
  getOne: getConversation,
  getAll: getAllConversationHeader
};
