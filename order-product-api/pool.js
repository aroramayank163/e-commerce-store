const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "acs3909",
  password: "dummy",// use your psql password
  port: 5432
});

module.exports = pool;