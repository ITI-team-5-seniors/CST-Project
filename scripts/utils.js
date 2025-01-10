// script/utils.js
let currentId = 60;

const generateId = () => {
    currentId++;
    return `${currentId}`;
};

export const initializeData = () => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
};

// Get all products, optionally filtered by seller name
export const getProducts = (sellerName) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return sellerName ? products.filter(product => product.seller === sellerName) : products;
};

// Get all orders
export const getOrders = () => {
    return JSON.parse(localStorage.getItem('orders') || '[]');
};

// Add a new product
export const addProduct = (product) => {
    const products = getProducts();
    const newProduct = { 
        ...product, 
        id: generateId(),
        seller: getCurrentSeller() 
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
};

// Update an existing product
export const updateProduct = (index, updatedFields) => {
    const products = getProducts();
    if (index >= 0 && index < products.length) {
        products[index] = { 
            ...products[index], 
            ...updatedFields,
            seller: products[index].seller 
        };
        localStorage.setItem('products', JSON.stringify(products));
        return products[index];
    }
    return null;
};

// Delete a product by ID
export const deleteProduct = (productId) => {
    const products = getProducts();
    const currentSeller = getCurrentSeller();
    const updatedProducts = products.filter(
        product => product.id !== productId || product.seller !== currentSeller
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
};

// Set the current seller
export const setCurrentSeller = (sellerName) => {
    localStorage.setItem('currentSeller', sellerName);
};

// Get the current seller's name
const getCurrentSeller = () => {
    return localStorage.getItem('currentSeller') || 'default_seller';
};
