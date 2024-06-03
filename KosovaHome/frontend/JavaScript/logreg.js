const handleLogin = async (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);

   try {
      const response = await fetch('/api/auth/login', {
         method: 'POST',
         body: formData
      });

      if (!response.ok) {
         throw new Error('Login failed');
      }

      window.location.href = '/'; // Redirect to homepage upon successful login
   } catch (error) {
      console.error('Login error:', error.message);
      // Handle error (e.g., display error message to user)
   }
};

const handleRegistration = async (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);

   try {
      const response = await fetch('/api/auth/register', {
         method: 'POST',
         body: formData
      });

      if (!response.ok) {
         throw new Error('Registration failed');
      }

      window.location.href = '/login.html'; // Redirect to login page upon successful registration
   } catch (error) {
      console.error('Registration error:', error.message);
      // Handle error (e.g., display error message to user)
   }
};

document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('register-form').addEventListener('submit', handleRegistration);
