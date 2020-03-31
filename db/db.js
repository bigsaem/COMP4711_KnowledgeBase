//connect to postgres
const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "c4711",
  password: "pgpass",
  port: 5432
});
module.exports = pool;
