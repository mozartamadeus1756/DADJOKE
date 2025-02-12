CREATE TABLE IF NOT EXISTS users (
    user_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS jokes (
    joke_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    joke TEXT NOT NULL,
    date DATE,
    user_id INT(11),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

