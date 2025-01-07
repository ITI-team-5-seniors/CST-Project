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
};

export const getProducts = () => {
    return JSON.parse(localStorage.getItem('products') || '[]');
};


export const addProduct = (product) => {
    const products = getProducts();
    const newProduct = { ...product, id: generateId() };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
};

export const updateProduct = (productId, updatedFields) => {
    const products = getProducts();
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        localStorage.setItem('products', JSON.stringify(products));
        return products[index];
    }
    return null;
};


 

export const deleteProduct = (productId) => {
    const products = getProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
};

const arr=JSON.parse(localStorage.getItem('products'));
console.log(arr);
