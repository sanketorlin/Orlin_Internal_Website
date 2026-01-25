import { useState } from 'react';
import { signIn, resetPassword } from '../utils/auth';
import { Mail, Lock, Shield, KeyRound } from 'lucide-react';
import Logo from './Logo';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const user = await signIn(email, password);
      onLoginSuccess(user.email);
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.message === 'auth/user-not-found' || err.message?.includes('user-not-found')) {
        errorMessage = 'No account found with this email.';
      } else if (err.message === 'auth/wrong-password' || err.message?.includes('wrong-password')) {
        errorMessage = 'Incorrect password.';
      } else if (err.message?.includes('Invalid email')) {
        errorMessage = 'Invalid email address.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setSuccess('Password reset email sent! Please check your email and click the link to reset your password.');
      // Firebase uses email links, not OTP, so we don't show OTP verification
      setTimeout(() => {
        setShowResetPassword(false);
        setResetEmail('');
        setSuccess('');
      }, 3000);
    } catch (err) {
      let errorMessage = 'Failed to send password reset email. Please try again.';
      
      if (err.message?.includes('user-not-found')) {
        errorMessage = 'No account found with this email.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  if (showResetPassword) {
    return (
      <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo size="medium" showText={false} variant="dark" />
          <h1 style={{ marginTop: '20px', marginBottom: '8px' }}>Reset Password</h1>
          <p>Enter your email to receive password reset link</p>
        </div>

          <form onSubmit={handleResetPassword} className="login-form">
            <div className="form-group">
              <label htmlFor="resetEmail">
                <Mail className="input-icon" />
                Email Address
              </label>
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
              <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                We'll send a password reset link to your email
              </p>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="button-group">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetPassword(false);
                  setError('');
                  setSuccess('');
                  setResetEmail('');
                }}
                className="btn-secondary"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo size="large" showText={true} variant="dark" />
          <h1 style={{ marginTop: '24px', marginBottom: '8px' }}>BI Dashboard Portal</h1>
          <p>Secure Email Login</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <Mail className="input-icon" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <Lock className="input-icon" />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowResetPassword(true)}
            className="btn-link forgot-password"
          >
            Forgot Password?
          </button>
          <div style={{ 
            marginTop: '24px', 
            paddingTop: '24px', 
            borderTop: '1px solid rgba(26, 35, 126, 0.1)',
            textAlign: 'center',
            fontSize: '12px',
            color: '#9e9e9e'
          }}>
            <p style={{ margin: 0 }}>© 2024 Orlin Apparel Private Limited</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>All rights reserved</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
