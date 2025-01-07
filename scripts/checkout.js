$(function () {
  $('body').on('click', function () {
    $('#message').css({ display: 'none' });
  });

  function calculateTotal() {
    params = new URLSearchParams(location.search);
    amount = parseFloat(params.get('amount'));
    if (isNaN(amount)) {
      amount = 0;
    }
    if (amount == 0) {
      $('#checkout-btn').attr('disabled', 'true');
    }

    $('span:eq(0)').text(amount);
    $('span:eq(1)').text(amount / 10);
    $('span:eq(3)').text((amount * 1.1 + 10).toFixed(2));
  }

  calculateTotal();
  $('img').on('click', function () {
    $('img').removeClass('checked');
    $(this).addClass('checked');
  });
  $('#cvv ,#card-number').on('keydown', function (e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      e.preventDefault();
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    currentUserName = JSON.parse(localStorage.getItem('currentUser'))[
      'username'
    ];
    carts = JSON.parse(localStorage.getItem('carts') || {});
    cartProducts = carts[currentUserName];
    orders = JSON.parse(localStorage.getItem('orders') || {});
    orderDate = new Date();

    expiry = new Date($('#exp-date').val());
    currentDate = new Date();
    if ($('#card-number').val().length < 12) {
      displayMessage('Card number must be 12 digits');
    } else if (expiry > new Date('2034-12-31') || expiry == 'Invalid Date') {
      displayMessage('Please enter a valid expiration date');
    } else if (expiry < currentDate) {
      displayMessage('Card is expired, Please enter a valid card');
    } else if ($('#cvv').val().length < 3) {
      displayMessage('Card validation value must be 3 digits');
    } else {
      $('#message').css({ display: 'flex', height: '200px' });
      order = {
        user: currentUserName,
        products: cartProducts,
        amount: amount,
        date: orderDate,
      };
      orders.push(order);
      allProducts = JSON.parse(localStorage.getItem('products'));
      cartProducts.forEach((soldProduct) => {
        let stockProduct = allProducts.find((product) => 
          product.id == soldProduct['productId']
        );
        stockProduct.stock -= soldProduct['quantity'];
        localStorage.setItem('products',JSON.stringify(allProducts))
      });

      carts[currentUserName] = [];
      localStorage.setItem('carts', JSON.stringify(carts));
      localStorage.setItem('orders', JSON.stringify(orders));
      params.set('amount', 0);
      history.replaceState(null, '', '?' + params.toString());
      calculateTotal();
    }
  });
});
