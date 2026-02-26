const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "animals_user",
  password: process.env.DB_PASSWORD,
  database: "animalsdb",
});

module.exports = pool;
