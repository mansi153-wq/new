create database simple_login;
Create customers table
mysql> CREATE TABLE IF NOT EXISTS customers (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     email VARCHAR(100) NOT NULL UNIQUE,
    ->     password VARCHAR(255) NOT NULL,
    ->     mobile VARCHAR(15),
    ->     otp INT,
    ->     is_verified BOOLEAN DEFAULT FALSE,
    ->     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );