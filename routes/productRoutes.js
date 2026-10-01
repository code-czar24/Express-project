const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product endpoints
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
