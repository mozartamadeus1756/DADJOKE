require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 5502;

app.use(express.json());
app.use(cors());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});
app.post("/favorite", async (req) => {
  let conn;
  try {
    const {joke, date} = req.body;
    console.log(`recived joke, ${joke}, and date ${date}`);

    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO jokes (joke, date) VALUES (?, ?)", [joke, date]);

  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
});

app.listen(port, () => {
  console.log(`server running at https://localhost:${port}`);
});













