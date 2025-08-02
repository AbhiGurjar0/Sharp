const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productContoller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addNewProduct);

module.exports = router;
