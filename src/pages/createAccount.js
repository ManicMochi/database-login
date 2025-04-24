import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginStyles from './loginStyles';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // updated to use email
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully!');
        setTimeout(() => navigate('/'), 1500); // Redirect to login page
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        {error && <div style={loginStyles.errorText}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <label style={loginStyles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ ...loginStyles.input, marginBottom: '1rem' }}
          />
          <label style={loginStyles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ ...loginStyles.input, marginBottom: '1rem' }}
          />
          <button type="submit" style={loginStyles.button}>Create Account</button>
        </form>
        <p style={loginStyles.linkText} onClick={() => navigate('/')}>Back to Login</p>
      </div>
    </div>
  );
}
