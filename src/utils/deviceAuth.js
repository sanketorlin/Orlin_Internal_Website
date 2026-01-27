// Device-based authentication utilities
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const DEVICE_STORAGE_KEY = 'bi-device-id';
const DEVICES_COLLECTION = 'trusted-devices';
const OTP_COLLECTION = 'login-otps';

// Generate a unique device ID based on browser fingerprint
export const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_STORAGE_KEY);
  
  if (!deviceId) {
    // Create a device fingerprint
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 'unknown'
    ].join('|');
    
    // Create a simple hash
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    deviceId = 'device_' + Math.abs(hash).toString(36);
    localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  }
  
  return deviceId;
};

// Check if device is trusted for a user
export const isDeviceTrusted = async (email) => {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, DEVICES_COLLECTION, `${email.toLowerCase()}_${deviceId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Check if trust hasn't expired (optional: set expiration)
      console.log('✅ Device is trusted (Firestore):', deviceId);
      return true;
    }
    
    // Check localStorage as fallback
    const localTrust = localStorage.getItem(`trusted_device_${email.toLowerCase()}`);
    if (localTrust) {
      const trustData = JSON.parse(localTrust);
      if (trustData.deviceId === deviceId) {
        console.log('✅ Device is trusted (localStorage):', deviceId);
        return true;
      }
    }
    
    console.log('❌ Device is NOT trusted:', deviceId);
    return false;
  } catch (error) {
    console.warn('⚠️ Firestore device check failed, checking localStorage:', error);
    // If Firestore fails, check localStorage as fallback
    try {
      const deviceId = getDeviceId();
      const localTrust = localStorage.getItem(`trusted_device_${email.toLowerCase()}`);
      if (localTrust) {
        const trustData = JSON.parse(localTrust);
        if (trustData.deviceId === deviceId) {
          console.log('✅ Device is trusted (localStorage fallback):', deviceId);
          return true;
        }
      }
    } catch (localError) {
      console.warn('⚠️ localStorage check also failed:', localError);
    }
    // If both fail, treat as untrusted (new device)
    return false;
  }
};

// Mark device as trusted after successful OTP login
export const trustDevice = async (email) => {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, DEVICES_COLLECTION, `${email.toLowerCase()}_${deviceId}`);
    
    try {
      await setDoc(docRef, {
        email: email.toLowerCase(),
        deviceId: deviceId,
        trustedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        lastUsed: new Date().toISOString()
      }, { merge: true });
      
      console.log('✅ Device marked as trusted in Firestore:', deviceId);
    } catch (firestoreError) {
      // If Firestore fails, use localStorage as fallback
      console.warn('⚠️ Could not trust device in Firestore, using localStorage fallback:', firestoreError);
      const trustData = {
        email: email.toLowerCase(),
        deviceId: deviceId,
        trustedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        lastUsed: new Date().toISOString()
      };
      localStorage.setItem(`trusted_device_${email.toLowerCase()}`, JSON.stringify(trustData));
      console.log('✅ Device marked as trusted in localStorage:', deviceId);
    }
    
    return true;
  } catch (error) {
    console.error('Error trusting device:', error);
    // Even if there's an error, try localStorage as last resort
    try {
      const deviceId = getDeviceId();
      const trustData = {
        email: email.toLowerCase(),
        deviceId: deviceId,
        trustedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        lastUsed: new Date().toISOString()
      };
      localStorage.setItem(`trusted_device_${email.toLowerCase()}`, JSON.stringify(trustData));
      console.log('✅ Device marked as trusted in localStorage (fallback):', deviceId);
      return true;
    } catch (localError) {
      console.error('❌ Failed to trust device in both Firestore and localStorage:', localError);
      return false;
    }
  }
};

// Generate and store OTP
export const generateAndStoreOTP = async (email) => {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const docRef = doc(db, OTP_COLLECTION, email.toLowerCase());
    
    try {
      await setDoc(docRef, {
        email: email.toLowerCase(),
        otp: otp,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
        used: false
      }, { merge: false });
      
      console.log('✅ OTP generated and stored in Firestore:', otp);
    } catch (firestoreError) {
      // If Firestore fails (e.g., permission denied), still return OTP
      // It will be stored in memory/localStorage as fallback
      console.warn('⚠️ Could not store OTP in Firestore, using in-memory storage:', firestoreError);
      // Store in localStorage as fallback
      const otpData = {
        email: email.toLowerCase(),
        otp: otp,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        used: false
      };
      localStorage.setItem(`otp_${email.toLowerCase()}`, JSON.stringify(otpData));
      console.log('✅ OTP stored in localStorage as fallback:', otp);
    }
    
    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    // Try Firestore first
    try {
      const docRef = doc(db, OTP_COLLECTION, email.toLowerCase());
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Check if OTP is expired
        if (new Date() > new Date(data.expiresAt)) {
          await deleteDoc(docRef);
          throw new Error('OTP expired. Please request a new one.');
        }
        
        // Check if OTP is already used
        if (data.used) {
          throw new Error('OTP already used. Please request a new one.');
        }
        
        // Verify OTP
        console.log('🔍 Verifying OTP (Firestore):', {
          entered: otp,
          stored: data.otp,
          match: data.otp === otp
        });
        if (data.otp !== otp) {
          throw new Error(`Invalid OTP. The correct OTP is: ${data.otp}. Please check your email again.`);
        }
        
        // Mark OTP as used
        await setDoc(docRef, { used: true }, { merge: true });
        
        console.log('✅ OTP verified successfully (Firestore)');
        return true;
      }
    } catch (firestoreError) {
      // If Firestore fails, try localStorage fallback
      console.warn('Firestore OTP verification failed, trying localStorage:', firestoreError);
      
      const localOtpData = localStorage.getItem(`otp_${email.toLowerCase()}`);
      if (localOtpData) {
        const data = JSON.parse(localOtpData);
        
        // Check if OTP is expired
        if (new Date() > new Date(data.expiresAt)) {
          localStorage.removeItem(`otp_${email.toLowerCase()}`);
          throw new Error('OTP expired. Please request a new one.');
        }
        
        // Check if OTP is already used
        if (data.used) {
          throw new Error('OTP already used. Please request a new one.');
        }
        
        // Verify OTP
        console.log('🔍 Verifying OTP (localStorage):', {
          entered: otp,
          stored: data.otp,
          match: data.otp === otp
        });
        if (data.otp !== otp) {
          throw new Error(`Invalid OTP. The correct OTP is: ${data.otp}. Please check your email again.`);
        }
        
        // Mark OTP as used
        data.used = true;
        localStorage.setItem(`otp_${email.toLowerCase()}`, JSON.stringify(data));
        
        console.log('✅ OTP verified successfully (localStorage)');
        return true;
      }
      
      // If neither Firestore nor localStorage has the OTP, throw error
      throw new Error('No OTP found. Please request a new one.');
    }
    
    throw new Error('No OTP found. Please request a new one.');
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Send OTP via email (using password reset email as workaround, or custom email service)
// For now, we'll use a combination approach
export const sendOTPEmail = async (email, otp) => {
  try {
    // Option 1: Use Firebase's sendPasswordResetEmail but with custom message
    // Option 2: Use a custom email service (requires backend)
    // Option 3: For development, show in console/alert
    
    // For now, we'll use password reset email as a workaround
    // In production, you'd want to use Firebase Cloud Functions or a custom email service
    
    console.log('📧 OTP for', email, ':', otp);
    console.log('💡 In production, this would be sent via email service');
    
    // Store OTP in Firestore (already done in generateAndStoreOTP)
    // The OTP will be shown to user via UI
    
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

// Clear device trust (for logout or security)
export const clearDeviceTrust = async (email) => {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, DEVICES_COLLECTION, `${email}_${deviceId}`);
    await deleteDoc(docRef);
    localStorage.removeItem(DEVICE_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing device trust:', error);
    return false;
  }
};

