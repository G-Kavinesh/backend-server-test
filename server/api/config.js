require("dotenv").config();

const config = {
    db: process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: {
                  rejectUnauthorized: false, // required by some cloud DB providers
              },
          }
        : {
              user: process.env.DB_USER,
              host: process.env.DB_HOST,
              database: process.env.DB_NAME,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT || 5432, // <-- PostgreSQL port
          },
    port: process.env.PORT || 3000, // <-- Express app port
};

module.exports = config;
