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
        localStorage.setItem('currentUser', JSON.stringify(user));
        userRole = user.role
        if (userRole === 'admin') {
          window.location = 'admin.html';
          // Show admin-specific content
        } else if (userRole === 'seller') {
          window.location = 'seller.html';
          // Show seller-specific content
        } else 
          window.location = 'customer.html';
          // Show customer-specific content
        return true;
      } else {
        displayMessage('incorrect email or password');
        return false;
      }
    });
  }
});
