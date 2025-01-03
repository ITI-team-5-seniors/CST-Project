// script/seller.js
import { initializeData, getProducts, addProduct, updateProduct, deleteProduct } from './utils.js';

const renderProducts = () => {
    const products = getProducts();
    const tableBody = document.getElementById('products-table-body');
    // const imgElement = document.getElementById('img');
    // imgElement.src = product.image; 
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button onclick="deleteProductHandler('${product.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
};

const deleteProductHandler = (id) => {
    deleteProduct(id);
    renderProducts();
};

document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    // const img = document.getElementById('img').src;
    addProduct({ name, price, stock });
    renderProducts();
});

window.deleteProductHandler = deleteProductHandler;

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderProducts();
});
// const arr=JSON.parse(localStorage.getItem('products'));
// console.log(arr);