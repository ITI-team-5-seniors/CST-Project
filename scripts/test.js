
// Manipulating json file.
function loadJson() {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : [];
}

function saveJson(data) {
  localStorage.setItem('products', JSON.stringify(data));
}

// Add a product
function addProduct(product) {
  const products = loadJson();
  products.push(product);
  saveJson(products);
  console.log('Product added:', product);
}

// Update a product by ID
function updateProduct(productId, updatedData) {
  const products = loadJson();
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
      console.log('Product not found!');
      return;
  }
  products[productIndex] = { ...products[productIndex], ...updatedData };
  saveJson(products);
  console.log('Product updated:', products[productIndex]);
}

// Remove a product by ID
function removeProduct(productId) {
  const products = loadJson();
  const filteredProducts = products.filter(p => p.id !== productId);
  if (filteredProducts.length === products.length) {
      console.log('Product not found!');
      return;
  }
  saveJson(filteredProducts);
  console.log(`Product with ID ${productId} removed`);
}

// Example usage
$(document).ready(function () {
  // Add a product
  addProduct({ id: 1, name: 'Product 1', price: 100 });

  // Update a product
  updateProduct(1, { price: 150 });

  // Remove a product
  removeProduct(1);

  // Log all products
  console.log('All products:', loadJson());
});