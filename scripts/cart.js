function calculateTotal() {
  let quantities = [];
  let prices = [];
  $('.item-quantity').each(function () {
    quantities.push(parseInt($(this).text()));
  });
  $('.item-price').each(function () {
    prices.push(parseFloat($(this).text()));
  });
  subtotals = prices.map((price, index) => price * quantities[index]);
  $('.subtotal').empty();
  subtotals.map((total, index) => {
    subtotal = $('<h4>').text(`subtotal ${index + 1} : ${total}$ `);
    subtotal.appendTo($('.subtotal'));
  });
  $('.subtotal').append($('<hr>'));
  if (subtotals.length > 0) {
    total = eval(subtotals.join('+'));
  } else total = 0;

  $('#total').text(total + '$');

  if (total == 0) {
    $('#checkout-btn').attr('disabled', 'true');
  }
}
function drawProductItem() {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    currentUserName = currentUser['username'];
    carts = JSON.parse(localStorage.getItem('carts') || {});
    cartProducts = carts[currentUserName];

    cartProducts.forEach((product) => {
      allProducts = JSON.parse(localStorage.getItem('products'));
      const productData = allProducts.find(
        (item) => item.id === product.productId
      );

      const productItem = $(`
          <div
            class="item p-3 d-flex justify-content-center align-items-center"
            id="${productData['id']}"
          >
            <img
              class="col-3 border border-black p-sm-2 rounded-3 m-2"
              src="${productData['image']}"
              alt=""
            />
              <h6 class="item-name col-3 mx-2">${productData['name']}</h6>
            <div class="controls col-3 d-sm-flex justify-content-center">
              <input
                class="bg-info border-0 rounded"
                id="increment"
                type="button"
                value="+"
                />
                <h6 class="fw-medium m-2 item-quantity">${product['quantity']}</h6>
                <input
                class="bg-info border-0 rounded px-2"
                id="decrement"
                type="button"
                value="-"
                />
                </div>
                <h6 class="col-2 item-price">${productData['price']}$</h6>
            <i
            class="delete-icon col-1 m-2 bi bi-trash3-fill pointer-event"
            ></i>
            </div>
            <hr />
            `);
      $('#product-list').append(productItem);
    });
  } else alert('please login to use the cart');
}
$(function () {
  drawProductItem();
  calculateTotal();

  $(`.item #increment`).each(function () {
    $(this).on('click', function (e) {
      id = $(this).parent().parent()[0].id;
      let product = cartProducts.find((product) => product['productId'] == id);

      let allProducts = JSON.parse(localStorage.getItem('products'));
      let stockProduct = allProducts.find((product) => product.id == id);

      if (product['quantity'] < stockProduct.stock) {
        product['quantity'] += 1;
        localStorage.setItem('carts', JSON.stringify(carts));
        $(e.target).next().text(product['quantity']);
        calculateTotal();
      } else {
        $('#danger').css({ display: 'block' });
        setTimeout(function () {
          $('#danger').css({ display: 'none' });
        }, 2000);
      }
    });
  });

  $(`.item #decrement`).each(function () {
    $(this).on('click', function (e) {
      id = $(this).parent().parent()[0].id;
      let product = cartProducts.find((product) => product['productId'] == id);
      if (product['quantity'] > 0) {
        product['quantity'] -= 1;
      }
      localStorage.setItem('carts', JSON.stringify(carts));
      $(e.target).prev().text(product['quantity']);
      calculateTotal();
    });
  });

  $('.item .delete-icon').on('click', function () {
    id = $(this).parent()[0].id;
    console.log(cartProducts);
    console.log(id);
    cartProducts = cartProducts.filter((product) => product['productId'] != id);
    carts[currentUserName] = cartProducts;
    localStorage.setItem('carts', JSON.stringify(carts));

    $(this).parent().next().remove();
    $(this).parent().remove();
    calculateTotal();
  });

  $('#checkout-btn').on('click', function () {
    window.location.href = `checkout.html?amount=${total}`;
  });
  $('#go-shopping').on('click', function () {
    window.location.href = `Product_Listing.html`;
  });
});
