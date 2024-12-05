import React, { useState, useEffect } from 'react';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Check if the user has just navigated to this page after login
    if (location.state?.email) {
      setEmail(location.state.email);
      sendOtpEmail(location.state.email);
    }
  }, [location.state]);

  const sendOtpEmail = async (email) => {
    try {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain for this
        // must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:8000',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setLinkSent(true);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error('Error sending Link:', error);
      setError('Failed to send Link. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    try {
      const url = window.location.href;
      if (isSignInWithEmailLink(auth, url)) {
        const email = window.localStorage.getItem('emailForSignIn');
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        navigate('/'); // Redirect to the home page or a success page
      }
    } catch (error) {
      console.error('Error verifying Link:', error);
      setError('Invalid email link. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {linkSent ? (
        <div>
          <p>Login link sent to your email. Check your inbox.</p>
          {/* <button onClick={handleVerifyOtp}>Verify OTP</button> */}
        </div>
      ) : (
        <p>Sending Link...</p>
      )}
    </div>
  );
}

export default VerifyOTP;
