const express = require('express');
const app = express();
let PORT = 3000;
const db = require("./database/db");
const index = require('./routes/index')

app.use(express.json());

// routes Seperation
app.use('/', index)

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})