// script/customer.js
import { initializeData, getProducts } from './utils.js';

const renderProducts = () => {
 
    const products = getProducts();
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
        </tr>
      
    `).join('');
    
};

// div.innerHTML=`<div>${product.img}</div>`;

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderProducts();
});
