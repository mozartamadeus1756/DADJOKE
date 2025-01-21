// require('dotenv').config();

// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: process.env.DB_CONN_LIMIT || 5
// });

// async function insertData() {
//     let conn;
//     try {
//         conn = await pool.getConnection();

//         const jokeValue = joke;
//         const dateValue = date;

//         const result = await conn.query(
//             "INSERT INTO jokes (joke, date) VALUES (?, ?)",
//             [jokeValue, dateValue]
//         );
//         console.log('insert result', result);

//     } catch (err) {
//         console.error("Database error:", err);
//     } finally {
//         if (conn) conn.release(); 
//     }
// }

// insertData();

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const app = express();
app.use(bodyParser.json()); // To parse JSON request bodies

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT || 5
});

// API Route to save a joke
app.post('/saveJoke', async (req, res) => {
    const { joke, date } = req.body;
    
    if (!joke || !date) {
        return res.status(400).json({ error: "Missing joke or date" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            "INSERT INTO jokes (joke, date) VALUES (?, ?)",
            [joke, date]
        );
        res.json({ message: "Joke saved", result });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error" });
    } finally {
        if (conn) conn.release();
    }
});

// Start the server
app.listen(5501, () => {
    console.log('Server running on port 5501');
});
