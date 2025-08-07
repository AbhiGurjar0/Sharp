const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());
app.use('/students', require('./routes/studentRoutes'));
app.use('/courses', require('./routes/courseRoutes'));

app.listen(3000, async () => {
    await sequelize.authenticate();
    console.log('Server running on http://localhost:3000');
});
