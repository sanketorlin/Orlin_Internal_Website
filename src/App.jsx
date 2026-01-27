import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { onAuthStateChange, getCurrentUser } from './utils/auth';
import { isDeviceTrusted } from './utils/deviceAuth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChange(async (firebaseUser) => {
        if (firebaseUser) {
          // Check if device is trusted - if not, require OTP login
          try {
            const trusted = await isDeviceTrusted(firebaseUser.email);
            if (trusted) {
              // Device is trusted, allow direct access
              setUser(firebaseUser.email);
            } else {
              // Device is not trusted, require OTP login even if Firebase auth is active
              console.log('⚠️ Device not trusted, requiring OTP login');
              setUser(null);
            }
          } catch (deviceError) {
            // If device check fails, require login for security
            console.warn('⚠️ Device check failed, requiring login:', deviceError);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase auth error:', error);
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    setUser(email);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <Dashboard userEmail={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
