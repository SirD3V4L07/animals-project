const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "animals_user",
  password: "Animals5user@",
  database: "animalsdb",
});

module.exports = pool;
