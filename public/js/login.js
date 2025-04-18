
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('http://localhost:5501/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('username', username);
                window.location.href = 'joke.html';
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            alert('An error occurred during login');
            console.error('Error:', error);
        }
    });
});