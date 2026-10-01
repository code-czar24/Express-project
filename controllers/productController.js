const productService = require('../services/productService');

// Controllers process HTTP requests and send HTTP responses
function getProducts(req, res) {
  const products = productService.fetchAllProducts();
  res.json(products);
}

function getProduct(req, res) {
  const product = productService.fetchProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}

function addProduct(req, res) {
  try {
    const newProduct = productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function updateProduct(req, res) {
  const updatedProduct = productService.modifyProduct(req.params.id, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(updatedProduct);
}

function deleteProduct(req, res) {
  const success = productService.removeProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ message: "Product deleted successfully" });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
