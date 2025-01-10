import {
  getCart,
  setCart,
  getProductById,
  removeFromCart,
} from './productLogic.js';

function calculateTotal() {
  let quantities = [];
  let prices = [];
  let total = 0;
  $('.item-quantity').each(function () {
    quantities.push(parseInt($(this).text()));
  });
  $('.item-price').each(function () {
    prices.push(parseFloat($(this).text()));
  });
  let subtotals = prices.map((price, index) => price * quantities[index]);
  $('.subtotal').empty();
  subtotals.map((total, index) => {
    let subtotal = $('<h4>').text(`subtotal ${index + 1} : ${total}$ `);
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
  return total;
}
function drawProductItem() {
  // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // if (currentUser) {
  //   let currentUserName = currentUser['username'];
  // let carts = JSON.parse(localStorage.getItem('carts') || {});
  //   cartProducts = carts[currentUserName];
  let cartProducts = getCart();
  if (cartProducts) {
    cartProducts.forEach((product) => {
      const productData = getProductById(product.productId);

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
                class="bg-primary border-0 rounded px-2"
                id="increment"
                type="button"
                value="+"
                />
                <h6 class="fw-medium m-2 item-quantity">${product['quantity']}</h6>
                <input
                class="bg-primary border-0 rounded px-2"
                id="decrement"
                type="button"
                value="-"
                />
                </div>
                <h6 class="col-2 item-price">${productData['price']}$</h6>
            <i id="carticons"
            class="delete-icon col-1 m-2 bi bi-trash3-fill pointer-event"
            ></i>
            </div>
            <hr />
            `);
      $('#product-list').append(productItem);
    });
    $(`.item #increment`).each(function () {
      $(this).on('click', function (e) {
        let id = $(this).parent().parent()[0].id;
        let product = cartProducts.find(
          (product) => product['productId'] == id
        );
        let stockProduct = getProductById(id);
        if (product['quantity'] < stockProduct['stock']) {
          product['quantity'] += 1;
          $(e.target).next().text(product['quantity']);
          calculateTotal();
          setCart(cartProducts);
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
        let id = $(this).parent().parent()[0].id;
        let product = cartProducts.find(
          (product) => product['productId'] == id
        );
        if (product['quantity'] > 0) {
          product['quantity'] -= 1;
        }
        $(e.target).prev().text(product['quantity']);
        calculateTotal();
        setCart(cartProducts);
      });
    });

    $('.item .delete-icon').on('click', function () {
      let id = $(this).parent()[0].id;
      // console.log(cartProducts);
      // console.log(id);
      // cartProducts = cartProducts.filter((product) => product['productId'] != id);
      // carts[currentUserName] = cartProducts;
      // localStorage.setItem('carts', JSON.stringify(carts));
      removeFromCart(id);
      $(this).parent().next().remove();
      $(this).parent().remove();
      calculateTotal();
    });
  } else {
    $('#info').css({ display: 'block' });
    setTimeout(function () {
      $('info').css({ display: 'none' });
    }, 2000);
  }
}

$(function () {
  drawProductItem();
  let amount = calculateTotal();
  $('#checkout-btn').on('click', function () {
    window.location.href = `checkout.html?amount=${amount}`;
  });
  $('#go-shopping').on('click', function () {
    window.location.href = `Product_Listing.html`;
  });
});
