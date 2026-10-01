const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Main product routes
app.use('/products', productRoutes);

// Simple root welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Product Management API');
});

// Start the server if file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
