$(function(){
    $('#signupForm').on('submit', function(event) {
        event.preventDefault();

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        if (validateForm(username, email, password)) {
            addUser(username, email, password);
        } else {
            alert('Invalid input. Please try again.');
        }
    });

    function validateForm(username, email, password) {
        
        const usernameRegex = /^(([A-Z]|[a-z]){2,}(-|_)?([a-z]|[A-Z])+)+$/;
        const emailRegex = /^([a-z]|[A-Z])+([a-z]|[A-Z]|-|_|[1-9]){2,}[@]([a-z]|[A-Z])+(\.com)$/;
        const passwordMinLength = 6;

        if (!usernameRegex.test(username)) {
            alert('Username must contain at least 3 alphabets, ("_" , "-") are allowed.');
            return false;
        }
        if (!emailRegex.test(email)) {
            alert('emai is not valid');
            return false;
        }

        if (password.length < passwordMinLength) {
            alert('Password must be at least 6 characters long.');
            return false;
        }

        return true;
    }

    function addUser(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);
        const emailExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Username already exists. Please choose another one.');
        } 
        else if (email) {
            alert('email already exists. Please choose another one.');
        } 
        else {
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('User added successfully!');
        }
    }
});