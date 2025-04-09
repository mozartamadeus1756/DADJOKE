// require('dotenv').config();
// const mariadb = require('mariadb');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5501;

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: process.env.DB_CONN_LIMIT
// });

app.use(express.static('../public'));
app.get('/', (req, res) => {
    res.sendFile('login.html', { root: '../public' }); // tenk om du skal bruke dette hvis det ikke går på noen annen måte  
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());  

app.post('/register', async (req, res) => {
  let conn;
  try {
      const { username, email, password } = req.body;

      const hashedUsername = crypto.createHash('sha256').update(username).digest('hex');
      const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
      const hashedPassword = await bcrypt.hash(password, 10);
      conn = await pool.getConnection();
      await conn.query(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [hashedUsername, hashedEmail, hashedPassword]
      );

      res.json({ success: true, message: 'user registered successfully' });
  } catch (error) {
      console.error('registration error:', error);
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

    const hashedUsername = crypto.createHash('sha256').update(username).digest('hex');
    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    conn = await pool.getConnection();
    const users = await conn.query('SELECT user_id, username, email, password FROM users WHERE username = ? AND email = ?', [hashedUsername, hashedEmail]);
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'invalid credentials'
      });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'invalid credentials'
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

app.get('/random-joke', async (req, res) => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Dad Joke Web App'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error fetching joke');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching the dad joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

app.listen(port, () => {
  console.log(`Server running!`); //  http://localhost:${port}
});





