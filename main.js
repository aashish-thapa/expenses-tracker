// Update greeting with stored username every second
setInterval(() => {
    let storedUsername = localStorage.getItem('username');
    let greet = document.getElementById('greet');
    if (storedUsername) {
        greet.textContent = `Hello, ${storedUsername}!`;
    }
}, 1000);

// Add event listener to submit button
document.getElementById('submit').addEventListener('click', function() {
    let inputValue = parseFloat(document.getElementById('user-input').value);
    let selectValue = document.getElementById('select').value;
    let expensesContainer = document.querySelector('.display-expenses');
    
    // Validation: Check if input is a valid number and category is selected
    if (selectValue === "Select One") {
        alert('Please choose a category.');
        return;
    }
    if (isNaN(inputValue) || inputValue <= 0 ) {
        alert("Please enter a valid expense amount.");
        return;
    }

    // Create new expense element
    let expenseItem = document.createElement('div');
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    expenseItem.textContent = `${month}/${day}/${year} ${selectValue}: $${inputValue.toFixed(2)}`;
    expensesContainer.appendChild(expenseItem);

    // Update total expenses
    updateTotalExpenses(inputValue);

    // Save expenses to local storage
    saveExpensesToLocalStorage();

    // Clear input fields
    document.getElementById('user-input').value = '';
    document.getElementById('select').selectedIndex = 0;
});

// Add event listener to clear button
document.getElementById('clear-button').addEventListener('click', function() {
    // Display confirmation alert
    if (confirm("Are you sure you want to clear all expenses?")) {
        // Clear local storage
        localStorage.removeItem('totalExpenses');
        localStorage.removeItem('expenses');
        
        // Clear displayed expenses
        document.getElementById('total-expenses').textContent = '$0.00';
        document.querySelector('.display-expenses').innerHTML = '';

        // Notify user
        alert("All expenses cleared.");
    }
});

// Update total expenses function
function updateTotalExpenses(amount) {
    let totalExpensesElement = document.getElementById('total-expenses');
    let currentTotal = parseFloat(totalExpensesElement.textContent.replace('Total : $', ''));
    if (isNaN(currentTotal)) {
        currentTotal = 0;
    }
    let newTotal = currentTotal + amount;
    totalExpensesElement.textContent = `Total : $${newTotal.toFixed(2)}`;
    localStorage.setItem('totalExpenses', newTotal.toFixed(2));
}

// Save expenses to local storage function
function saveExpensesToLocalStorage() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let selectValue = document.getElementById('select').value;
    let inputValue = parseFloat(document.getElementById('user-input').value);
    let newExpense = `${month}/${day}/${year} ${selectValue}: $${inputValue.toFixed(2)}`;
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load total expenses and expenses list from local storage on page load
window.onload = function() {
    let totalExpenses = localStorage.getItem('totalExpenses') || '$0.00';
    document.getElementById('total-expenses').textContent = `Total : ${totalExpenses}`;

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expensesContainer = document.querySelector('.display-expenses');
    expenses.forEach(expense => {
        let expenseItem = document.createElement('div');
        expenseItem.textContent = expense;
        expensesContainer.appendChild(expenseItem);
    });
};

// Logout functionality
document.getElementById("log-out").addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "login.html";
    }
});

// Smooth scrolling to sections when clicking on tab links
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
        const href = item.getAttribute('href');
        if (href.charAt(0) === '#') {
            event.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
