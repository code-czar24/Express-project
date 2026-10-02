const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware, invalidateCache } = require('../middleware/cache');

// Apply cache invalidation to all mutation endpoints
router.use(invalidateCache);

// Apply caching middleware to GET endpoints
router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProduct);

// Mutation endpoints that trigger cache invalidation
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
