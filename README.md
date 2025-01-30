
# Dad Joke Application

A fun web application that fetches random dad jokes and allows users to save their favorites. Built with Express.js, MariaDB, and vanilla JavaScript.

## Features

- Fetch random dad jokes from the icanhazdadjoke API
- Save favorite jokes to a database
- View all saved favorite jokes
- Responsive design with a fun, playful interface

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MariaDB
- API: icanhazdadjoke

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your database credentials:
```env
DB_HOST='localhost'
DB_USER='your_username'
DB_PASSWORD='your_password'
DB_NAME='dada_joke'
DB_CONN_LIMIT=5
```

4. Set up the database:
```sql
CREATE DATABASE dada_joke;
USE dada_joke;

CREATE TABLE jokes (
    joke_id INT AUTO_INCREMENT PRIMARY KEY,
    joke BLOB NOT NULL,
    date DATE NOT NULL
);
```

## Project Structure

```plaintext
dad_joke/
├── index.html          # Main page
├── favorites.html      # Favorites display page
├── script.js          # Main JavaScript
├── favorites.js       # Favorites page JavaScript
├── style.css         # Main styles
├── fav.css          # Favorites page styles
├── server.js        # Express server
└── .env            # Environment variables
```

## Code Examples

### Main Page (index.html)
```html
<body>
    <button id="button" type="button">GET DADAJOKE</button>
    <p id="punchline"></p>
    <button id="favorite">❤️ Add to Favorites</button>
    <button id="see-favorites">See Favorites</button>
    <script src="script.js"></script>
</body>
```

### Server Endpoints (server.js)
```javascript
// Fetch a new joke
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
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

// Save a favorite joke
app.post("/favorite", async (req, res) => {
  let conn;
  try {
    const {joke, date} = req.body;
    conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO jokes (joke, date) VALUES (AES_ENCRYPT(?, SHA2('baldurerbest', 512)), ?)", 
      [joke, date]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.release();
  }
});
```

### Styling Example (style.css)
```css
body {
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    height: 100vh; 
    margin: 0; 
    background-color: yellow;
    font-family: 'Jersey 15', sans-serif;
}

.joke-card {
    background-color: white;
    padding: 15px;
    margin: 10px 0; 
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    max-width: 500px; 
    text-align: center;
}
```

## Running the Application

1. Start the server:
```bash
node server.js
```

2. Access the application at `http://localhost:5502`

## Features in Detail

1. **Random Joke Generation**
   - Click the "GET DADAJOKE" button to fetch a random joke
   - Jokes are fetched from the icanhazdadjoke API

2. **Favorite System**
   - Save jokes you like with the "Add to Favorites" button
   - View all saved jokes in the favorites page
   - Jokes are encrypted in the database for security

3. **Responsive Design**
   - Mobile-friendly interface
   - Clean, readable joke cards
   - Playful yellow theme with Jersey font

## Security Features

- Database encryption for stored jokes
- Environment variable configuration
- Error handling for API and database operations

## Future Improvements

- Add user authentication
- Include joke rating system
- Host website on a VM
- Make a better background with JS canvas 


