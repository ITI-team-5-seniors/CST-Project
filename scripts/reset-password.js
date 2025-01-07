$(function() {
    document.getElementById('resetform').addEventListener('submit', function(e) {
        e.preventDefault();
  

        const newpass = document.getElementById('newpass').value;
        const confpass = document.getElementById('conpass').value;
        const newpasserror = document.getElementById('newpassError');
        const conpasserror = document.getElementById('conpassError');
        newpasserror.textContent = '';
        conpasserror.textContent = '';
        document.getElementById('conpass').disabled = true;

        // Regular expression for password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        let isValid = true;

        // Validate password
        if (!newpass) {
            newpasserror.textContent = 'Please enter a new password.';
            newpasserror.style.display = 'block';
            isValid = false;
        } else if (!passwordRegex.test(newpass)) {
            newpasserror.textContent = 'Password must be at least 8 characters, include a mix of upper and lower case letters, numbers, and special characters.';
            // newpasserror.style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('conpass').disabled = false;
        }

        // Check password confirmation
        if (newpass !== confpass) {
            conpasserror.textContent = 'Passwords do not match.';
            // conpasserror.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            if (currentUser) {
                const key = CryptoJS.SHA256(currentUser.email + 's33gggggggggggdsgbltevfmdlvmflgfg').toString();
                const users = JSON.parse(localStorage.getItem('users')) || [];
                console.log('Before password update:', users); 
                const userIndex = users.findIndex(user => user.email === currentUser.email);
                const encryptedNewPassword = CryptoJS.AES.encrypt(newpass, key).toString();

                if (userIndex !== -1) {
                    // Update the password
                    users[userIndex].encryptedPassword = encryptedNewPassword;
                    users[userIndex].resetApproved=false ;   // after reset password resetApproved reset to default value
                    console.log("Updated Users:", users);  // Log updated users here

                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Password successfully reset!');
                    window.location = 'login.html'; // Redirect to login page after reset
                } else {
                    alert('User not found in the system.');
                }
            } else {
                alert('No user is currently logged in.');       
                document.getElementById('resetform').reset(); // Reset the form

            }
        }
    });
});
