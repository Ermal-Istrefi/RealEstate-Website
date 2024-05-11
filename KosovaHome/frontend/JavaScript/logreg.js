// Function to handle user registration
async function registerUser(userData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      alert('Registration successful');
      // Redirect the user to the login page or another page if needed
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed');
    }
  }
  
  // Function to handle user login
  async function loginUser(loginData) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      alert('Login successful');
      // Redirect the user to the dashboard or another page if needed
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed');
    }
  }
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const userData = {
      fullName,
      email,
      password
    };
  
    registerUser(userData);
  });
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const loginData = {
      email,
      password
    };
  
    loginUser(loginData);
  });
  