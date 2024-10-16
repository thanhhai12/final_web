document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Example: Validate email and password (you can change these values)
    if (email === 'thanhhaitutitu@gmail.com' && password === 'password') {
        alert('Login successful');
        // Redirect to index.html after successful login
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});
