import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Make sure the CSS is imported

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [attempts, setAttempts]= useState(0);
  const [isBlocked, setIsBlocked]=useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isBlocked) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid credentials, please try again.');
        setAttempts(prev => prev+1);
        if(attempts+2>=5){
          setIsBlocked(true);
        }
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetEmailSent(true);
      setError(null);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div id="body">
      <div id="form-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {resetEmailSent && <p style={{ color: 'white' }}>Password reset email sent!</p>}
          
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isBlocked}
            />
            <label htmlFor="email">Email</label>
          </div>
          
          <div className="input-container">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isBlocked}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="log" type="submit" disabled={isBlocked}>Login</button>
        </form>

        <div id="forgot-password">
          <p id="forgot-password-inner">
            Forgot your password?{' '}
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset it
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
