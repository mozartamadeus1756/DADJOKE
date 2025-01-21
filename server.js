const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', // process.env.DB_HOST,
    user: 'kine', //process.env.DB_USER,
    password: 'kulekine1234', //process.env.DB_PASSWORD,
    database: 'dada_joke', //process.env.DB_NAME
    connectionLimit: 5
});


async function asyncFunction() {
    let conn;
    try {
        const joke = 'ejkeene';
        const date = '2009-12-07';
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM jokes");
      console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("INSERT INTO jokes (joke, date) VALUES (?, ?)", [joke, date]); // (${joke}, ${date})
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
  }
  asyncFunction().then(() => {
    pool.end();
  })



// con.connect(function(err) {
//     if (err) throw err;
//     console.log("connected!");
//     var sql = "INSERT INTO jokes VALUES (0, 'baldir', '2007-11-23')";
//     con.query(sql, function (err, result){
//         if (err) throw err;
//         console.log("1 added");
//     });
// });












