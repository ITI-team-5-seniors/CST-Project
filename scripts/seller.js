// script/seller.js
import { initializeData, getProducts, addProduct, updateProduct, deleteProduct } from './utils.js';

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
            top:0
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
    // viewOrderDetails();
});


// function getOrdersFromLocalStorage() {
//     let orders = JSON.parse(localStorage.getItem('orders')) || [];
//     return orders;
//   }
  

function displayOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    let tableBody = document.getElementById('orders-table-body');
    // tableBody.innerHTML = ''; // مسح محتويات الجدول قبل إضافة البيانات الجديدة
  
    orders.forEach(order => {
      let orderRow = document.createElement('tr');
  
      // إضافة بيانات الأوردر
      orderRow.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customerName}</td>
        <td>${order.products.map(product => product.name).join(', ')}</td>
        <td>${order.totalPrice}</td>
        <td>${new Date(order.orderDate).toLocaleDateString()}</td>
        <td>${order.status}</td>
        <td><button onclick="viewOrderDetails(${order.orderId})">View</button></td>
      `;
  
      tableBody.appendChild(orderRow);
    });
  }
  
//   function viewOrderDetails(orderId) {
//     // عرض تفاصيل الأوردر عند النقر على زر "View"
//     let orders = JSON.parse(localStorage.getItem('orders')) || [];
//     let order = orders.find(order => order.orderId === orderId);
//     alert(`Order Details:\nCustomer: ${order.customerName}\nProducts: ${order.products.map(p => p.name).join(', ')}`);
//   }
  
















const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Laptops', 'Mobiles', 'PC Components', 'Laptop Accessories', 'Mobile Accessories', 'Consoles', 'TVs'],
        datasets: [{
            label: 'المبيعات',
            data: [0, 0, 0, 70, 110, 40, 30],
            backgroundColor: '#800080',
            borderColor: '#800080',
            borderWidth: 1
        }]
    },
    options: {
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
    }
});  
console.log(localStorage.getItem('orders'));
