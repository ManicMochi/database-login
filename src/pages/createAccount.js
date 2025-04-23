import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginStyles from './loginStyles';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = formData;
    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill out all fields');
      return;
    }
    // Simulate account creation logic
    console.log('Account created:', formData);
    navigate('/dashboard');
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '.5rem' }}>Create Account</h2>
        {error && <div style={loginStyles.errorText}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="firstName" style={loginStyles.label}>First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              style={loginStyles.input}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="lastName" style={loginStyles.label}>Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              style={loginStyles.input}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={loginStyles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={loginStyles.input}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phone" style={loginStyles.label}>Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              style={loginStyles.input}
            />
          </div>
          <button type="submit" style={loginStyles.button}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
