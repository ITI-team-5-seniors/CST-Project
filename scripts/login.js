function displayMessage(message) {
  $('#message').text(message);
  $('#message').css({ display: 'block' });
}
$(function () {
  const adminEmail ='admin@example.com';
  const adminPassword = 'admin123';
  $('#login-form').on('submit', function (event) {
    event.preventDefault();

    const email = $('#login-email').val();
    const password = $('#login-password').val(); 
    if (email==adminEmail&&password==adminPassword)
    {
      window.location.href='admindashboard.html';
    }
    else{
      displayMessage('Incorrect Email or Passward.');
    }

    $('body').on('click', function () {
      $('#message').css({ display: 'none' });
    });

    authenticateUser(email, password);
  ('#login-email').val('');
  ('#login-password').val('');
  });

  function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));

    users.some((user) => {

      const bytes = CryptoJS.AES.decrypt(user.encryptedPassword, key);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (user.email == email && decryptedPassword == password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
       const userRole = user.role;
        if (userRole === 'admin') {
          window.location = 'admindashboard.html';
          // Show admin-specific content
        } else if (userRole === 'seller') {
          window.location = 'seller.html';
          // Show seller-specific content
        } else window.location = 'customer.html';
        // Show customer-specific content
        return true;
      } else {
        displayMessage('incorrect email or password');
        return false;
      }
    });
  }
});
