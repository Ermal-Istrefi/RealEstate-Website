document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('http://localhost:5004/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Registration successful!');
            // Store the token and redirect to login page
            localStorage.setItem('token', data.token);
            window.location.href = 'login.html'; // Change this to your login page URL
        } else {
            const errorData = await response.json();
            alert('Registration failed: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
