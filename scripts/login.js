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

<<<<<<< HEAD
    $('#login-email').val('');
    $('#login-password').val('');
=======
    authenticateUser(email, password);
  $('#login-email').val('');
  $('#login-password').val('');
>>>>>>> 01fa6790a6529beb20353569c957f7cc2db71e28
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
<<<<<<< HEAD
        } else {
          window.location = 'customer.html';
=======
          // Show seller-specific content
        } else window.location = 'Product_Listing.html';
        // Show customer-specific content
        return true;

      } 
      return false;
    });
    if (!userFound)
    {
      displayMessage('incorrect email or password ');
      setTimeout(()=>{
        let reset = confirm("Do you want to Rest password?");
        if(reset)
        {
          sentRestRequesttoadmin(email);
>>>>>>> 01fa6790a6529beb20353569c957f7cc2db71e28
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
<<<<<<< HEAD

  function sendResetRequestToAdmin(email) {
    const requestpass = JSON.parse(localStorage.getItem('requestpass')) || [];
=======
  function sentRestRequesttoadmin(email){
    const requestpass= JSON.parse(localStorage.getItem('requestpass')) || [];
>>>>>>> 01fa6790a6529beb20353569c957f7cc2db71e28
    const requestId = requestpass.length + 1;
    const requestTime = new Date().toLocaleString();
    const newRequest = { id: requestId, email: email, time: requestTime };

    requestpass.push(newRequest);
    localStorage.setItem('requestpass', JSON.stringify(requestpass));

    alert('Reset password request sent to admin.');
  }
});
