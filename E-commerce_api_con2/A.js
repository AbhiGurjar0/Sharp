const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
