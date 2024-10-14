// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig'; // Import Firebase Auth
import useAuth from './hooks/useAuth'; // Import your custom hook for authentication
import Login from './components/Login';
import Signup from './components/Signup';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  const { currentUser } = useAuth(); // Use the custom hook to get the current user

  return (
    <Router>
      <div className="App">
        <h1>QR EXPRESS</h1>
        <Routes>
          <Route path="/" element={currentUser ? <FileUpload user={currentUser} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {currentUser && (
          <button onClick={() => auth.signOut()}>Logout</button>
        )}
      </div>
    </Router>
  );
};

export default App;
