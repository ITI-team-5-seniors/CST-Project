// API URL for fetching products
const API_URL = '../data/products_catalog.json';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const fetchAndStoreProducts = () => {
  return $.ajax({
    url: API_URL,
    method: 'GET',
    dataType: 'json',
  })
    .then((response) => {
      const products = response.products || [];
      localStorage.setItem('products', JSON.stringify(products));
      return products;
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      return [];
    });
};

// fetchAndStoreProducts()
//   .then((products) => {
//     console.log('Fetched products:', products);
//   })
//   .catch((error) => {
//     console.error('Error fetching products:', error);
//   });

// Initialize data in local storage
const initializeData = () => {
  // Check if data has already been initialized
  if (localStorage.getItem('dataInitialized')) {
    console.log('Data has already been initialized.');
    return $.Deferred().resolve().promise(); // Return a resolved promise to maintain consistency
  }

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

  return $.when(...initPromises)
    .done(() => {
      console.log('Data initialized.');
      localStorage.setItem('dataInitialized', 'true'); // Set the initialization flag
    })
    .fail((error) => {
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
  let product = products.find((product) => product.id == productId);
  return product;
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
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedFields };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  }
  return null;
};

const deleteProduct = (productId) => {
  const products = getProducts();
  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem('products', JSON.stringify(updatedProducts));
};
const getCurrentUser = () => {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    return currentUser['username'];
  } else return false;
};

// Customer related functions
const getCart = () => {
  let username = getCurrentUser();
  if (username) {
    const carts = JSON.parse(localStorage.getItem('carts') || '{}');
    return carts[username] || [];
  } else return false;
};
const setCart = (products) => {
  let username = getCurrentUser();
  if (username) {
    let carts = JSON.parse(localStorage.getItem('carts') || '{}');
    carts[username] = products;
    localStorage.setItem('carts', JSON.stringify(carts));
    return true;
  } else return false;
};

const addToCart = (productId, quantity) => {
  let cart = getCart()
  if(cart){
    console.log(cart)
  let existingItem = cart.find(
      (item) => item.productId == productId
    );
    console.log(existingItem)
    const stockProduct = getProductById(productId);

    if (existingItem) {
      if (existingItem.quantity + quantity > stockProduct.stock) {
        $('#danger').css({ display: 'block' });
        setTimeout(function () {
          $('#danger').css({ display: 'none' });
        }, 2000);
      } else {
        existingItem.quantity += quantity;
      }
    } else {
      if (quantity > stockProduct.stock) {
        $('#danger').css({ display: 'block' });
        setTimeout(function () {
          $('#danger').css({ display: 'none' });
        }, 2000);
      } else {

        cart.push({ productId, quantity });
      }
    }
    setCart(cart)    
  $('#success').css({ display: 'block' });
    setTimeout(function () {
      $('#success').css({ display: 'none' });
    }, 2000);
  } else {
    $('#warning').css({ display: 'block' });
    setTimeout(function () {
      $('#warning').css({ display: 'none' });
    }, 2000);
  }
};

const removeFromCart = (productId) => {
  let cart = getCart();
  console.log(cart)
  cart = cart.filter((item) => item.productId != productId);
  console.log(cart)
  setCart(cart);
};

const checkout = (customerName) => {
  //shippingDetails, paymentDetails
  const cart = getCart(customerName);
  const products = getProducts();
  let orderTotal = 0;

  // Calculate total and update stock
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      orderTotal += product.price * item.quantity;
      product.stock -= item.quantity;
    }
  });

  // Create order
  const order = {
    id: generateId(),
    customerName,
    items: cart,
    total: orderTotal,
    // shippingDetails,
    // paymentDetails,
    status: 'Processing',
    date: new Date().toISOString(),
  };

  // Update orders
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  const carts = JSON.parse(localStorage.getItem('carts') || '{}');
  carts[customerName] = [];
  localStorage.setItem('carts', JSON.stringify(carts));

  // Update product stock
  localStorage.setItem('products', JSON.stringify(products));

  return order;
};

// Seller related functions
const getSellerProducts = (sellerId) => {
  const products = getProducts();
  return products.filter((product) => product.sellerId === sellerId);
};

const getSellerOrders = (sellerId) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter((order) =>
    order.items.some((item) => {
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
  setCart,
  addToCart,
  removeFromCart,
  checkout,
  getSellerProducts,
  getSellerOrders,
};

$(document).ready(() => {
  initializeData().then(() => {
    console.log('Data initialized successfully');
  });
});
