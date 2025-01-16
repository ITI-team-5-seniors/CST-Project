function displayMessage(message) {
  $('#message').text(message);
  $('#message').css({ display: 'block' });
}

$(function () {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  const POLLING_INTERVAL = 2000; // Refresh every 2 seconds for approval from admin to solve the lag between user and admin page

  // Polling for reset approval from admin
  function startPollingForResetapproval(email) {
    const pollingInterval = setInterval(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.email === email);

        if (user && user.resetApproved) {
            clearInterval(pollingInterval);  // Stop polling once approved
            alert('Password reset required. Redirecting...');
            localStorage.setItem('currentResetUser', JSON.stringify(user));
            window.location.href = 'reset-password.html';  // Redirect to reset page
        }
    }, POLLING_INTERVAL);  
}


  $('#login-form').on('submit', function (event) {
    event.preventDefault();

    const email = $('#login-email').val().trim(); // Trim spaces
    const password = $('#login-password').val().trim(); // Trim spaces

    if (email === adminEmail && password === adminPassword) {
      window.location.href = 'admindashboard.html';
    } else {
      authenticateUser(email, password);
    }

    $('#login-email').val(''); // Reset input after authentication attempt
    $('#login-password').val(''); // Reset input after authentication attempt
  });

  function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const sellers = JSON.parse(localStorage.getItem('sellers')) || []; // Added to check sellers

    // Check for regular users first
    const userFound = users.some((user) => {
      const key = CryptoJS.SHA256(email + 's33gggggggggggdsgbltevfmdlvmflgfg').toString();
      const bytes = CryptoJS.AES.decrypt(user.encryptedPassword, key);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      if (user.email.toLowerCase() === email.toLowerCase() && decryptedPassword === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        const userRole = user.role;
  
        if (userRole === 'admin') {
          window.location = 'admindashboard.html';
        } else if (userRole === 'seller') {
          window.location = 'seller.html';  // Redirect to seller page
        } else if (userRole=='customer'){

          window.location = 'home.html';  // Redirect to home page for regular users
        }
        return true;
      }
      return false;
    });
  
    // Check for sellers
    if (!userFound) {
      const sellerFound = sellers.some((seller) => {
        const key = CryptoJS.SHA256(email + 's33gggggggggggdsgbltevfmdlvmflgfg').toString();
        const bytes = CryptoJS.AES.decrypt(seller.encryptedPassword, key);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  
        if (seller.email.toLowerCase() === email.toLowerCase() && decryptedPassword === password) {
          localStorage.setItem('currentUser', JSON.stringify(seller));
          window.location = 'seller.html';  // Redirect to seller page
          return true;
        }
        return false;
      });
  
      if (!sellerFound) {
        displayMessage('Incorrect email or password.');
        setTimeout(() => {
          let reset = confirm('Do you want to reset your password?');
          if (reset) {
            if (emailExists(email)) {
              sentRestRequesttoadmin(email);
            } else {
              alert("Email does not exist in the system.");
            }
          }
        }, 500);
      }
    }
  }
  

  function emailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  function sentRestRequesttoadmin(email) {
    const requestpass = JSON.parse(localStorage.getItem('requestpass')) || [];
    const existingRequest = requestpass.find(request => request.email === email);

    if (existingRequest) {
      alert('You already have a pending reset request.');
      return;
    }

    const requestId = requestpass.length + 1;
    const requestTime = new Date().toLocaleString();
    const newRequest = { id: requestId, email: email, time: requestTime };

    requestpass.push(newRequest);
    localStorage.setItem('requestpass', JSON.stringify(requestpass));

    alert('Reset password request has been sent to admin.');
    startPollingForResetapproval(email); // Start polling for reset approval
  }
});
