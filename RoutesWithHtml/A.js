
const express = require('express');
const path = require('path');
const app = express();

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'products.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
