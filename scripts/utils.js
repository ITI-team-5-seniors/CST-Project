const generateId = () => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const ids = products
        .map(product => parseInt(product.id, 10))
        .filter(id => !isNaN(id));

    const lastId = ids.length > 0 ? Math.max(...ids) : 60;
    console.log(lastId)
    return `${lastId + 1}`;
};


export const initializeData = () => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
};

export const getProducts = (sellerName) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return sellerName ? products.filter(product => product.seller === sellerName) : products;
};

export const getOrders = () => {
    return JSON.parse(localStorage.getItem('orders') || '[]');
};

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

export const deleteProduct = (productId) => {
    const products = getProducts();
    const currentSeller = getCurrentSeller();
    const updatedProducts = products.filter(
        product => product.id !== productId || product.seller !== currentSeller
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
};

export const setCurrentSeller = (sellerName) => {
    localStorage.setItem('currentSeller', sellerName);
};

const getCurrentSeller = () => {
    return localStorage.getItem('currentSeller') || 'default_seller';
};
