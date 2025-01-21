require('dotenv').config();

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT || 5
});

async function insertData() {
    let conn;
    try {
        conn = await pool.getConnection();

        const jokeValue = joke;
        const dateValue = date;

        const result = await conn.query(
            "INSERT INTO jokes (joke, date) VALUES (?, ?)",
            [jokeValue, dateValue]
        );
        console.log('insert result', result);

    } catch (err) {
        console.error("Database error:", err);
    } finally {
        if (conn) conn.release(); 
    }
}

insertData();





