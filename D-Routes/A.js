const express = require('express');
const app = express();

app.use(express.json());
app.get('/welcome/:username', (req, res) => {
    const { username } = req.params;
    const { role } = req.query;

    if (!role) {
        return res.send(`Welcome ${username}, please provide your role using '?role=yourRole'.`);
    }

    res.send(`Welcome ${username}, your role is ${role}`);
});


app.use((req, res, next) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
