const express = require('express');
const { sequelize } = require('./models');
const app = express();

app.use(express.json());
app.use('/', require('./routes/index'));

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running at http://localhost:3000'));
});
