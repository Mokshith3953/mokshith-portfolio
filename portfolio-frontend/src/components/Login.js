import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = 'http://localhost:5000/api/auth/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send username and password to the backend
      const res = await axios.post(LOGIN_URL, { username, password });

      // If login is successful, backend sends back a token
      const token = res.data.token;

      // Store the token in the browser's local storage
      localStorage.setItem('token', token);

      // Redirect to the admin page
      navigate('/admin');
    } catch (err) {
      console.error('Login failed', err);
      alert('Login Failed: Invalid Credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;