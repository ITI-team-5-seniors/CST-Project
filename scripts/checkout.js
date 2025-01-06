$(function () {
  params = new URLSearchParams(location.search);
  amount = parseFloat(params.get('amount'));
  if(isNaN(amount))amount=0
  $('span:eq(0)').text(amount);
  $('span:eq(1)').text(amount/10);
  $('span:eq(3)').text((amount*1.1+10).toFixed(2));

  $('img').on('click', function () {
    $('img').removeClass('checked');
    $(this).addClass('checked');
  });
  $('#cvv ,#card-number').on('keydown', function (e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      e.preventDefault();
    }
  });
  function displayMessage(message){
    $('#message').text(message);
    // let height = $('#message').next().outerHeight()
    $('#message').css({ display: 'flex', height:'200px' });
  }

  $('form').on('submit', function (e) {
    e.preventDefault();
    if(amount=0)displayMessage('please check your cart before checkout')
    expiry = new Date($('#exp-date').val());
    currentDate = new Date();
    if ($('#card-number').val().length<12){
        displayMessage('Card number must be 12 digits')
    }else if(expiry < currentDate) {
        displayMessage('Card is expired, Please enter a valid card')
    }
    else if($('#cvv').val().length<3){
        displayMessage('Card validation value must be 3 digits')
    }
    else{
        displayMessage("🚚 Your order is shipped! 🎉 and will arrive in just two days. Thank you for shopping with us! 😊")
    }
    $('body').on('click', function () {
      $('#message').css({ display: 'none' });
    });
  });
});
