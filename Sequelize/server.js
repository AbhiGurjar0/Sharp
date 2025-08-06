const express = require('express');
const sequelize = require('./config/db');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

app.use(express.json());


app.post('/add-student', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const student = await Student.create({ name, email, age });
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



sequelize.sync()
    .then(() => {
        console.log('Database synced and table created.');
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
