const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Use environment variables for DB connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || 'myappdb',
};

app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT NOW() as now');
    res.send(`Hello from ECS! Current DB time: ${rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection error: ' + err.message);
  } finally {
    if (connection) connection.end();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

