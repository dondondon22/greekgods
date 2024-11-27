const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const registerAccountForm = document.getElementById('registerAccount');
const registerInfoForm = document.getElementById('registerInfo');

// Function to display error messages
function displayErrorMessage(inputId, message) {
    const errorMessageContainer = document.querySelector('.error-message-container');

    // Create a new error message element
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    // Append error message to the container
    errorMessageContainer.appendChild(errorMessage);
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const commonPasswords = ["123456", "password", "12345678", "qwerty", "abc123", "111111", "123123"];
    
    if (password.length < minLength) return "*Password must be at least 8 characters long.";
    if (!hasUppercase.test(password)) return "*Password must contain at least one uppercase letter.";
    if (!hasLowercase.test(password)) return "*Password must contain at least one lowercase letter.";
    if (!hasDigit.test(password)) return "*Password must contain at least one digit.";
    if (!hasSpecialChar.test(password)) return "*Password must contain at least one special character.";
    if (commonPasswords.includes(password.toLowerCase())) return "*Password is too common. Please choose a stronger password.";
    
    return "Password is valid.";
}

// Password match validation
function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) return "*Passwords do not match.";
    return "Passwords match.";
}

function convertMetric() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight)) {
        return null;
    }

    const heightMetric = document.getElementById('heightMetric').value;
    const weightMetric = document.getElementById('weightMetric').value;

    let finalHeight;
    let finalWeight;

    if (heightMetric === "cm") {
        finalHeight = height / 100;
    } else if (heightMetric === "m") { 
        finalHeight = height;
    } else if (heightMetric === "in") {
        finalHeight = height * 0.0254;
    } else if (heightMetric === "ft") {
        finalHeight = height * 0.3048;
    } else {
        finalHeight = height;
    }

    if (weightMetric === "kg") {
        finalWeight = weight;
    } else if (weightMetric === "lb") {
        finalWeight = weight * 0.453592;
    } else {
        finalWeight = weight;
    }

    return { finalHeight, finalWeight };
}

// Form validation
function validateForm() {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    const passwordValidationMessage = validatePassword(password.value);
    if (passwordValidationMessage !== "Password is valid.") {
        displayErrorMessage('password', passwordValidationMessage);
        isValid = false;
    }

    const passwordMatchMessage = validatePasswordMatch(password.value, confirmPassword.value);
    if (passwordMatchMessage !== "Passwords match.") {
        displayErrorMessage('confirm-password', passwordMatchMessage);
        isValid = false;
    }

    return isValid;
}

// Register button click handler to navigate to registerInfo form
document.querySelector('#registerButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button behavior

    if (!validateForm()) {
        return; // If validation fails, stop here
    }

    // Hide registerAccount form and show registerInfo form
    registerAccountForm.style.display = 'none';
    registerInfoForm.style.display = 'block';
});

// RegisterInfo form submit handler
document.querySelector('#startJourneyNow').addEventListener('click', function(event) {
    
    event.preventDefault(); // Prevent form submission initially
    const conversion = convertMetric();
    if (conversion) {
        const { finalHeight, finalWeight } = conversion;

        // Update the height and weight fields with converted values
        document.getElementById('height').value = finalHeight.toFixed(5); // Set height in meters
        document.getElementById('weight').value = finalWeight.toFixed(2); // Set weight in kilograms

        // Allow form submission
        document.getElementById('registrationForm').submit();
    } else {
        alert("Invalid height or weight. Please check your input.");
    }
});