$(function () {
    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tableBody = $('#user-table-body');
        tableBody.empty();

        if (users.length > 0) {
            users.forEach((user, index) => {
                const row = `
                    <tr data-index="${index}">
                        <td>#${index + 1}</td>
                        <td>${user.username}</td>
                        <td>
                            <button class="btn btn-sm btn-danger delete-user"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        } else {
            const row = `
                <tr>
                    <td colspan="3" class="text-center">No users found</td>
                </tr>
            `;
            tableBody.append(row);
        }
    }

    function displaySellers() {
        const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
        const tableBody = $('#seller-table-body');
        tableBody.empty();

        if (sellers.length > 0) {
            sellers.forEach((seller, index) => {
                const row = `
                    <tr data-index="${index}">
                        <td>#${index + 1}</td>
                        <td>${seller.username}</td>
                        <td>
                            <button class="btn btn-sm btn-danger delete-seller"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        } else {
            const row = `
                <tr>
                    <td colspan="3" class="text-center">No sellers found</td>
                </tr>
            `;
            tableBody.append(row);
        }
    }

    function loadfromrequests() {
        requestpass = JSON.parse(localStorage.getItem('requestpass'));
        const tableBody = $('#reset-requests-body');
        tableBody.empty();
        if (!requestpass) {
            return; 
        }
        if (requestpass.length > 0) {
            requestpass.forEach((request) => {
                const row = `
      <tr data-id="${request.id}">
          <td>${request.id}</td>
          <td>${request.email}</td>
          <td>${request.time}</td>
          <td>
              <button class="btn btn-primary btn-approve" data-id="${request.id}">Approve</button>
              <button class="btn btn-danger btn-reject" data-id="${request.id}">Reject</button>
          </td>
      </tr>
  `;
                tableBody.append(row);
            });
        }
        else {
            tableBody.append('<tr><td colspan="4" class="text-center">No reset requests found</td></tr>');
        }

        document.querySelectorAll(".btn-approve").forEach((button) => {
            button.addEventListener("click", function () {
                const requestId = button.getAttribute("data-id");
                handleRequestAction(requestId, "approved");
            });
        });

        document.querySelectorAll(".btn-reject").forEach((button) => {
            button.addEventListener("click", function () {
                const requestId = button.getAttribute("data-id");
                handleRequestAction(requestId, "rejected");
            });
        });
    }
    function handleRequestAction(requestId, action) {
        let requestpass = JSON.parse(localStorage.getItem("requestpass")) || [];
        const request = requestpass.find((req) => req.id == requestId);

        if (action === "approved") {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex((user) => user.email === request.email);

            if (userIndex !== -1) {
                users[userIndex].resetApproved = true; // Mark the user for password reset
                localStorage.setItem("users", JSON.stringify(users));
            }
        }

        // Remove the request from reset requests
        requestpass = requestpass.filter((req) => req.id != requestId);
        localStorage.setItem("requestpass", JSON.stringify(requestpass));

        loadfromrequests();
        alert(`Request ID ${requestId} has been ${action}.`);
    }



    $(document).on('click', '.delete-user', function () {
        const row = $(this).closest('tr');
        const index = row.data('index');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    });

    $(document).on('click', '.delete-seller', function () {
        const row = $(this).closest('tr');
        const index = row.data('index');

        const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
        sellers.splice(index, 1);
        localStorage.setItem('sellers', JSON.stringify(sellers));
        displaySellers();
    });
    $(document).ready(function () {
        // Function to load checkout orders and display in table and cards
        function loadCheckoutOrders() {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const tableBody = $('#checkout-table-body');
            const cardContainer = $('#checkout-cards');

            // Clear previous content
            tableBody.empty();
            cardContainer.empty();

            // Loop through each order
            orders.forEach((order, index) => {
                // Generate table row
                const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customerName || 'Unknown'}</td>
                <td>$${order.total || 0}</td>
                <td>${order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
                <td><mark>${order.status || 'PENDING'}</mark></td>
                <td>
                    <button class="btn btn-info" onclick="showOrderDetails(${index})">
                        View Details
                    </button>
                </td>
            </tr>
        `;
                tableBody.append(row);

                // Generate card layout for mobile
                const cardDiv = `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Order ${index + 1}</h5>
                        <p><strong>User:</strong> ${order.customerName || 'Unknown'}</p>
                        <p><strong>Total Price:</strong> $${order.total || 0}</p>
                        <p><strong>Date:</strong> ${order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Status:</strong> ${order.status || 'PENDING'}</p>
                        <button class="btn btn-info" onclick="showOrderDetails(${index})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
                cardContainer.append(cardDiv);
            });
        }

        // Function to show order details in a modal
        window.showOrderDetails = function (index) {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const order = orders[index];

            if (!order) {
                alert('Order not found.');
                return;
            }

            // Generate modal content
            const modalContent = `
        <h5>Order Details for Order #${index + 1}</h5>
        <p><strong>User:</strong> ${order.customerName || 'Unknown'}</p>
        <p><strong>Total Price:</strong> $${order.total || 0}</p>
        <p><strong>Date:</strong> ${order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Status:</strong> ${order.status || 'PENDING'}</p>
        <h6>Products:</h6>
        <ul>
            ${Array.isArray(order.items) && order.items.length > 0
                    ? order.items
                        .map((item) => {
                            const productInfo = products.find((p) => p.id === item.productId);
                            return productInfo
                                ? `<li>${productInfo.name} (Quantity: ${item.quantity}, Price: $${productInfo.price})</li>`
                                : `<li>Unknown Product (ID: ${item.productId}, Quantity: ${item.quantity})</li>`;
                        })
                        .join('')
                    : '<li>No products found in this order.</li>'}
        </ul>
    `;
            $('#modal-order-details').html(modalContent);
            const myModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
            myModal.show();
            document.querySelector('.modal-footer #updateStatusBtn').focus();
            $('#updateStatusBtn').off('click').on('click', function () {
                const newStatus = $('#orderStatus').val();
                updateOrderStatus(index, newStatus);
            });
        };

        // Function to update order status in localStorage
        function updateOrderStatus(index, newStatus) {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const order = orders[index];

            if (!order) {
                alert('Order not found. Unable to update status.');
                return;
            }

            // Update the order's status
            order.status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            loadCheckoutOrders();

            alert(`Order #${index + 1} status updated to '${newStatus}'.`);
        }

        loadCheckoutOrders();
     // Add new category and update products
document.getElementById('category-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const type = document.getElementById('type').value;
    const typeimage = document.getElementById('typeimage').value;
    
    if (!type || !typeimage) {
        alert("Please fill in all fields.");
        return;
    }
    const newCategory = {
        type: type,
        typeimage: typeimage
    };
    
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    products.forEach(product => {
        if (product.type === "Uncategorized") {  
            product.type = type;
        }
    });
    localStorage.setItem('products', JSON.stringify(products));
    document.getElementById('type').value = '';
    document.getElementById('typeimage').value = '';

    alert("Category added and products updated successfully!");

        });

    });


    displayUsers();
    displaySellers();
    loadfromrequests();
    $('#menu-toggle').on('click', function () {
        const sidebar = $('.sidebar');
        const mainContent = $('.main-content');
        sidebar.toggleClass('collapsed');
        mainContent.toggleClass('collapsed');
    });
 
});

