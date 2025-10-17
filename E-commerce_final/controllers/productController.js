const productService = require('../services/productServices.js');


exports.getAllProducts = (req, res, next) => {
    try {
        const result = productService.getAllProducts();
        res.send(result);
    } catch (err) {
        next(err); 
    }
};

exports.getProductById = (req, res, next) => {
    try {
        const { id } = req.params;
        const result = productService.getProductById(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
};

exports.addProduct = (req, res, next) => {
    try {
        const result = productService.addProduct();
        res.send(result);
    } catch (err) {
        next(err);
    }
};
