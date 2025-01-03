// API URL for fetching products
const API_URL = '../data/products_catalog.json';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const fetchAndStoreProducts = () => {
  return $.ajax({
    url: API_URL,
    method: 'GET',
    dataType: 'json'
  }).then((response) => {
    const products = response.products || [];
    localStorage.setItem('products', JSON.stringify(products));
    return products;
  }).catch((error) => {
    console.error('Error fetching products:', error);
    return [];
  });
};

fetchAndStoreProducts().then((products) => {
  console.log('Fetched products:', products);
}).catch((error) => {
  console.error('Error fetching products:', error);
});


// Initialize data in local storage
 const initializeData = () => {
  const initPromises = [];

  if (!localStorage.getItem('products')) {
      console.log('Fetching products for initialization...');
      initPromises.push(fetchAndStoreProducts());
  }
  if (!localStorage.getItem('carts')) {
      localStorage.setItem('carts', JSON.stringify({}));
  }
  if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
  }

  return $.when(...initPromises).done(() => {
      console.log('Data initialized.');
  }).fail((error) => {
      console.error('Initialization failed:', error);
  });
};


// Product related functions
const getProducts = () => {
  try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      return Array.isArray(products) ? products : [];
  } catch (e) {
      console.error('Error parsing products from localStorage:', e);
      return [];
  }
};


const getProductById = (productId) => {
  const products = getProducts();
  return products.find(product => product.id === productId);
};

const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { ...product, id: generateId() };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

const updateProduct = (productId, updatedFields) => {
  const products = getProducts();
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedFields };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  }
  return null;
};

const deleteProduct = (productId) => {
  const products = getProducts();
  const updatedProducts = products.filter(product => product.id !== productId);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
};

// Customer related functions
const getCart = (customerId) => {
  const carts = JSON.parse(localStorage.getItem('carts') || '{}');
  return carts[customerId] || [];
};

const addToCart = (customerId, productId, quantity) => {
  const carts = JSON.parse(localStorage.getItem('carts') || '{}');
  const cart = carts[customerId] || [];
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  carts[customerId] = cart;
  console.log(carts);
  localStorage.setItem('carts', JSON.stringify(carts));
};

const removeFromCart = (customerId, productId) => {
  const carts = JSON.parse(localStorage.getItem('carts') || '{}');
  const cart = carts[customerId] || [];
  carts[customerId] = cart.filter(item => item.productId !== productId);
  localStorage.setItem('carts', JSON.stringify(carts));
};

const checkout = (customerId, shippingDetails, paymentDetails) => {
  const cart = getCart(customerId);
  const products = getProducts();
  let orderTotal = 0;

  // Calculate total and update stock
  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      orderTotal += product.price * item.quantity;
      product.stock -= item.quantity; 
    }
  });

  // Create order
  const order = {
    id: generateId(),
    customerId,
    items: cart,
    total: orderTotal,
    shippingDetails,
    paymentDetails,
    status: 'Processing',
    date: new Date().toISOString()
  };

  // Update orders
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  const carts = JSON.parse(localStorage.getItem('carts') || '{}');
  delete carts[customerId];
  localStorage.setItem('carts', JSON.stringify(carts));

  // Update product stock
  localStorage.setItem('products', JSON.stringify(products));

  return order;
};

// Seller related functions
const getSellerProducts = (sellerId) => {
  const products = getProducts();
  return products.filter(product => product.sellerId === sellerId);
};

const getSellerOrders = (sellerId) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter(order => 
    order.items.some(item => {
      const product = getProductById(item.productId);
      return product && product.sellerId === sellerId;
    })
  );
};

export {
  initializeData,
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
  getSellerProducts,
  getSellerOrders
};


$(document).ready(() => {
  initializeData().then(() => {
    console.log('Data initialized successfully');
  });
});
