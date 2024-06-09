document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('http://localhost:5004/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful!');
            // Store the token and redirect to home page
            localStorage.setItem('token', data.token);
            window.location.href = 'home.html'; // Change this to your home page URL
        } else {
            const errorData = await response.json();
            alert('Login failed: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
