const express = require('express');
const app = express();
const PORT = 4000;
const Router = require('./routes/route');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});


app.use('/', Router);
app.use((req, res, next) => {
    res.send("Error 404 Not Found");
    next();
})




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
