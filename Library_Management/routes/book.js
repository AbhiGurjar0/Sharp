const express = require('express');
const app = express();
const bookController = require('../controllers/bookController');
app.get('/', bookController.show);
app.get('/data', bookController.sendData);
app.post('/addbook', bookController.addbook);
app.post('/payFine',bookController.payFine)
app.get('/slip',bookController.slip)

module.exports = app;