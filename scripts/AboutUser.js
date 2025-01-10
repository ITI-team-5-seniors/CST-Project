$(function () {
    // Fetch current user and carts from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const cartItems = carts[currentUser.username] || [];
    const user = users.find(u => u.username === currentUser.username) || {};
    $("#customer-name").text(user.username || "No Name Provided");
    $("#customer-location").text(user.email || "No Email Provided");
    $("#customer-picture").prop("src", user.picture || "../Photos/usericon.jpg");
    const orderList = $("#order-list");
    cartItems.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        if (product) {
            const listItem = `
                <li>
                    <img src="${product.image}" alt="${product.name}" width="50">
                    <strong>${product.name}</strong><br>
                    Quantity: ${cartItem.quantity}<br>
                    Total Price: $${(product.price * cartItem.quantity).toFixed(2)}
                </li>
            `;
            orderList.append(listItem);
        }
    });
    // Logic for uploading image
    $("#image-upload").on("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#customer-picture").prop("src", e.target.result);
            };
            reader.readAsDataURL(file);
            const fileName =file.name;
            $("#image-upload-label").text(fileName);
        }
    });
    // Save the uploaded image in localStorage
    $("#save-picture").on("click", function () {
        const imageSrc = $("#customer-picture").prop("src");
        user.picture = imageSrc;
        const updatedUsers = users.map(u => u.username === user.username ? user : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Profile Picture Updated Successfully!");
        $("#image-upload").val(""); 
    });
  
    
});scripts/AboutUser.js