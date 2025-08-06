
const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static('public'));
app.use('/users', userRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
});
