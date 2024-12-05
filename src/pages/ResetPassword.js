import React, { useState } from 'react';
import { confirmPasswordReset, getAuth, verifyPasswordResetCode } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { oobCode } = useParams(); // Get the OTP code from URL parameters

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const auth = getAuth();
    try {
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.log('Password reset successful');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      console.error('Error object:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
