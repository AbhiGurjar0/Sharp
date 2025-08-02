// controllers/productController.js

const productService = require('../Services/productServices');

exports.getAllProducts = (req, res) => {
    const result = productService.getAllProducts();
    res.send(result);
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    const result = productService.getProductById(id);
    res.send(result);
};

exports.addProduct = (req, res) => {
    const result = productService.addProduct();
    res.send(result);
};
