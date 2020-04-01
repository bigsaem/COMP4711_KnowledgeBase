const db = require("../db/db");
const table = "messagereply";

let postMessage = data => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          INSERT INTO ${table}
              (subject, content, timestamp, to, from)
          VALUES
              ('${data.subject}', '${data.content}', '${data.timestamp}', '${data.to}', '${data.from}');
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
          WHERE 'to' = ${data.to} AND 'from' = ${data.from}
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

let getAllConversation = data => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          SELECT * FROM ${table} 
          WHERE 'to' = ${data.to}
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

module.exports = {
  post: postMessage,
  getOne: getConversation,
  getAll: getAllConversation
};
