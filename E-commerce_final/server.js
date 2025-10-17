const express = require('express');
const app = express();
const PORT = 4000;

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
