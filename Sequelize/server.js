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

app.put('/students/:id', async (req, res) => {
    const { name, email, age } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (student) {
        await student.update({ name, email, age });
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});


app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (student) {
        await student.destroy();
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
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
