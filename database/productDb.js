// In-memory mock database for products
let products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Wireless Headphones", price: 149.50 },
  { id: 3, name: "Gaming Mouse", price: 49.99 }
];

let nextId = 4;

// Simple database functions mimicking database queries
function getAllProducts() {
  return products;
}

function getProductById(id) {
  const numericId = parseInt(id, 10);
  return products.find(product => product.id === numericId) || null;
}

function addProduct(productData) {
  const newProduct = {
    id: nextId++,
    name: productData.name,
    price: parseFloat(productData.price) || 0
  };
  products.push(newProduct);
  return newProduct;
}

function updateProduct(id, productData) {
  const numericId = parseInt(id, 10);
  const index = products.findIndex(product => product.id === numericId);

  if (index === -1) {
    return null;
  }

  // Update existing fields with new values
  products[index] = {
    ...products[index],
    ...productData,
    id: numericId // ensure ID does not change
  };

  return products[index];
}

function deleteProduct(id) {
  const numericId = parseInt(id, 10);
  const index = products.findIndex(product => product.id === numericId);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
