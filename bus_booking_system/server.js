const express = require('express');
const app = express();
let PORT = 3000;
const db = require("./database/db")

// home
app.get('/', (req, res) => {
    res.send("home ");
})

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})