const express = require('express');
const app = express();

// Custom Middleware
function addUser(req, res, next) {
    req.user = 'Guest';
    next();
}

// Route using the middleware
app.get('/welcome', addUser, (req, res) => {
    res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

// Starting...  server
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
