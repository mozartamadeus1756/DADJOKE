require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5503;

app.use(express.static(path.join(__dirname))); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

app.post("/favorite", async (req, res) => {
  let conn;
  try {
    const {joke, date} = req.body;
    console.log(`received joke, ${joke}, and date ${date}`);

    conn = await pool.getConnection();
    await conn.query("INSERT INTO jokes (joke, date) VALUES (AES_ENCRYPT(?, SHA2('baldurerbest', 512)), ?)", [joke, date]);
    res.json({ success: true });
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save joke' });
  } finally {
    if (conn) await conn.release();
  }
});

app.listen(port, () => {
  console.log(`server running!`);
});

app.get("/see-favorites", async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      const rows = await conn.query(`
          SELECT joke_id, 
          CAST(AES_DECRYPT(joke, SHA2('baldurerbest', 512)) AS CHAR) AS joke, 
          DATE_FORMAT(date, '%Y-%m-%d') as date 
          FROM jokes 
          ORDER BY date DESC`);
      res.json(rows);
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch favorites' });
  } finally {
      if (conn) await conn.release();
  }
});




