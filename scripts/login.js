function displayMessage(message) {
  $('#message').text(message);
  $('#message').css({ display: 'block' });
}
$(function () {
  $('#login-form').on('submit', function (event) {
    event.preventDefault();

    const email = $('#login-email').val();
    const password = $('#login-password').val();

    $('#message').on('click', function () {
      $(this).css({ display: 'none' });
    });

    authenticateUser(email, password);
  });

  function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));

    users.some((user) => {
      if (user.email == email && user.password == password) {
        window.location = 'finalheader.html';
        return true;
      } else {
        displayMessage('incorrect email or password');
        return false;
      }
    });
  }
});
