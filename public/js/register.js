document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5502/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                alert('Registration successful! Please log in.');
                window.location.href = "http://localhost:5502/index.html";
            } else {
                alert(data.message || 'Registration failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed! Please try again.');
        }
    });
})