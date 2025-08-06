-- Create the user with password
-- CREATE USER db_user WITH PASSWORD 'your_secure_password';

-- Create the database
-- CREATE DATABASE Assignment OWNER db_user;

-- Grant full access to the new database
-- GRANT ALL PRIVILEGES ON DATABASE Assignment TO db_user;

-- Connect to the new database
-- \c Assignment db_user;

-- The functions above are made manually

-- Create Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Blogs table
CREATE TABLE Blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    image_url TEXT,
    created_at DATE DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    last_updated DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);