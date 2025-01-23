require('dotenv').config();
const http = require('http'); 
const express = require('express'), bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 5502;

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

// get data

app.get("/see-favorites", async(res) =>{
  let conn;
  try {
      conn = await pool.getConnection();
      const rows = await conn.query(`SELECT * FROM jokes`);
      console.log(rows);
      const jsonS = JSON.stringify(rows);
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(jsonS);

  } catch (e) {
      console.log('database error', e);
  } finally {
      if (conn) conn.release();
  }
}); 

http.createServer(app).listen(5503, ()=>{
  console.log('express server started 5503');
});















