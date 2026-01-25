// Firebase Authentication
// Switch to localAuth by importing from './localAuth' instead
import * as firebaseAuth from './firebaseAuth';

// Export authentication functions
export const signIn = firebaseAuth.signIn;
export const signUp = firebaseAuth.signUp;
export const resetPassword = firebaseAuth.resetPassword;
export const verifyOTPAndResetPassword = firebaseAuth.verifyOTPAndResetPassword;
export const signOut = firebaseAuth.signOut;
export const getCurrentUser = firebaseAuth.getCurrentUser;
export const onAuthStateChange = firebaseAuth.onAuthStateChange;
