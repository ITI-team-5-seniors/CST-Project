function displayMessage(message) {
  $('#message').text(message);
  $('#message').css({ display: 'block' });
}

$(function () {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  $('#login-form').on('submit', function (event) {
    event.preventDefault();

    const email = $('#login-email').val();
    const password = $('#login-password').val();

    if (email === adminEmail && password === adminPassword) {
      window.location.href = 'admindashboard.html';
    } else {
      authenticateUser(email, password);
    }

    $('body').on('click', function () {
      $('#message').css({ display: 'none' });
    });

    $('#login-email').val('');
    $('#login-password').val('');
  });

  function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.resetApproved) {
        // Redirect to the reset password page if resetApproved is true
        alert('Password reset required. Redirecting to reset page...');
        localStorage.setItem('currentResetUser', JSON.stringify(user));
        window.location.href = 'reset-password.html';
        return;
      }

      const bytes = CryptoJS.AES.decrypt(user.encryptedPassword, key);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        const userRole = user.role;

        if (userRole === 'admin') {
          window.location = 'admindashboard.html';
        } else if (userRole === 'seller') {
          window.location = 'seller.html';
        } else {
          window.location = 'customer.html';
        }
        return;
      }
    }

    displayMessage('Incorrect email or password.');
    setTimeout(() => {
      let reset = confirm('Do you want to reset your password?');
      if (reset) {
        sendResetRequestToAdmin(email);
      }
    }, 500);
  }

  function sendResetRequestToAdmin(email) {
    const requestpass = JSON.parse(localStorage.getItem('requestpass')) || [];
    const requestId = requestpass.length + 1;
    const requestTime = new Date().toLocaleString();
    const newRequest = { id: requestId, email: email, time: requestTime };

    requestpass.push(newRequest);
    localStorage.setItem('requestpass', JSON.stringify(requestpass));

    alert('Reset password request sent to admin.');
  }
});
