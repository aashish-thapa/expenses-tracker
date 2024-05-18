let success= document.getElementById("display");
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    // Validate credentials
    let storedUsername = localStorage.getItem('username');
    let storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        display.style.visibility = "visible";
        // Redirect to expenses tracker or any other page
        setInterval(() => {
            window.location.href = 'index.html';
        },1500);
       
    } else {
        display.style.visibility="visible";
        display.style.color = "red";
        display.textContent = "Incorrect Username or Password"
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    }
});
