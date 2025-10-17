const express = require('express');
const router = express();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const db = require("../database/db");

router.get("/", (req, res) => {
    res.send("home");
})
router.post("/addUser", (req, res) => {
    const { name, email } = req.body;

    const sql = 'INSERT INTO users(name,email) Values(?,?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'User inserted successfully' });

    })
})
router.get("/users", (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ users: result })
    })

})

router.put("/updateUser/:id", (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;
    if (!name && !email) {
        return res.status(400).json({ error: 'Email And UserName Not Found' });
    }
    //used to prevent from empty values
    let fields = [];
    let values = []
    if (name) {
        fields.push("name = ?");
        values.push(name);

    }
    if (email) {
        fields.push("email = ?");
        values.push(email)
    }
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'User Updated successfully' });

    })
})
router.delete("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;

    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully' });
    });

})
module.exports = router;