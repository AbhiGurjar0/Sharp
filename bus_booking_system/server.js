const express = require('express');
const app = express();
let PORT = 3000;
const db = require("./database/db");
const index = require('./routes/index')
const bus = require("./routes/busRoutes/bus")

app.use(express.json());

// routes Seperation
app.use('/', index)
app.use('/buses', bus)


app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})