document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;

    // Store username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Sign up successful! Please log in.');
    // Redirect to login page
    window.location.href = 'login.html';
});
