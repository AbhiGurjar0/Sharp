const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/user');
const Bus = require('./models/bus');

const app = express();
app.use(express.json());
const userRoutes = require('./routes/users');
const busRoutes = require('./routes/buses');

app.use('/users', userRoutes);
app.use('/buses', busRoutes);


sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));

    })



