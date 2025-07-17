import React from 'react';
import '../styles/Signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <form className="signup-form animate-form">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
        <p className="signup-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
