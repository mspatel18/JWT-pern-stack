const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "112233",
  host: "localhost",
  port: 5432,
  database: "jwt",
});
module.exports = pool;
