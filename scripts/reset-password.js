document.addEventListener('load ', function () {
    const emailInput = $("#email");
    const newPasswordInput = $("#newPassword");
    const confirmPasswordInput = $("#confirmPassword");
    const resetButton = $("#resetButton");

    const emailError = $("#emailError");
    const newPasswordError = $("#newPasswordError");
    const confirmPasswordError = $("#confirmPasswordError");
    const passwordStrength = $("#passwordStrength");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    function validateInputs() {
        let isValid = true;
        //email validations
        emailError.hide();
        const email = emailInput.val();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some(user => user.email === email);
        if (!emailExists) {
            emailError.show();
            isValid = false;
        }

        // Validate new password
        newPasswordError.hide();
        const newPassword = newPasswordInput.val();
        if (!passwordRegex.test(newPassword)) {
            newPasswordError.show();
            isValid = false;
        }

        // Password strength indicator
        if (newPassword.length < 8) {
            passwordStrength.text("Weak").css("color", "red");
        } else if (passwordRegex.test(newPassword)) {
            passwordStrength.text("Strong").css("color", "green");
        } else {
            passwordStrength.text("Medium").css("color", "orange");
        }

        // Validate confirm password
        confirmPasswordError.hide();
        if (newPassword !== confirmPasswordInput.val()) {
            confirmPasswordError.show();
            isValid = false;
        }

        resetButton.prop("disabled", !isValid);
    }

    emailInput.on("input", validateInputs);
    newPasswordInput.on("input", validateInputs);
    confirmPasswordInput.on("input", validateInputs);

    $("#resetForm").on("submit", function (e) {
        e.preventDefault();
        const email = emailInput.val();
        const newPassword = newPasswordInput.val();

        const key = CryptoJS.SHA256(email +'s33gggggggggggdsgbltevfmdlvmflgfg').toString();
        const encryptedPassword = CryptoJS.AES.encrypt(newPassword, key).toString();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex !== -1 && users[userIndex].resetApproved) {
            users[userIndex].encryptedPassword = encryptedPassword;
            localStorage.setItem("users", JSON.stringify(users));
            users[userIndex].resetApproved = false;
            alert("Password has been reset successfully!");
            window.location.href = "login.html";
        }
    });
});