import { initializeData, getProducts, addProduct, updateProduct, deleteProduct } from './utils.js';

// Get the current seller's products
const getSellerProducts = () => {
    const products = getProducts();
    const currentSeller = localStorage.getItem('currentSeller');
    return products.filter(product => product.sellerName === currentSeller);
};

// Render products table for the current seller
const renderSellerProducts = () => {
    const products = getSellerProducts();
    const tableBody = document.getElementById('products-table-body');

    // Clear table content
    tableBody.innerHTML = '';

    // Display a message if no products are found
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No products found. Add some to start!</td></tr>';
        return;
    }

    // Populate table with seller's products
    tableBody.innerHTML = products.map((product, index) => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.type}</td>
            <td><img src="${product.image || 'placeholder.jpg'}" width="50" height="50"></td>
            <td>
                <button class="delete-btn" data-id="${index}">Delete</button>
                <button class="update-btn" data-id="${index}">Update</button>
            </td> 
        </tr>
    `).join('');

    // Add event listeners for delete and update actions
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-id');
            handleDelete(index);
        });
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-id');
            handleEdit(index);
        });
    });
};

// Handle product deletion
const handleDelete = (index) => {
    const sellerProducts = getSellerProducts();
    const product = sellerProducts[index];

    if (product && confirm(`Are you sure you want to delete "${product.name}"?`)) {
        deleteProduct(product.id);
        renderSellerProducts();
    }
};

// Handle product editing
const handleEdit = (index) => {
    const sellerProducts = getSellerProducts();
    const product = sellerProducts[index];

    if (product) {
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;
        document.getElementById('type').value = product.type;
        document.getElementById('image').dataset.editId = product.id;
        document.getElementById('submit').textContent = 'Update Product';

        scroll({ top: 1000 });
    }
};

// Handle form submission for adding/updating products
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const type = document.getElementById('type').value;
    const image = document.getElementById('image').files[0];
    const imageUrl = image ? URL.createObjectURL(image) : null;
    const id = document.getElementById('image').dataset.editId;

    if (id) {
        updateProduct(id, { name, price, stock, type, ...(imageUrl && { image: imageUrl }) });
        delete document.getElementById('image').dataset.editId;
    } else {
        const currentSeller = localStorage.getItem('currentSeller');
        addProduct({ name, price, stock, type, image: imageUrl, sellerName: currentSeller });
    }

    renderSellerProducts();
    document.getElementById('product-form').reset();
    document.getElementById('submit').textContent = 'Add Product';
});

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('type');
   
    const products = JSON.parse(localStorage.getItem('products') || '[]');
  
    const uniqueTypes = [...new Set(products.map(product => product.type))];
    
 
    uniqueTypes.sort();
   
    // selectElement.innerHTML = '';
   
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Types';
    selectElement.appendChild(defaultOption);
    
    // Add options for each unique type
    uniqueTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        selectElement.appendChild(option);
    });
});
// Initialize the seller's page
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderSellerProducts();
});
