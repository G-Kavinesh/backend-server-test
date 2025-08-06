// require files where requests handlers are defined
const express = require('express');
const userQueries = require('../db/userQueries');

const router = express.Router(); // create a new router, to route what's defined in index.js in this file
                                // So now instead of app.get we can write router.get

router.get('/', userQueries.user_index) // GET request to list all users in the database
router.get('/:id', userQueries.user_details) // GET request to retreive details of a user
router.put('/:id', userQueries.user_update) // PUT request to update a user
router.post('/', userQueries.user_create_post) // POST request to create user in the database
router.delete('/:id', userQueries.user_delete) // DELETE request to delete a user

// Don't forget :id parameter, always ':' in front for route parameters

module.exports = router; // we now export these function so it can be used in index.js
