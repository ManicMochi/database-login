import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginStyles from './loginStyles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // Send a POST request to the backend login endpoint
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate('/dashboard');
      } else {
        if (data.error === 'User not found') {
          setError('User does not exist');
        } else {
          setError(data.error || 'Login failed');
        }
      }      
    } catch (err) {
      setError('An error occurred while logging in');
      console.error(err);
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '.5rem' }}>Login</h2>
        {error && <div style={loginStyles.errorText}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={loginStyles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={loginStyles.input}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={loginStyles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={loginStyles.input}
            />
          </div>
          <button type="submit" style={loginStyles.button}>
            Log In
          </button>
        </form>
        <p
          style={loginStyles.linkText}
          onClick={() => navigate('/CreateAccount')}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}
