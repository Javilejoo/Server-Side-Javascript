CREATE DATABASE IF NOT EXISTS blog_db;
USE blog_db;

-- Create a user and grant privileges
CREATE USER IF NOT EXISTS 'blog_user'@'%' IDENTIFIED BY 'blog_password';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    epithet VARCHAR(100),
    occupation VARCHAR(100),
    bounty BIGINT,
    devil_fruit VARCHAR(100),
    image_url TEXT,
    image_base64 TEXT,
    description TEXT
);

