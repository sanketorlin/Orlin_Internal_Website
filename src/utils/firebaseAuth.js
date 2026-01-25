// Firebase Authentication Implementation
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified
    };
  } catch (error) {
    console.error('Error signing in:', error);
    
    // Convert Firebase errors to user-friendly messages
    let errorMessage = 'Login failed. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        errorMessage = error.message || 'Login failed. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

// Sign up new user
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Note: To add name, you would need to update the user profile
    // or use Firestore to store additional user data
    
    return {
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified
    };
  } catch (error) {
    console.error('Error signing up:', error);
    
    let errorMessage = 'Sign up failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'An account with this email already exists.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        errorMessage = error.message || 'Sign up failed. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Error sending password reset:', error);
    
    let errorMessage = 'Failed to send password reset email.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        errorMessage = error.message || 'Failed to send password reset email.';
    }
    
    throw new Error(errorMessage);
  }
};

// Verify OTP and reset password (Firebase handles this via email link)
// This function is kept for compatibility but Firebase uses email links instead
export const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
  // Firebase doesn't use OTP - it sends a password reset link via email
  // This function is kept for UI compatibility but won't be used with Firebase
  throw new Error('Firebase uses email links for password reset. Please check your email and use the reset link.');
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

