import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './Auth.css'; // Import CSS for styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setSuccess(false); // Reset success message

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Now send email verification using the new method in Firebase v9
      await sendEmailVerification(userCredential.user);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign Up</h1>
        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">Registration successful! Check your email for verification.</p>}
      </div>
    </div>
  );
};

export default Signup;
