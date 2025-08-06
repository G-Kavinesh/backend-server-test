// require files where requests handlers are defined
const express = require("express");
const blogQueries = require("../db/blogQueries");

const router = express.Router(); // create a new router, to route what's defined in index.js in this file
// So now instead of app.get we can write router.get

router.get("/", blogQueries.blog_index); // GET request to retreive all post in te database
router.get("/published", blogQueries.blog_published); // GET request to retreive blogs with published status
router.get("/draft", blogQueries.blog_draft); // GET request to retreive blogs with draft status
router.get("/:id", blogQueries.blog_details); // GET request to retreive details of a blog
router.put("/:id", blogQueries.blog_update); // PUT request to update a blog
router.post("/", blogQueries.blog_create_post); // POST request for the form to create a new blog
router.delete("/:id", blogQueries.blog_delete); // DELETE request to delete a blog

// Don't forget :id parameter, always ':' in front for route parameters

module.exports = router; // we now export these function so it can be used in index.js
