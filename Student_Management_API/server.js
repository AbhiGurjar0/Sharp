const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const studentRoutes = require('./routes/students')
app.use('/students', studentRoutes);
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})