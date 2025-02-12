require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const app = express();
const port = 5502;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  let conn;
  try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      conn = await pool.getConnection();
      await conn.query(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword]
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
  const { email, password } = req.body;
  let conn;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'email and password are required'
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
    const { joke, date } = req.body; //  userId
    console.log(`received joke, ${joke}, and date ${date}`);  // for user ${userId}


    conn = await pool.getConnection();
    await conn.query("INSERT INTO jokes (joke, date) VALUES (?, ?)", [joke, date]); // userId,
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
      // const userId = req.query.userId;
      conn = await pool.getConnection();
      const rows = await conn.query(`
        SELECT joke_id, 
        joke,
        DATE_FORMAT(date, '%Y-%m-%d') as date 
        FROM jokes 
        ORDER BY date DESC`); //[userId]);
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