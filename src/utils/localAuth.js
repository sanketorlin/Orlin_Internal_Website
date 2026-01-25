// Simple local authentication (no Firebase required)
// Stores user data in localStorage
// Note: This is for development/demo. For production, use a proper backend.

// Hash password (simple hash for demo - use bcrypt in production)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP temporarily (in production, use backend/email service)
const otpStore = new Map();

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    // Get users from localStorage
    const usersData = localStorage.getItem('bi-users');
    if (!usersData) {
      throw new Error('No users found');
    }

    const users = JSON.parse(usersData);
    const user = users[email.toLowerCase()];

    if (!user) {
      throw new Error('auth/user-not-found');
    }

    // Check password
    const hashedPassword = hashPassword(password);
    if (user.passwordHash !== hashedPassword) {
      throw new Error('auth/wrong-password');
    }

    // Return user object
    return {
      email: user.email,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign up new user
export const signUp = async (email, password, name) => {
  try {
    const usersData = localStorage.getItem('bi-users') || '{}';
    const users = JSON.parse(usersData);

    if (users[email.toLowerCase()]) {
      throw new Error('auth/email-already-in-use');
    }

    // Create new user
    users[email.toLowerCase()] = {
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      name: name || email.split('@')[0],
      role: 'sales', // Default role
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('bi-users', JSON.stringify(users));

    return {
      email: email.toLowerCase(),
      name: users[email.toLowerCase()].name
    };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Send password reset OTP (simulates email)
export const resetPassword = async (email) => {
  try {
    const usersData = localStorage.getItem('bi-users');
    if (!usersData) {
      throw new Error('auth/user-not-found');
    }

    const users = JSON.parse(usersData);
    if (!users[email.toLowerCase()]) {
      throw new Error('auth/user-not-found');
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP (expires in 10 minutes)
    otpStore.set(email.toLowerCase(), {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // In production, send email here
    // For demo, we'll show it in console and alert
    console.log(`Password reset OTP for ${email}: ${otp}`);
    alert(`Password Reset OTP: ${otp}\n\n(In production, this would be sent to your email)\n\nCopy this OTP to reset your password.`);

    return true;
  } catch (error) {
    console.error('Error sending password reset:', error);
    throw error;
  }
};

// Verify OTP and reset password
export const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
  try {
    const stored = otpStore.get(email.toLowerCase());
    
    if (!stored) {
      throw new Error('No OTP found. Please request a new one.');
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email.toLowerCase());
      throw new Error('OTP expired. Please request a new one.');
    }

    if (stored.otp !== otp) {
      throw new Error('Invalid OTP.');
    }

    // Update password
    const usersData = localStorage.getItem('bi-users');
    const users = JSON.parse(usersData);
    
    if (users[email.toLowerCase()]) {
      users[email.toLowerCase()].passwordHash = hashPassword(newPassword);
      localStorage.setItem('bi-users', JSON.stringify(users));
      
      // Remove used OTP
      otpStore.delete(email.toLowerCase());
      
      return true;
    }

    throw new Error('User not found');
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  // Clear any session data if needed
  return true;
};

// Initialize default users if none exist
export const initializeDefaultUsers = () => {
  const usersData = localStorage.getItem('bi-users');
  
  if (!usersData) {
    // Create default users
    const defaultUsers = {
      'john@example.com': {
        email: 'john@example.com',
        passwordHash: hashPassword('password123'), // Default password
        name: 'John Doe',
        role: 'team-head',
        createdAt: new Date().toISOString()
      },
      'jane@example.com': {
        email: 'jane@example.com',
        passwordHash: hashPassword('password123'), // Default password
        name: 'Jane Smith',
        role: 'sales',
        createdAt: new Date().toISOString()
      }
    };

    localStorage.setItem('bi-users', JSON.stringify(defaultUsers));
    console.log('Default users created. Use email: john@example.com or jane@example.com, password: password123');
  }
};
