const express = require('express');
const app = express();
const Routes = require('./routes/book');
const sequelize = require('./config/db')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/', Routes);
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing DB', err));
app.listen(3000);