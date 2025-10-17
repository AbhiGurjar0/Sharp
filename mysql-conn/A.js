const express = require('express');
const db = require('./database/db'); 
const app = express();

app.use(express.json());


app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
