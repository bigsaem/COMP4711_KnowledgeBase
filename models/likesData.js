const db = require("../db/db");
const table = "likes";

let checkLikes = (recipient, owner) =>{
  return new Promise((resolve, reject) => {
    db.query(
      `
          INSERT INTO ${table}
              (recipient, owner)
          VALUES
              ('${recipient}', '${owner}');
      `
    )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
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
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

let removeLikes = (recipient, owner) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
          DELETE FROM ${table}
            WHERE recipient = ${recipient} AND 'owner' = ${owner};
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
  add: addLikes,
  delete: removeLikes
};
