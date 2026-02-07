import { useState, useEffect } from 'react';
import { signIn, resetPassword } from '../utils/auth';
import { Mail, Lock, Shield, KeyRound } from 'lucide-react';
import Logo from './Logo';
import { isDeviceTrusted, trustDevice, verifyOTP } from '../utils/deviceAuth';
import { sendLoginOTP } from '../utils/otpEmailService';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New device OTP states
  const [isNewDevice, setIsNewDevice] = useState(null); // null = checking, true = new device, false = trusted
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(''); // Store OTP for display (dev only)

  // Check if device is trusted when email is entered
  useEffect(() => {
    const checkDevice = async () => {
      if (email && email.includes('@')) {
        try {
          const trusted = await isDeviceTrusted(email);
          setIsNewDevice(!trusted);
          setShowOTP(!trusted);
        } catch (error) {
          console.error('Error checking device:', error);
          // If permission error, default to new device (will show OTP flow)
          // This allows the flow to continue even if Firestore rules aren't set up yet
          if (error.code === 'permission-denied' || error.message?.includes('permission')) {
            console.warn('⚠️ Device check failed due to permissions. Defaulting to new device flow.');
            setIsNewDevice(true);
            setShowOTP(true);
          } else {
            // For other errors, also default to new device
            setIsNewDevice(true);
            setShowOTP(true);
          }
        }
      } else {
        setIsNewDevice(null);
        setShowOTP(false);
      }
    };

    // Debounce check
    const timer = setTimeout(checkDevice, 500);
    return () => clearTimeout(timer);
  }, [email]);

  // Handle email submission - check device and send OTP if new device
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Check if device is trusted (optional - if it fails, proceed with OTP flow)
      let trusted = false;
      try {
        trusted = await isDeviceTrusted(email);
      } catch (deviceError) {
        // If device check fails (e.g., permission denied), treat as new device
        console.warn('Device check failed, proceeding with OTP flow:', deviceError);
        trusted = false;
      }

      if (!trusted) {
        // New device - send OTP
        setShowOTP(true);
        setOtpSent(false);
        setOtp('');
        setOtpCode('');

        const result = await sendLoginOTP(email);
        setOtpSent(true);

        // Only set OTP code if email sending failed
        if (result.emailSent === false && result.otp) {
          // Email sending failed - show OTP in UI
          setOtpCode(result.otp);
          setSuccess(`⚠️ Email sending failed.\n\nYour OTP is: ${result.otp}\n\nPlease use this code to verify.`);
        } else {
          // Email sent successfully - don't show OTP
          setOtpCode(null);
          setSuccess(`✅ OTP sent to ${email}\n\nPlease check your email inbox (and spam folder) for the OTP code.`);
        }
        setIsNewDevice(true);
      } else {
        // Trusted device - show password field
        setShowOTP(false);
        setIsNewDevice(false);
        setSuccess('This is a trusted device. Please enter your password.');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      // Only show error if it's not a permission error (those are handled gracefully)
      if (!err.message?.includes('permission') && !err.code?.includes('permission')) {
        setError(err.message || 'Failed to send OTP. Please try again.');
      } else {
        // For permission errors, just proceed with OTP flow
        setShowOTP(true);
        setOtpSent(false);
        setOtp('');
        setOtpCode('');
        try {
          const result = await sendLoginOTP(email);
          setOtpSent(true);
          if (result.emailSent === false && result.otp) {
            // Email sending failed - show OTP in UI
            setOtpCode(result.otp);
            setSuccess(`⚠️ Email sending failed.\n\nYour OTP is: ${result.otp}\n\nPlease use this code to verify.`);
          } else {
            // Email sent successfully - don't show OTP
            setOtpCode(null);
            setSuccess(`✅ OTP sent to ${email}\n\nPlease check your email inbox (and spam folder) for the OTP code.`);
          }
          setIsNewDevice(true);
        } catch (otpError) {
          setError(otpError.message || 'Failed to send OTP. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Verify OTP
      await verifyOTP(email, otp);

      // Mark device as trusted immediately after OTP verification
      try {
        await trustDevice(email);
        console.log('✅ Device marked as trusted after OTP verification');
      } catch (trustError) {
        // If Firestore fails, use localStorage as fallback
        console.warn('⚠️ Could not trust device in Firestore, using localStorage fallback:', trustError);
        const deviceId = localStorage.getItem('bi-device-id') || 'device_' + Date.now();
        localStorage.setItem(`trusted_device_${email.toLowerCase()}`, JSON.stringify({
          email: email.toLowerCase(),
          deviceId: deviceId,
          trustedAt: new Date().toISOString()
        }));
        console.log('✅ Device marked as trusted in localStorage');
      }

      // OTP verified - now show password field to complete login
      setSuccess('✅ OTP verified! Please enter your password to complete login.');
      setShowOTP(false);
      setOtpSent(false);
      setOtp('');
      setOtpCode('');
      // Keep email, but now show password field

    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle password login (for trusted devices or after OTP verification)
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const user = await signIn(email, password);

      // Trust device if not already trusted (for new devices that completed OTP)
      const trusted = await isDeviceTrusted(email);
      if (!trusted) {
        await trustDevice(email);
        console.log('✅ Device trusted after OTP + password login');
      }

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
      setSuccess(`✅ Password reset email sent successfully!\n\nPlease check your inbox (and spam folder) for: ${resetEmail}\n\nThe email should arrive within a few minutes. Click the link in the email to reset your password.`);
      // Firebase uses email links, not OTP, so we don't show OTP verification
      setTimeout(() => {
        setShowResetPassword(false);
        setResetEmail('');
        setSuccess('');
      }, 8000); // Give more time to read the message
    } catch (err) {
      console.error('Password reset error:', err);
      let errorMessage = err.message || 'Failed to send password reset email. Please try again.';

      // Add troubleshooting tips
      if (err.message?.includes('user-not-found')) {
        errorMessage += '\n\n💡 Tip: Make sure the email is registered in Firebase Authentication.';
      } else if (err.message?.includes('quota')) {
        errorMessage += '\n\n💡 Tip: Check Firebase Console > Authentication > Templates to verify email sending is enabled.';
      } else {
        errorMessage += '\n\n💡 Troubleshooting:\n1. Check spam/junk folder\n2. Verify email in Firebase Console\n3. Check Firebase email quota\n4. Ensure email templates are configured';
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
              <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                We'll send a password reset link to your email
              </p>
            </div>
            {error && <div className="error-message" style={{ whiteSpace: 'pre-line' }}>{error}</div>}
            {success && <div className="success-message" style={{ whiteSpace: 'pre-line' }}>{success}</div>}
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

        {/* OTP Verification Form (for new devices) */}
        {showOTP && otpSent ? (
          <form onSubmit={handleOTPVerify} className="login-form">
            <div className="form-group">
              <label htmlFor="otp">
                <Shield className="input-icon" />
                Enter OTP Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                required
                disabled={loading}
                maxLength={6}
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  letterSpacing: '8px',
                  fontFamily: 'monospace'
                }}
              />
              <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {otpCode && process.env.NODE_ENV === 'development' && (
                  <span style={{
                    display: 'block',
                    marginBottom: '8px',
                    padding: '8px',
                    background: 'rgba(74, 144, 226, 0.2)',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    🔑 Development OTP: {otpCode}
                    <br />
                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      (In production, check your email for the OTP)
                    </span>
                  </span>
                )}
                {!otpCode && (
                  <>
                    Enter the 6-digit code sent to {email}
                    <br />
                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      Check your email inbox (and spam folder)
                    </span>
                  </>
                )}
                {otpCode && (
                  <>
                    Enter the 6-digit code sent to {email}
                    <br />
                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      Code expires in 10 minutes
                    </span>
                  </>
                )}
              </p>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message" style={{ whiteSpace: 'pre-line' }}>{success}</div>}
            <div className="button-group">
              <button type="submit" disabled={loading || otp.length !== 6} className="btn-primary">
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
              <button
                type="button"
                onClick={async () => {
                  setOtpSent(false);
                  setOtp('');
                  setOtpCode('');
                  setError('');
                  setSuccess('');
                  setLoading(true);
                  try {
                    const result = await sendLoginOTP(email);
                    setOtpSent(true);
                    if (result.emailSent === false && result.otp) {
                      // Email sending failed - show OTP in UI
                      setOtpCode(result.otp);
                      setSuccess(`⚠️ Email sending failed.\n\nYour OTP is: ${result.otp}\n\nPlease use this code to verify.`);
                    } else {
                      // Email sent successfully - don't show OTP
                      setOtpCode(null);
                      setSuccess(`✅ New OTP sent to ${email}\n\nPlease check your email inbox (and spam folder).`);
                    }
                  } catch (err) {
                    setError(err.message || 'Failed to resend OTP.');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="btn-secondary"
                disabled={loading}
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOTP(false);
                  setOtpSent(false);
                  setOtp('');
                  setOtpCode('');
                  setEmail('');
                  setError('');
                  setSuccess('');
                }}
                className="btn-link"
                style={{ marginTop: '8px' }}
              >
                Use Different Email
              </button>
            </div>
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <p style={{ margin: 0 }}>© 2024 Orlin Apparel Private Limited</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>All rights reserved</p>
            </div>
          </form>
        ) : (
          /* Email/Password Login Form */
          <form onSubmit={showOTP ? handleEmailSubmit : handlePasswordLogin} className="login-form">
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
              {isNewDevice === true && !otpSent && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255, 200, 87, 0.9)' }}>
                  🔒 New device detected. You'll need to verify with OTP first.
                </p>
              )}
              {isNewDevice === false && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(102, 187, 106, 0.9)' }}>
                  ✅ Trusted device. You can login with password.
                </p>
              )}
              {isNewDevice === null && email && email.includes('@') && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Click "Send OTP" to receive OTP via email
                </p>
              )}
            </div>

            {(!showOTP || (showOTP && !otpSent)) && (
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
                  required={!showOTP || (showOTP && !otpSent)}
                  disabled={loading || (showOTP && otpSent)}
                />
                {showOTP && otpSent && (
                  <p style={{ marginTop: '8px', fontSize: '13px', color: 'rgba(255, 200, 87, 0.9)' }}>
                    ⏳ Enter OTP first, then password will be required
                  </p>
                )}
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message" style={{ whiteSpace: 'pre-line' }}>{success}</div>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  {showOTP ? 'Sending OTP...' : 'Logging in...'}
                </>
              ) : (
                showOTP ? 'Send OTP' : 'Login'
              )}
            </button>

            {!showOTP && (
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="btn-link forgot-password"
              >
                Forgot Password?
              </button>
            )}

            {showOTP && !otpSent && (
              <button
                type="button"
                onClick={() => {
                  setEmail('');
                  // The useEffect will handle resetting the state
                }}
                className="btn-link"
                style={{ marginTop: '8px', width: '100%' }}
              >
                Use Different Email
              </button>
            )}
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <p style={{ margin: 0 }}>© 2024 Orlin Apparel Private Limited</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>All rights reserved</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
