document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
        alert('Login Successful');
        localStorage.setItem('token', data.token); // Store token for authentication
        window.location.href = 'dashboard.html'; // Redirect user
    } else {
        alert(data.message || 'Login Failed');
    }
});
