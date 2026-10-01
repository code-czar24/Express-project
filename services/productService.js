const productDb = require('../database/productDb');

// Service handles business logic and calls database functions
function fetchAllProducts() {
  return productDb.getAllProducts();
}

function fetchProductById(id) {
  return productDb.getProductById(id);
}

function createProduct(data) {
  if (!data.name || !data.price) {
    throw new Error("Product name and price are required");
  }
  return productDb.addProduct(data);
}

function modifyProduct(id, data) {
  const existing = productDb.getProductById(id);
  if (!existing) {
    return null;
  }
  return productDb.updateProduct(id, data);
}

function removeProduct(id) {
  const existing = productDb.getProductById(id);
  if (!existing) {
    return false;
  }
  return productDb.deleteProduct(id);
}

module.exports = {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  modifyProduct,
  removeProduct
};
