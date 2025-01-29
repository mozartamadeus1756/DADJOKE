require('dotenv').config();
// Remove this line since we're not using http anymore
const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5502;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,     // You had DB_PASSWORD here instead of DB_USER
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
    const res = await conn.query("INSERT INTO jokes (joke, date) VALUES (AES_ENCRYPT(?, SHA2('baldurerbest', 512)), ?)", [joke, date]);
    
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
});

// Add this near the top with other requires
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

// Add this new route before app.listen
app.get("/get-joke", async (req, res) => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Dad Joke Web App'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
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
// Remove this entire section
// http.createServer(app).listen(5503, ()=>{
//   console.log('express server started 5500');
// });


