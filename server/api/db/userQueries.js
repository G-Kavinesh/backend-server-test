const pool = require('./dbconn'); // import the User model

// name and conventions
// user_index, user_details, user_update, user-create_post, user_delete

//Middleware to get the list of all users, GET requet
const user_index = (req, res) => {
        const result = pool.query('SELECT * FROM users ORDER BY id;') // find all users and sort them by createdAt in descending order
      .then((result) => {
        res.status(200).json({ 
          success: true,  
          message: 'All users retreived successfully',
          data: result.rows, 
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ 
          success: false,
          message: 'Failed to retreive users', 
          error: err 
        });
    });
}

// Middleware to get a specific user with the id
const user_details = (req, res) => {
  const { id } = req.params;
    const result = pool.query('SELECT * FROM users WHERE id = $1', [id]) // safer to use $1 as a placeholder and return the array [id], instead of ${id}
      .then((result) => {
        if (result.rows.length === 0) { // As we return an array we check the length, here !return wouldn't work
          return res.status(404).json({ 
            success: false,
            message: 'User not found' 
          });
        }
          res.status(200).json({
            success: true,
            message: 'User found successfully',
            data: result.rows[0]
          });
      })
      .catch((err) => {
        res.status(500).json({ 
          success:false,
          message: 'Something went wrong', 
          error: err 
        });
      });
}

// Middleware to update a specific user by id
const user_update = async (req, res) => {
  const { id } = req.params; // to get with index request and write manually the id in the URL for this request
  const { name, email } = req.body; // to be written in body section as a JSON file in Postman to test
  try {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', 
      [name, email, id] // RETURNING * returns the row updated, instead of just saying 1 row updated
    ); 
    if(result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    }); // updated User object
  } catch (err) {
      if (err.code === 23505) { // postgreSQL duplicate key error
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }

    res.status(500).json({ 
      success: false,
      message: 'Error updating user', 
      error: err 
    });
    };
}

// Middleware to create a user, POST request
const user_create_post = (req, res) => {
  // here we want to save data from the form, first we need to access it (l. 23)
  const { name, email } = req.body; // to be written in body section as a JSON file in Postman to test
  const result = pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'User created successfully',
          data: result.rows[0]
        });
      })
      .catch((err) => {
      if (err.code === 23505) { // PostgreSQL duplicate key error
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
        
        res.status(500).json({ 
          success: false,
          message: 'Error creating user', 
          error: err 
        });
      });
}

// Middleware to delete a user by id
const user_delete = (req, res) => {
  const { id } = req.params;
    const result = pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({ 
            success: false,
            message: 'This ID does not exist' 
          });
        }
        res.status(200).json({ 
          success: true,
          message: 'User deleted successfully' 
        });
      })
      .catch((err) => {
        res.status(500).json({ 
          success: false,
          message: 'Error deleting user', 
          error: err 
        });
      });
}

module.exports = {
    user_index,
    user_details,
    user_update,
    user_create_post,
    user_delete
}