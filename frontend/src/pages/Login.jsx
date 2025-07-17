import React from 'react';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form animate-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
        <p className="login-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;
