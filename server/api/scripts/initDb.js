// initDb.js
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Read setup-db.sql file with the schema
const sql = fs.readFileSync(path.join(__dirname, 'setup-db.sql'), 'utf8');

// Configure your PostgreSQL connection
const client = new Client(config.db);

(async () => {
  try {
    await client.connect();
    console.log('Connected to the database'); 
    // execute the setup-db.sql which creates the tables with constraints
    await client.query(sql); 
    console.log('Database schema created successfully'); 
  } catch (err) {
    console.error('Error initializing database', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
})();
