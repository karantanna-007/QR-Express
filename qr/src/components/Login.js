// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setSuccess(false); // Reset success message

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login successful!</p>}
      <p>
        Don't have an account?{' '}
        <span 
          style={{ color: 'blue', cursor: 'pointer' }} 
          onClick={() => navigate('/signup')} // Navigate to signup page
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
