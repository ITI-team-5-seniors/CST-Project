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
function drawProductItem() {
  currentUserName = JSON.parse(localStorage.getItem('currentUser'))['username'];
  carts = JSON.parse(localStorage.getItem('carts') || {});
  console.log(carts)
  console.log(currentUserName)
  
  cartProducts = carts[currentUserName];
  console.log(cartProducts)
  cartProducts.forEach((product) => {
    allProducts = JSON.parse(localStorage.getItem('products'));
    const productData = allProducts.find(item => item.id === product.productId);

    // const productData = allProducts[product['productId'] - 1];
    console.log(productData);
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
}
$(function () {
    drawProductItem();
    
    $(`.item #increment`).each(function(){
      $(this).on('click', function (e) {

        id = $(this).parent().parent()[0].id
        console.log(cartProducts)
        let product = cartProducts.find(product => product['productId'] == id)

        product['quantity'] += 1
        localStorage.setItem('carts',JSON.stringify(carts))
        console.log(product['quantity'])
        $(e.target).next().text(product['quantity']);
        calculateTotal();
    })
    });
    $(`.item #decrement`).each(function(){
      $(this).on('click', function (e) {

        id = $(this).parent().parent()[0].id
        console.log(cartProducts)
        let product = cartProducts.find(product => product['productId'] == id)
        if (product['quantity'] > 0){
          product['quantity'] -= 1
        }
        localStorage.setItem('carts',JSON.stringify(carts))
        console.log(product['quantity'])
        $(e.target).prev().text(product['quantity']);
        calculateTotal();
    })
    });
    
    // $('.item #decrement').on('click', function (e) {
    //   quantity = parseInt($(e.target).prev().text());
    //   if (quantity > 0) quantity--;
    //   $(e.target).prev().text(quantity);
    //   calculateTotal();
    // });

  calculateTotal();
  $('.item .delete-icon').on('click', function () {
    $(this).parent().remove();
  });
  $('#checkout-btn').on('click', function () {
    window.location.href = `checkout.html?amount=${total}`;
  });
  $('#go-shopping').on('click', function () {
    window.location.href = `Product_Listing.html`;
  });
});

// get product data
// params = new URLSearchParams(location.search);
// productName = params.get('name');

// productImage = params.get('image');
// productPrice = params.get('price');
// //draw item image,name
// let = item = $('<div>').addClass(
//   'item p-3 d-flex justify-content-center align-items-center'
// );
// let = image = $('<img>').addClass(
//   'col-3 border border-black p-sm-2 rounded-3 m-2'
// );
// image.attr('src', productImage);
// let name = $('<h6>').text(productName);
// name.addClass('col-3 mx-2');
// //draw item controls
// let controls = $('<div>').addClass(
//   'controls col-3 d-sm-flex justify-content-center'
// );
// let increment = $('<input>').addClass('bg-info border-0 rounded');
// increment.attr('id', 'increment');
// increment.attr('type', 'button');
// increment.attr('value', '+');
// let quantity = $('<h6>').text('1');
// quantity.addClass('item-quantity fw-medium m-2');
// let decrement = $('<input>').addClass('bg-info border-0 rounded');
// decrement.attr('id', 'decrement');
// decrement.attr('type', 'button');
// decrement.attr('value', '-');
// controls.append(increment, quantity, decrement);
// //draw item price and delete button
// price = $('<h6>').text(`${productPrice}$`);
// price.addClass('col-2 item-price');
// delIcon = $('<i>').addClass(
//   'delete-icon col-1 m-2 bi bi-trash3-fill pointer-event'
// );
// //append element
// item.append(image);
// item.append(name);
// item.append(controls);
// item.append(price);
// item.append(delIcon);
// $('#product-list').append(item);
// localStorage.setItem('elements', $('#product-list').html());
