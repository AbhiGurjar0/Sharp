
const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'products.html'));
});


app.post('/api/products', (req, res) => {
  const { productName } = req.body;
  console.log('Product received:', productName);
  res.send(`Product "${productName}" received successfully!`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
