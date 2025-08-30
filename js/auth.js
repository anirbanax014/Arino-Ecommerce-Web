// Authentication functionality
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Function to update auth UI
function updateAuthUI() {
    const authText = document.getElementById('authText');
    const authLink = document.querySelector('.auth-link');
    
    if (authText && authLink) {
        if (currentUser) {
            authText.textContent = 'Logout';
            authLink.setAttribute('href', '#');
        } else {
            authText.textContent = 'Login';
            authLink.setAttribute('href', 'login.html');
        }
    }
}

// Function to handle login
function handleLogin(email, password) {
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
        currentUser = {
            id: 1,
            name: 'John Doe',
            email: email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        window.location.href = '../index.html';
        return true;
    }
    return false;
}

// Function to handle signup
function handleSignup(name, email, password, confirmPassword) {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields');
        return false;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match');
        return false;
    }
    
    // Mock signup - in real app, this would be an API call
    currentUser = {
        id: 1,
        name: name,
        email: email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    window.location.href = '../index.html';
    return true;
}

// Function to handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.reload();
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (handleLogin(email, password)) {
                showToast('Login successful!');
            } else {
                showToast('Invalid email or password!');
            }
        });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            handleSignup(name, email, password, confirmPassword);
        });
    }
    
    // Handle logout
    const authLink = document.querySelector('.auth-link');
    if (authLink) {
        authLink.addEventListener('click', function(e) {
            if (currentUser) {
                e.preventDefault();
                handleLogout();
            }
        });
    }
    
    // Toggle password visibility
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
});

// Function to show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}