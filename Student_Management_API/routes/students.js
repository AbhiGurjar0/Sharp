const express = require('express');
const router = express.Router();
const db = require('../db');


const log = (action, detail) => console.log(`[${action}]`, detail);


router.post('/', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO students (name, email, age) VALUES (?, ?, ?)',
            [name, email, age]
        );
        log('INSERT', { id: result.insertId, name, email, age });
        res.status(201).json({ id: result.insertId, name, email, age });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', async (_, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?',
            [name, email, age, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        log('UPDATE', { id: req.params.id, name, email, age });
        res.json({ id: req.params.id, name, email, age });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        log('DELETE', { id: req.params.id });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
