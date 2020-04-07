const db = require("../db/db");
const table = "likes";

let getLikes = (recipient) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${table} WHERE recipient = '${recipient}';`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
let addLikes = (recipient, owner) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          INSERT INTO ${table}
              (recipient, owner)
          VALUES
              ('${recipient}', '${owner}');
      `
    )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let removeLikes = (recipient, owner) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          DELETE FROM ${table}
            WHERE recipient = ${recipient} AND owner = ${owner};
        `
    )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function getNumberLikes(recipient) {
  let sql = `SELECT COUNT( likeid ) FROM likes
              WHERE recipient = ${recipient}`;
  return db.query(sql);
}

module.exports = {
  add: addLikes,
  delete: removeLikes,
  getnumlikes: getNumberLikes,
  getLikes: getLikes,
};
