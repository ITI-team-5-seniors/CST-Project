$(function () {
  
  function calculateTotal(){
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

  calculateTotal()
  $('img').on('click', function () {
    $('img').removeClass('checked');
    $(this).addClass('checked');
  });
  $('#cvv ,#card-number').on('keydown', function (e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      e.preventDefault();
    }
  });
  function displayMessage(message) {
    $('#message').text(message);
    $('#message').css({ display: 'flex', height: '200px' });
  }

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
      displayMessage(
        '🚚 Your order is shipped! 🎉 and will arrive in just two days. Thank you for shopping with us! 😊'
      );
      order = {
        user: currentUserName,
        products: cartProducts,
        amount: amount,
        date: orderDate,
      };
      orders.push(order);
      carts[currentUserName] = [];
      localStorage.setItem('carts', JSON.stringify(carts));
      localStorage.setItem('orders', JSON.stringify(orders));
      params.set('amount',0)
      history.replaceState(null, '', '?' + params.toString());
      calculateTotal()

    }
    $('body').on('click', function () {
      $('#message').css({ display: 'none' });
    });
  });
});
