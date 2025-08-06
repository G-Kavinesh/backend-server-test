const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

const config = require('../config');
require('dotenv').config();

const pool = new Pool(config.db);

const seedDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');

    // Clear existing data
    await pool.query('DELETE FROM blogs');
    await pool.query('DELETE FROM users');

    // Generate multiple users and blogs
  for (let i = 0; i < 5; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email().replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();

    const userRes = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
      [name, email]
    );

    const userId = userRes.rows[0].id;

    for (let j = 0; j < 3; j++) {
      const title = faker.lorem.sentence();
      const content = faker.lorem.paragraphs(2);

      await pool.query(
        'INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, userId]
      );
    }
  }

    // In this function, we prefer using process.exit because this actually ends the node process after running. 
    // This is used for one time use function
    // then and catch do the same but DO NOT end the node process.

    console.log('Database successfully populated with initial dummy data');
    process.exit(0); // exit(0) for success
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1); // exit(1) or number != 0 for fail
  }
};

seedDB();
