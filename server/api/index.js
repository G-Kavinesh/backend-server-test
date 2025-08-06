// Import URI for PostgreSQL from config.js, defined in .env, safer way to encrypt keys
const config = require("./config.js");
const pool = require("./db/dbconn.js");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const blogRoutes = require("./routes/blogRouter.js"); // where the blogs requests handlers are listed
const userRoutes = require("./routes/userRouter.js"); // where the users requests handlers are listed

// connect to PostgreSQL
pool.connect()
    .then((client) => {
        client.release(); // release the connection back to the pool
        console.log("Connected to PostgreSQL successfully");
    }) // verify connection is established
    .catch((err) => {
        console.error("Failed to connect to PostgreSQL");
        process.exit(1);
    });

app.use(express.json()); // To parse JSON bodies so i can access the properties object with body.name for example
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies, like form submissions
app.use(cors()); // This line allows all origins by default, usefull for Recat which might use a different port
app.use(morgan("dev")); // logging middleware, prints out the request method and URL in the console in real time

app.use("/api/blogs", blogRoutes); // This sets the base path for all blog routes
app.use("/api/users", userRoutes); // This sets the base path for all user routes

// Enable CORS for all routes

// Optional: restrict to specific origin
//  app.use(cors({ origin: 'http://localhost:3000'
//      methods: ['GET', 'POST', 'PUT', 'DELETE'],
//      credentials: true
//  }));

// API-only backend - no static file serving needed

// Only start the server if not on Vercel (serverless)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`); // Express runs in a different port than PSQL
    });
}

module.exports = app;
