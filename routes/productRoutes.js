const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cache');

// Apply caching middleware to GET endpoints
router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProduct);

router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
