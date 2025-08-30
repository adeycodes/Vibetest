CREATE DATABASE IF NOT EXISTS vibetest;
USE vibetest;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    plan ENUM('Free','Pro','Business') DEFAULT 'Free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    repo_url VARCHAR(255),
    scan_id VARCHAR(100) UNIQUE,
    status ENUM('pending','scanning','completed','failed') DEFAULT 'pending',
    last_scan DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE scan_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_id INT,
    bugs_found INT DEFAULT 0,
    performance_score INT,
    security_issues INT DEFAULT 0,
    report_json TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES apps(id)
);