// script/seller.js
import {getorders , initializeData, getProducts, addProduct, updateProduct, deleteProduct } from './utils.js';

const renderProducts = () => {
    const products = getProducts();
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.type}</td>
            <td><img src="${product.image}" width="50" height="50"></td>
            <td>
                <button class="delete-btn" data-id="${product.id}">Delete</button>
                <button class="update-btn" data-id="${product.id}">Update</button>
            </td> 
        </tr>
    `).join('');


    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteProductHandler(id);
        });
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            updateProductHandler(id);
        });
    });
};


const deleteProductHandler = (id) => {
    deleteProduct(id);
    console.log('Product Deleted, New Product List:',products);
    console.log('Product Deleted, New Product List:',  (id));
    renderProducts();  

};


const updateProductHandler = (id) => {
    const product = getProducts().find(product => product.id === id);
    if (product) {
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;
        document.getElementById('type').value = product.type;
        document.getElementById('image').dataset.editId = id;
        document.getElementById('submit').textContent = 'Update Product';
     
        scroll({
            top:1000
        })
 
        
    }
};


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
        addProduct({ name, price, stock, type, image: imageUrl });
    }

    renderProducts(); 
    document.getElementById('product-form').reset(); 
    document.getElementById('submit').textContent = 'Add Product'; 
});

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderProducts();
    displayOrders() ;
    getOrdersFromLocalStorage()
    getorders();
   
});


function getOrdersFromLocalStorage() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders;
  }


  function displayOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    let tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        order.products.forEach(product => {
            let orderRow = document.createElement('tr');
            let productDetails = products.find(p => p.id === product.productId);
            
            orderRow.innerHTML = `
                <td>${order.user}</td>
                <td>${new Date(order.date).toLocaleDateString()}</td>
                <td>${productDetails.id}</td>
                <td>${productDetails.name}</td>
                <td>${productDetails.price}$</td>
                <td><img src="${productDetails.image}" width="50" height="50"></td>
                <td>${product.quantity}</td>
                <td>pending</td>
            `;
            
            tableBody.appendChild(orderRow);
        });
    });
}























//chart
const ctx = document.getElementById('myChart');

// الحصول على الـ orders و الـ products
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// حساب عدد المبيعات لكل منتج
  const productSales = products.map(product => {
    const totalSales = orders.reduce((acc, order) => {
        order.products.forEach(orderProduct => {
            if (orderProduct.productId === product.id) {
                acc += orderProduct.quantity;
            }
        });
        return acc;
    }, 0);
    
    return {
        name: product.name,
        price: product.price,
        sales: totalSales
    };
});

// إعداد البيانات للـ chart
const chartData = {
    labels: productSales.map(product => `${product.name} - $${product.price}`),  // أسماء المنتجات مع أسعارها
    datasets: [{
        label: 'Sales Analysis',
        data: productSales.map(product => product.sales),  // عدد المبيعات
        backgroundColor: '#800080',
        borderColor: '#800080',
        borderWidth: 1
    }]
};

// إعداد الخيارات للـ chart
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: '#444'
            },
            ticks: {
                color: 'white'
            }
        },
        x: {
            grid: {
                color: '#444'
            },
            ticks: {
                color: 'white'
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: 'white'
            }
        }
    }
};

// إنشاء الـ chart
new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions
});

// const arr=JSON.parse(localStorage.getItem('products'));
// console.log(arr);

// const orders=JSON.parse(localStorage.getItem('orders'));
// console.log(orders);
// orders.forEach(order => {
//     console.log('Order Details:', order);
//     console.log('User:', order.user);
//     console.log('Products:', order.products);
//     console.log('Amount:', order.amount);
//     console.log('Date:', order.date);


//     if (Array.isArray(order.products)) {
//         order.products.forEach(product => {
//             console.log('Product ID:', product.productId);
//             console.log('Quantity:', product.quantity);
//         });
//     } else {
//         console.log('No products available for this order.');
//     }

// });



 
