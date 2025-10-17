
const express = require('express');
const path = require('path');

const app = express();


app.use(express.urlencoded({ extended: true }));


app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'products.html'));
});

app.post('/api/products', (req, res) => {
  const { productName } = req.body;
  res.send(`Product "${productName}" added successfully!`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
