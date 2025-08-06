// dbconn.js
const { Pool } = require("pg");
const config = require("../config.js");

const pool = new Pool(config.db);

module.exports = pool;
