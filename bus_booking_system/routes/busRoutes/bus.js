const express = require('express');
const router = express();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const db = require("../../database/db");
router.post("/", (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;

    const sql = 'INSERT INTO buses( busNumber, totalSeats, availableSeats) Values(?,?,?)';
    db.query(sql, [busNumber, totalSeats, availableSeats], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'Bus Added successfully' });

    })
})
router.get("/available/:seats", (req, res) => {
    const seats = req.params.seats;

    const sql = 'SELECT  * FROM buses WHERE availableSeats > ?';
    db.query(sql, [seats], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ buses: result });

    })
})
module.exports = router