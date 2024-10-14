import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful! Check your email for verification.</p>}
    </div>
  );
};

export default Signup;
