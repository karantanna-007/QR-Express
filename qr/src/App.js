import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig'; // Import Firebase Auth
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Signup from './components/Signup';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  // Clear user state on app load to force login every time
  useEffect(() => {
    auth.signOut(); // This will force the user to log in every time the app loads
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state if authenticated
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>QR EXPRESS</h1>
        <Routes>
          <Route path="/" element={user ? <FileUpload user={user} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {user && (
          <button onClick={() => auth.signOut()}>Logout</button>
        )}
      </div>
    </Router>
  );
};

export default App;
