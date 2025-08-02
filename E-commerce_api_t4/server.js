const express = require('express');
const app = express();
const productRouters = require('./Routes/productRoute')
app.use('/product', productRouters);
app.listen(3000, () => {
    console.log("Server Running on port 3000")
})
