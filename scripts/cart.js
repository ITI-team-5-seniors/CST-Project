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
  subtotal.append($('<hr>'));
  total = eval(subtotals.join('+'));
  $('#total').text(total + '$');
}

$(function () {
  calculateTotal();
  $('.item #increment').on('click', function (e) {
    quantity = parseInt($(e.target).next().text());
    quantity++;
    $(e.target).next().text(quantity);
    calculateTotal();
  });
  $('.item #decrement').on('click', function (e) {
    quantity = parseInt($(e.target).prev().text());
    if (quantity > 0) quantity--;
    $(e.target).prev().text(quantity);
    calculateTotal();
  });
  $('#checkout-btn').on('click', function () {
    window.location.href = `checkout.html?amount=${total}`;
  });
});
