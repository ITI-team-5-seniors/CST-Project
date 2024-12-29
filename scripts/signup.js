function displayMessage(message) {
    $('#message').text(message);
    $('#message').css({ display: 'block' });
  }
  $(function () {
    $('#signup-form').on('submit', function (event) {
      event.preventDefault();

      const username = $('#username').val();
      const email = $('#email').val();
      const password = $('#password').val();
      const role = $('#role').val();

      $('#message').on('click', function () {
        $(this).css({ display: 'none' });
      });

      if (validateForm(username, email, password, role)) {
        addUser(username, email, password, role);
      }
    });

    function validateForm(username, email, password, role) {
      const usernameRegex = /^(([A-Z]|[a-z]){2,}(-|_)?([a-z]|[A-Z])+)+$/;
      const emailRegex =
        /^([a-z]|[A-Z])+([a-z]|[A-Z]|-|_|[1-9]){2,}[@]([a-z]|[A-Z])+(\.com)$/;
      const passwordMinLength = 6;

      if (!usernameRegex.test(username)) {
        displayMessage(
          'Username must contain at least 3 alphabets, ("_" , "-") are allowed.'
        );
        return false;
      }
      if (!emailRegex.test(email)) {
        displayMessage('emai is not valid');
        return false;
      }

      if (password.length < passwordMinLength) {
        displayMessage('Password must be at least 6 characters long.');
        return false;
      }
      return true;
    }

    function addUser(username, email, password ,role) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((user) => user.username === username);
      const emailExists = users.some((user) => user.email === email);

      if (userExists) {
        displayMessage(
          'Username already exists. Please choose another one.'
        );
      } else if (emailExists) {
        displayMessage('email already exists. Please choose another one.');
      } else {
        const newUser = { username, email, password, role };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        displayMessage('User added successfully!');
      }
    }
  });
