const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'neh59',
  database: 'banner_db'
});

app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner LIMIT 1', (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post('/api/banner', (req, res) => {
  const { isVisible, description, countdown, link } = req.body;
  db.query('UPDATE banner SET isVisible = ?, description = ?, countdown = ?, link = ? WHERE id = 1', [isVisible, description, countdown, link], (err) => {
    if (err) throw err;
    res.send('Banner updated');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
