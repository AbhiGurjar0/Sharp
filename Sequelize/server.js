const express = require('express');
const sequelize = require('./config/db');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log('Database synced and table created.');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
