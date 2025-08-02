const express = require('express');
const app = express();


app.get('/books', (req, res) => {
    res.send("Here is the list of books!");
});

app.post('/books', (req, res) => {
    console.log("Book Data:", req.body);
    res.send("Book has been added!");
});


module.exports = app;