require('dotenv').config();
const mariadb = require('mariadb');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5501;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT
});

app.use(express.static('../public'));
app.get('/', (req, res) => {
    res.sendFile('login.html', { root: '../public' });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/register', async (req, res) => {
  let conn;
  try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      conn = await pool.getConnection();
      await conn.query(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword]
      );

      res.json({ success: true, message: 'user registered successfully' });
  } catch (error) {
      console.error('registraation error:', error);
      res.status(500).json({ success: false, message: 'registration failed' });
  } finally {
      if (conn) await conn.release();
  }
});

app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  let conn;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'username, email and password are required'
    });
  }
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(
      'SELECT user_id, email, password FROM users WHERE email = ?',
      [email]
    );

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'ivalid credentials'
      });
    }

    return res.json({
      success: true,
      message: 'login successful'
    });

  } catch (error) {
    console.error('login error:', error);
    return res.status(500).json({
      success: false,
      message: 'server error'
    });
  } finally {
    if (conn) await conn.release();
  }
});


app.post("/favorite", async (req, res) => { 
  let conn;
  try {
    const { joke, date } = req.body; 
    console.log(`received joke, ${joke}, and date ${date}`);  


    conn = await pool.getConnection();
    await conn.query("INSERT INTO jokes (joke, date) VALUES (?, ?)", [joke, date]); 
    res.json({ success: true });
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save joke' });
  } finally {
    if (conn) await conn.release();
  }
});


app.get("/see-favorites", async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      const rows = await conn.query(`
        SELECT joke_id, 
        joke,
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


app.listen(port, () => {
  console.log(`Server running! http://localhost:${port}`);
});